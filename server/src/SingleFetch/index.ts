import { PointsByBoundingBox } from 'types/GetPointsByBoundingBox';
import { WeatherResponse } from 'types/localWeather';
import { NextDeparture } from 'types/NextDeparture';

type Response = NextDeparture | PointsByBoundingBox | WeatherResponse;

interface FetchElement {
    lastFetch: number;
    response: Response;
    fetchingPromise: Promise<Response> | null;
}

interface FetchDictionary {
    [url: string]: FetchElement;
}

const createInitialFetchElement = (): FetchElement => ({
    lastFetch: 0,
    response: [],
    fetchingPromise: null,
});

class SingleFetch {
    private dict: FetchDictionary = {};
    private garbageCollector: NodeJS.Timeout;

    constructor() {
        this.garbageCollector = setInterval(() => {
            Object.entries(this.dict).forEach(([key, value]) => {
                if (value.lastFetch < Date.now() - 60_000) {
                    delete this.dict[key];
                }
            });
        }, 60_000);
    }

    async handleCall(url: string): Promise<Response> {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
        return new Promise(async (resolve) => {
            try {
                const dateNow = Date.now();
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Response status: ${res.status}. Response: ${JSON.stringify(res)}`);
                }

                console.log('new fetch.', url, this.dict[url].lastFetch, dateNow, this.dict[url].lastFetch - dateNow);
                this.dict[url].lastFetch = dateNow;

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const json: Response = await res.json();
                resolve(json);
            } catch (error) {
                console.error(error);
            }
        });
    }

    async get(url: string): Promise<Response> {
        const dateNow = Date.now();

        if (!this.dict[url]) {
            this.dict[url] = createInitialFetchElement();
        }

        if (!this.dict[url].lastFetch || this.dict[url].lastFetch < dateNow - 15_000) {
            if (!this.dict[url].fetchingPromise) {
                this.dict[url].fetchingPromise = this.handleCall(url).finally(() => {
                    this.dict[url].fetchingPromise = null;
                });
            }

            this.dict[url].response = await this.dict[url].fetchingPromise;

            return this.dict[url].response;
        }

        return this.dict[url].response;
    }
}

const singleFetch = new SingleFetch();

export default singleFetch;
