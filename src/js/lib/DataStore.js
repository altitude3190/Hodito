let data = {};

export default {
    get(key) {
        return data[key];
    },
    set(key, val) {
        data[key] = val;
    },
    reset() {
        data = {};
    },
};
