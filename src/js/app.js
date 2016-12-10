import styles from '../css/app.sass';
import m from 'mithril';
import folder from './components/sidebar/Folder';
import noteList from './components/mainview/NoteList';

m.route.mode = 'hash';
// m.route(document.getElementById('sidebar-folder-list'), '/', {
//     '/': folder,
// });
m.mount(document.getElementById('sidebar-folder-list'), folder);
m.mount(document.getElementById('note-list'), noteList);
