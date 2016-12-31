import styles from '../css/my.sass';
import m from 'mithril';
import home from './components/Home';

m.route.mode = 'hash';
m.route(document.getElementById('columns'), '/', {
    '/': home,
});
