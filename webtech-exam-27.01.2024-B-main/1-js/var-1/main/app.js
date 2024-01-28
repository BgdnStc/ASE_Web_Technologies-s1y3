function updateProperty(arr, prop, f) {
    if (typeof (prop) != 'string') {
        throw new Error('Second input should be a string');
    }
    if (typeof (f) != 'function') {
        throw new Error('Third input should be a function');
    }
    if (!Array.isArray(arr)) {
        throw new Error('First input should be an array');
    }
    for (i = 0; i < arr.length; i++) {
        if (typeof (arr[i]) != 'object') {
            throw new Error('Each element should be an object');
        }
    }
    for (i = 0; i < arr.length; i++) {
        if (arr[i][prop]) {
            arr[i][prop] = f(arr[i][prop]);
        }
    }
}

const app = {
    updateProperty
}

module.exports = app