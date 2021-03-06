/**
real-world usage of getProperty :

var $i = document.querySelector("#someInput");
$i.addEventListener("change", compose(getProperty("target.value"), doSomethingWithValue))
function doSomethingWithValue(value) {
    alert(value);
}
*/

var assert = require("assert");
var getProperty = require("./getProperty");

var tst = {
    event: {
        some: 1414,
        target: 1616
    },
    p: "q",
    one: {
        two: {
            three: "so deep.",
            three2: {
                four: "sooo deep."
            }
        }
    }
};

try {
    var plain = getProperty("p");
    assert.equal(plain(tst), "q", "Fail!!");
    console.log("passed plain");

    var deepComposed = compose(getProperty("event"), getProperty("target"));
    assert.equal(deepComposed(tst), 1616, "Fail!!");
    console.log("passed deepComposed");

    var deepArgs = getProperty("event", "target");
    assert.equal(deepArgs(tst), 1616, "Fail!!");
    console.log("passed deepArgs");

    var deeperArgs = getProperty("one", "two", "three");
    assert.equal(deeperArgs(tst), "so deep.", "Fail!!");
    console.log("passed deeperArgs");

    var deepDeeperArgs = getProperty("one", "two", "three2", "four");
    assert.equal(deepDeeperArgs(tst), "sooo deep.", "Fail!!");
    console.log("passed deepDeeperArgs");

    var deepArray = getProperty(["event", "target"]);
    assert.equal(deepArray(tst), 1616, "Fail!!");
    console.log("passed deepArray");
    var deepArray2 = getProperty(["one", "two", "three"]);
    assert.equal(deepArray2(tst), "so deep.", "Fail!!");
    console.log("passed deepArray too! ;)");

    var deepQuery = getProperty("event.target");
    assert.equal(deepQuery(tst), 1616, "Fail!!");
    console.log("passed deepQuery");
} catch(e) {
    console.log(e);
}

function compose() {
    var fs = Array.prototype.slice.call(arguments);
    return function(x) {
        return fs.reduce(function(p, f) {
            return f(p);
        }, x);
    }
}
