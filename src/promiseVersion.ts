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

