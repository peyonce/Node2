import https from 'https';

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true';
const NEWS_URL = 'https://dummyjson.com/posts';

function fetchData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => (data += chunk));
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch {
                    reject(new Error('Failed to parse JSON'));
                }
            })
        }).on('eror', reject);
    })
}

export async function getWeatherAndNews(): Promise<any> {
    const weather = await fetchData(WEATHER_URL);
    const news = await fetchData(NEWS_URL);

    return {
        weather: weather.current_weather,
        news: news.posts.slice(0, 3).map((p: any) => p.title),
    }
}

export async function getAllSimultaneously(): Promise<any[]> {
    return Promise.all([fetchData(WEATHER_URL), fetchData(NEWS_URL)]);
}

export async function getFastest(): Promise<any> {
    return Promise.race([fetchData(WEATHER_URL), fetchData(NEWS_URL)]);
}

