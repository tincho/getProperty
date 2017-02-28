var assert = require("assert");
var getProperty = require("./getProperty");

var tst = {
    event: {
        some: 1414,
        target: 1616
    },
    p: "q"
};

var plain = getProperty("p");
assert.equal(plain(tst), "q", "Fail!!");

var deepComposed = compose(getProperty("event"), getProperty("target"));
assert.equal(deepComposed(tst), 1616, "Fail!!");

var deepArgs = getProperty("event", "target");
assert.equal(deepArgs(tst), 1616, "Fail!!");

var deepQuery = getProperty("event.target");
assert.equal(deepQuery(tst), 1616, "Fail!!");

function compose() {
    var fs = Array.prototype.slice.call(arguments);
    return function(x) {
        return fs.reduce(function(p, f) {
            return f(p);
        }, x);
    }
}
