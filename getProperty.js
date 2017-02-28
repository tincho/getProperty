if (typeof window === 'undefined') {
    module.exports = getProperty;
}

function getProperty() {
    var
        args    = [].slice.call(arguments),
        getters = mkGetters(args);

    return compose.apply(null, getters);

    function mkGetters(args) {
        var keys  = args;
        if (args.length === 1) {
            keys = args[0];
            if (!Array.prototype.isPrototypeOf(keys)) {
                keys = args[0].split(".");
            }
        }
        return keys.map(_ary(function(key) {
            return function(obj) {
                return obj[key];
            }
        }));
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

function _ary(fn, arity) {
    arity = arity || 1;
    return function() {
        var args = Array.prototype.slice.call(arguments, 0, arity);
        return fn.apply(null, args);
    };
}
