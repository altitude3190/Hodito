import styles from '../css/app.sass';
import m from 'mithril';
import folder from './components/sidebar/Folder';

m.route.mode = 'hash';
m.route(document.getElementById('sidebar-folder-list'), '/', {
    '/': folder,
});
