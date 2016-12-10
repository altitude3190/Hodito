import styles from '../css/app.sass';
import m from 'mithril';
import folder from './components/sidebar/Folder';
import noteList from './components/mainview/NoteList';
import note from './components/mainview/note/Note';

m.mount(document.getElementById('sidebar-folder-list'), folder);
m.mount(document.getElementById('note-list'), noteList);

m.route.mode = 'hash';
m.route(document.getElementById('note-container'), '/', {
    '/note/:key': note,
});
