import m from 'mithril';
import note from './mainview/note/Note';
import noteList from './mainview/NoteList';

export default {
    controller: function() {
        this.createNewNote;
    },
    view: function(ctrl) {
        return [
            m.mount(document.getElementById('note-container'), note),
            m.component(noteList),
        ];
    }
};