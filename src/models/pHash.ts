const HASH_SALT = 0x41fe2f20;

type PHashType = Uint32Array;
const PHashType = Uint32Array;

export default class PHash {
    private arrValue: PHashType;

    constructor(value: PHashType | string) {
        if (typeof value == 'string') {
            this.arrValue = perceptualHash(value);
        } else {
            this.arrValue = value;
        }
    }

    public toString() {
        return this.arrValue.toString();
    }

    get value(): number {
        return this.arrValue[0];
    }

    public set(arg: string) {
        this.arrValue = perceptualHash(arg);
    }

    /**
     * Calculate the hamming distance between the two PHash values
     */
    public distance(pHash: PHash): number {
        return hammingDistance(pHash.arrValue, this.arrValue);
    }

}

export function perceptualHash(arg: string): PHashType {
    const hashValue = new PHashType(1); 
    hashValue[0] = HASH_SALT;
    for (let i=0; i<arg.length; ++i) {
        hashValue[0] += arg.charCodeAt(i);
        hashValue[0] <<= 1;
    }
    return hashValue;
}

export function hammingDistance(arg1: PHashType | string, arg2: PHashType | string): number {
    if (typeof arg1 == 'string') {
        arg1 = perceptualHash(arg1);
    }
    if (typeof arg2 == 'string') {
        arg2 = perceptualHash(arg2);
    }
    let xorDiff = arg1[0] ^ arg2[0];
    const mask = 0x1;
    let hammingDistance = 0;
    for (let i=0; i<32; ++i) {
        hammingDistance += (xorDiff & mask);
        xorDiff >>= 1;
    }
    return hammingDistance;
}

