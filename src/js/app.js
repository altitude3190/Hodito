import m from 'mithril';
import home from './components/Home';

// override original mithril's method
m.withAttr = (prop, withAttrCallback, callbackThis) => {
    return (e) => {
        const event = e || window.event;

        const currentTarget = event.currentTarget || this;
        const that = callbackThis || this;

        let target = prop in currentTarget ?
            currentTarget[prop] :
            currentTarget.getAttribute(prop);

        // the following line is a difference from the original
        if (target.match(/^(?:[1-9][0-9]*|0)$/)) target = Number(target);

        withAttrCallback.call(that, target);
    };
};

m.route.mode = 'hash';
m.route(document.getElementById('columns'), '/', {
    '/': home,
});
