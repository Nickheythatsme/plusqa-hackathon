import redis from 'redis';
import {promisify} from 'util';

export interface RedisClient extends redis.RedisClient {
    setAsync: (key: string, value: string) => Promise<any>;
    getAsync: (key: string) => Promise<string>;
    randomkeyAsync: () => Promise<string>;
}

export function initClient(): RedisClient {
    const client = redis.createClient({
        port: 6379,
    });
    client.on('error', function(error) {
        console.error('Redis error: ', JSON.stringify(error));
    });

    (<RedisClient>client).setAsync = promisify(client.set).bind(client);
    (<RedisClient>client).getAsync = promisify(client.get).bind(client);
    (<RedisClient>client).getAsync = promisify(client.get).bind(client);
    (<RedisClient>client).randomkeyAsync = promisify(client.randomkey).bind(client);

    return <RedisClient>client;
}

export const client = initClient();
