import { DailyForecast, WeatherRecommendation } from '../types';

/**
 * TRANSPARENT RULE THRESHOLDS FOR DAILY RECOMMENDATIONS
 * (All calculations use standard Celsius, mm, km/h as retrieved from Open-Meteo)
 */
export const RECOMMENDATION_THRESHOLDS = {
  PRECIPITATION_UMBRELLA_MM: 1.0, // mm of rain required to recommend an umbrella
  HEAVY_RAIN_MM: 10.0,            // mm of rain considered heavy downpour
  HOT_DAY_CELSIUS: 32.0,           // Max temp >= 32°C triggers hot day stay hydrated advisory
  PLEASANT_MAX_CELSIUS: 28.0,      // Upper limit for pleasant outdoor weather
  PLEASANT_MIN_CELSIUS: 18.0,      // Lower limit for pleasant outdoor weather
  COLD_DAY_CELSIUS: 10.0,          // Min temp <= 10°C triggers cold day dress warmly advisory
  FREEZING_CELSIUS: 0.0,           // Min temp <= 0°C triggers freezing alert
  WINDY_KMH: 35.0,                 // Max wind speed >= 35 km/h triggers wind advisory
  HIGH_UV_INDEX: 6.0,              // UV Index >= 6 triggers sunscreen advisory
};

export function generatePlanningRecommendations(
  dailyForecasts: DailyForecast[]
): WeatherRecommendation[] {
  const recommendations: WeatherRecommendation[] = [];

  if (!dailyForecasts || dailyForecasts.length === 0) {
    return recommendations;
  }

  dailyForecasts.forEach((day, index) => {
    const dateObj = new Date(day.date + 'T00:00:00');
    const dayName = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // 1. Rain / Umbrella Recommendation
    if (day.precipitationSum >= RECOMMENDATION_THRESHOLDS.HEAVY_RAIN_MM) {
      recommendations.push({
        id: `rain-heavy-${day.date}`,
        type: 'umbrella',
        severity: 'alert',
        title: `Heavy Rain Expected (${day.precipitationSum.toFixed(1)} mm)`,
        description: `Heavy rainfall expected on ${dayName} (${formattedDate}). Carry a sturdy umbrella or waterproof raincoat and expect travel delays.`,
        date: day.date,
        dayName,
        iconName: 'Umbrella',
      });
    } else if (day.precipitationSum >= RECOMMENDATION_THRESHOLDS.PRECIPITATION_UMBRELLA_MM) {
      recommendations.push({
        id: `rain-${day.date}`,
        type: 'umbrella',
        severity: 'warning',
        title: `Carry an Umbrella`,
        description: `Up to ${day.precipitationSum.toFixed(1)} mm of precipitation forecasted for ${dayName} (${formattedDate}). Keep an umbrella handy when stepping out.`,
        date: day.date,
        dayName,
        iconName: 'Umbrella',
      });
    }

    // 2. Temperature Extremes (Hot, Cold, Freezing, Pleasant)
    if (day.tempMin <= RECOMMENDATION_THRESHOLDS.FREEZING_CELSIUS) {
      recommendations.push({
        id: `freezing-${day.date}`,
        type: 'freezing',
        severity: 'alert',
        title: `Freezing Temperatures (${Math.round(day.tempMin)}°C)`,
        description: `Temperatures drop to ${Math.round(day.tempMin)}°C on ${dayName}. Beware of ice or frost on roads and walkways; wear heavy thermal gear.`,
        date: day.date,
        dayName,
        iconName: 'Snowflake',
      });
    } else if (day.tempMin <= RECOMMENDATION_THRESHOLDS.COLD_DAY_CELSIUS) {
      recommendations.push({
        id: `cold-${day.date}`,
        type: 'cold',
        severity: 'warning',
        title: `Cold Day Alert (Min ${Math.round(day.tempMin)}°C)`,
        description: `Cool conditions on ${dayName} (${formattedDate}) with lows near ${Math.round(day.tempMin)}°C. Dress warmly in layers.`,
        date: day.date,
        dayName,
        iconName: 'ThermometerSnowflake',
      });
    }

    if (day.tempMax >= RECOMMENDATION_THRESHOLDS.HOT_DAY_CELSIUS) {
      recommendations.push({
        id: `hot-${day.date}`,
        type: 'hot',
        severity: 'alert',
        title: `Hot Day Ahead (Max ${Math.round(day.tempMax)}°C)`,
        description: `Highs reach ${Math.round(day.tempMax)}°C on ${dayName} (${formattedDate}). Stay hydrated, seek shade during mid-day, and wear sunscreen.`,
        date: day.date,
        dayName,
        iconName: 'SunMedium',
      });
    } else if (
      day.tempMax >= RECOMMENDATION_THRESHOLDS.PLEASANT_MIN_CELSIUS &&
      day.tempMax <= RECOMMENDATION_THRESHOLDS.PLEASANT_MAX_CELSIUS &&
      day.precipitationSum < RECOMMENDATION_THRESHOLDS.PRECIPITATION_UMBRELLA_MM
    ) {
      recommendations.push({
        id: `pleasant-${day.date}`,
        type: 'pleasant',
        severity: 'success',
        title: `Great Outdoor Weather`,
        description: `Comfortable conditions on ${dayName} (${formattedDate}) around ${Math.round(day.tempMax)}°C with dry skies. Perfect for walks, picnics, or outdoor sports!`,
        date: day.date,
        dayName,
        iconName: 'Smile',
      });
    }

    // 3. High Wind Advisory
    if (day.windSpeedMax && day.windSpeedMax >= RECOMMENDATION_THRESHOLDS.WINDY_KMH) {
      recommendations.push({
        id: `wind-${day.date}`,
        type: 'wind',
        severity: 'warning',
        title: `Gusty Winds (${Math.round(day.windSpeedMax)} km/h)`,
        description: `Strong wind gusts up to ${Math.round(day.windSpeedMax)} km/h expected on ${dayName}. Secure outdoor furniture and take care when driving high-profile vehicles.`,
        date: day.date,
        dayName,
        iconName: 'Wind',
      });
    }

    // 4. High UV Advisory
    if (day.uvIndexMax && day.uvIndexMax >= RECOMMENDATION_THRESHOLDS.HIGH_UV_INDEX) {
      recommendations.push({
        id: `uv-${day.date}`,
        type: 'uv',
        severity: 'info',
        title: `High UV Index (${day.uvIndexMax.toFixed(1)})`,
        description: `UV Index reaches ${day.uvIndexMax.toFixed(1)} on ${dayName}. Apply SPF 30+ sunscreen, wear hat and sunglasses if outdoors.`,
        date: day.date,
        dayName,
        iconName: 'SunRisk',
      });
    }
  });

  return recommendations;
}
