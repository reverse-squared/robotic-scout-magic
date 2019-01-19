const assert = require('assert');

describe('The Universe', function () {
    it('1+1 should equal 2', function () {
        assert.equal(1 + 1, 2);
    });
    it('1-1 should equal 0', function () {
        assert.equal(1 - 1, 0);
    });
    it('0/0 should not be anything', function () {
        assert.ok(isNaN(0 / 0));
    });
});