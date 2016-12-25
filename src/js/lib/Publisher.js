import _ from 'lodash';

const callbackMapByEvent = {};

export default {
    on(event, callback, context) {
        if (!callbackMapByEvent[event]) callbackMapByEvent[event] = [];
        callbackMapByEvent[event].push({ callback, context });
    },
    off(event, callback, context) {
        _.remove(callbackMapByEvent[event], (map) => {
            return map.callback === callback && map.context === context;
        });
    },
    trigger(event, arg) {
        if (_.isArray(arg)) {
            _.forEach(callbackMapByEvent[event], (map) => {
                map.callback.apply(map.context, arg);
            });
        } else {
            _.forEach(callbackMapByEvent[event], (map) => {
                map.callback.call(map.context, arg);
            });
        }
    },
};
