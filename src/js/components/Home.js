import m from 'mithril';
// import note from './mainview/note/Note';
import noteList from './NoteList';
import folder from './FolderList';
import noteListVm from '../vms/mainview/NoteList';
import folderListVm from '../vms/sidebar/Folder';
import observer from '../lib/Observer';
import shareData from './shareData/Home';

export default {
    controller: function() {
        shareData.noteCollection = noteListVm.build();
        shareData.folderCollection = folderListVm.build();
        this.sharedData = {
            folderCollection : folderListVm.build(),
        }
    },
    view: function(ctrl) {
        return [
            m.component(folder, ctrl.sharedData),
            m.component(noteList),
            // m.mount(document.getElementById('note-container'), note),
        ];
    }
};