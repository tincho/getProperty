if (typeof window === 'undefined') {
    module.exports = getProperty;
}

function getProperty(key) {
    var
        args    = [].slice.call(arguments),
        getters = mkGetters(args);

    if (getters.length) {
        return compose.apply(null, getters);
    }

    var key = args[0];
    return function(obj) {
        return obj[key];
    }

    function mkGetters(args) {
        if (args.length > 1) {
            return args.map(_ary(getProperty));
        }
        if (Array.prototype.isPrototypeOf(args[0])) {
            return args[0].map(_ary(getProperty));
        }
        return [];
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
