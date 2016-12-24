import m from 'mithril';
import noteList from './NoteList';
import folder from './FolderList';
import note from './Note';
import noteListVm from '../vms/mainview/NoteList';
import folderListVm from '../vms/sidebar/Folder';
import DataStore from '../lib/DataStore';

export default {
    controller() {
        DataStore.set('noteCollection', noteListVm.build());
        DataStore.set('folderCollection', folderListVm.build());
        this.unload = () => {
            DataStore.reset();
        };
    },
    view() {
        return [
            m.component(folder),
            m.component(noteList),
            m.component(note),
        ];
    },
};
