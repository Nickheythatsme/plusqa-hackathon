import PHash, {perceptualHash, hammingDistance} from '../src/models/pHash';
import * as assert from 'assert';

describe('perceptual hash functions perform as intended', function() {
    it('can calculate a perceptual hash', function() {
        const data = '!this is some data';
        const similarData = 'this is some data!';
        const hash = perceptualHash(data);
        const similarHash = perceptualHash(similarData);
        assert.ok(hash[0] > 0);
        assert.ok(similarHash[0] > 0);
    });

    it('can calculate the hamming distance between two strings', function() {
        const data = 'this! is some data';
        const similarData = 'this is some data!';
        const distance = hammingDistance(data, similarData);
        console.log('distance: ', distance);
    })

    it('can use the pHash object', function() {
        const phash = new PHash('this is data!');
        const value = phash.value
        phash.set('new value!');
        assert.notEqual(phash.value, value);
    });
});