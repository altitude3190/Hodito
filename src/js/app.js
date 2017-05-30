import m from 'mithril';
import Home from './components/Home';

// override original mithril's method
m.withAttr = (attrName, callback1, context) => {
    return (e) => {
        let target = attrName in e.currentTarget ?
            e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName);

        // the following line is a difference from the original
        if (target && target.match(/^(?:[1-9][0-9]*|0)$/)) target = Number(target);

        callback1.call(context || this, target);
    };
};

m.route.prefix('#');
m.route(document.getElementById('columns'), '/', {
    '/': Home,
});
