if (typeof window === 'undefined') {
    module.exports = getProperty;
}

function getProperty() {
    var getters = mkGetters([].slice.call(arguments));
    return compose.apply(null, getters);

    function mkGetters(args) {
        var keys = args;
        if (args.length === 1) {
            keys = args[0];
            if (!Array.prototype.isPrototypeOf(keys)) {
                keys = args[0].split(".");
            }
        }
        return keys.map(function(key) {
            return function(obj) {
                return obj[key];
            }
        });
    }
}

function compose() {
    var fs = Array.prototype.slice.call(arguments);
    return function(x) {
        return fs.reduce(function(p, f) {
            return f(p);
        }, x);
    }
}
