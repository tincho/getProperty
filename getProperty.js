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
    return compose(getProperty(keys[0]), getProperty(keys[1]));
}

function compose() {
    var fs = Array.prototype.slice.call(arguments);
    return function(x) {
        return fs.reduce(function(p, f) {
            return f(p);
        }, x);
    }
}
