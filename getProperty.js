if (typeof window === 'undefined') {
    module.exports = getProperty;
}

function getProperty(key) {
    if(arguments.length === 1) {
        return function(obj) {
            return obj[key];
        }
    }

    var keys = [].slice.call(arguments);
    var getters = keys.map(_ary(getProperty));
    return compose.apply(null, getters);
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
