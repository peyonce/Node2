import * as https from 'https'

const WEATHER_URL = 'httpps://api.open.meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true';
const NEWS_URL = 'https://dummyjson.com/posts';

function fetchData(url: string, callback: (error: Error | null, data?: any) => void) {
    https.get(url, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
            try {
                callback(null, JSON.parse(data));
            } catch (e) {
                callback(new Error('Failed to parse JSON'));
            }
        });
    }).on('error', err => callback(err));
}

export function getWeatherAndNews(callback: (error: Error | null, result?: any) => void) {
    fetchData(WEATHER_URL, (err, weatherData) => {
        if (err) return callback(err);
    }
    )
}