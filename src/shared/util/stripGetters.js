const stripGetters = (obj, model) =>
    Object.keys(obj).reduce((copy, key) => {
        const descriptor = Object.getOwnPropertyDescriptor(model, key);

        if (typeof descriptor.get !== 'function') {
            copy[key] = obj[key];
        }

        return copy;
    }, {});

export default stripGetters;
