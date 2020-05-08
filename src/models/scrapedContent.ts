import PHash from './pHash';
import {client} from '../db';

const CONTENT_KEY_SET_NAME = 'content_keys';

export interface ScrapedContentData {
    keyOrContent: PHash | string,
    dateAccessed: Date,
    url: string,
}

export default class ScrapedContent {
    public key: PHash;
    public dateAccessed: Date;
    public url: string;

    public static async findSimilar(phash: PHash, radius: number, count: number = 5) {
        if (Number.parseInt(radius.toString()) == Number.NaN) {
            throw 'radius must be an integer';
        }
    }

    public static async getByKey(key: string) {

    }

    constructor(data: ScrapedContentData) {
        if (typeof data.keyOrContent == 'string') {

        }
        this.key = data.key;
        this.dateAccessed = data.dateAccessed;
        this.url = data.url;
    }

    public getHostname() {
        return (new URL(this.url).hostname);
    }

    /**
     * 
     * @param other the other webpage to compare this one to
     */
    public getDistance(other: ScrapedContent) {
        return this.key.distance(other.key);
    }
}
