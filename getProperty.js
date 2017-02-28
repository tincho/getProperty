if (typeof window === 'undefined') {
    module.exports = getProperty;
}

function getProperty(key) {
    return function(obj) {
        return obj[key];
    }
}
