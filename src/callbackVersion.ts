import * as https from 'https'

const WEATHER_URL = 'htt ps://api.open.meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true';
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

        fetchData(NEWS_URL, (err2, newsData) => {
            if (err2) return callback(err2);

            callback(null, {
                weather: weatherData.current_weather,
                news: newsData.posts.slice(0, 3).map((p: any) => p.title),

            })
        })
    })
}