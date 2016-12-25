import m from 'mithril';
import NoteList from './NoteList';
import Folder from './FolderList';
import Note from './Note';
import NoteListVm from '../vms/NoteList';
import FolderListVm from '../vms/FolderList';
import DataStore from '../lib/DataStore';

export default {
    controller() {
        DataStore.set('noteCollection', NoteListVm.build());
        DataStore.set('folderCollection', FolderListVm.build());
        this.unload = () => {
            DataStore.reset();
        };
    },
    view() {
        return [
            m.component(Folder),
            m.component(NoteList),
            m.component(Note),
        ];
    },
};
