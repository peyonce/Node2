import { createServer, IncomingMessage, ServerResponse } from 'http';
import { getWeatherAndNews as getWeatherAndNewsCalls } from './callbackVersion';
import { getWeatherAndNews as getWeatherAndNewsPromise, getAllSimultaneously, getFastest } from './promiseVersion';
import { getWeatherAndNews as getWeatherAndNewsAsync } from './asyncAwaitVersion';

const PORT = 3000

function sendJSON(res: ServerResponse, data: any, statusCode = 200) {
    res.writeHead(statusCode, { ' Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data, null, 2));
}
