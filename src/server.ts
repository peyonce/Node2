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
        }
    }
}
)
