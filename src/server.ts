import { createServer, IncomingMessage, ServerResponse } from 'http';
import { getWeatherAndNews as getWeatherAndNewsCalls } from './callbackVersion';
import { getWeatherAndNews as getWeatherAndNewsPromise, getAllSimultaneously, getFastest } from './promiseVersion';
import { getWeatherAndNews as getWeatherAndNewsAsync } from './asyncAwaitVersion';

const PORT = 3000

function sendJSON(res: ServerResponse, data: any, statusCode = 200) {
    res.writeHead(statusCode, { ' Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data, null, 2));
}

function sendText(res: ServerResponse, text: string, statusCode = 200) {
    res.writeHead(statusCode, { ' Content-Type': 'text/plain; charset=utf-8' });
    res.end(text);
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'GET') {
        switch (req.url) {
            case '/':
                sendText(res, 'Welcome to Async Weather  & News Dashboard!');
                break;

            case '/callback':
                getWeatherAndNewsCalls((err, data) => {
                    if (err) {
                        sendJSON(res, { error: err.message }, 500);
                    } else {
                        sendJSON(res, data)
                    }
                });
                break;

            case '/promise/all':
                getAllSimultaneously()
                    .then(([weather, news]) => {
                        sendJSON(res, {
                            weather: weather.current_weather,
                            news: news.posts.slice(0, 3).map((p: any) => p.title),
                        });
                    })
                    .catch(err => sendJSON(res, { error: err.message }, 500));
                break;

            case '/promise/race':
                getFastest()
                    .then(data => {
                        sendJSON(res, data);
                    })
                    .catch(err => sendJSON(res, { error: err.message }, 500));
                break;

            case '/async':
                (async () => {
                    try {
                        const data = await getWeatherAndNewsAsync();
                        sendJSON(res, data);
                    } catch (err) {
                        sendJSON(res, { error: (err as Error).message }, 500);
                    }
                })();
                break;

            default:
                sendText(res, 'Not Found', 404);
        }
    } else {
        sendText(res, 'Method Not Allowed', 404);
    }
});

server.listen(PORT, () => {
    console.log('Server running at http://localhost:${PORT}');
});


