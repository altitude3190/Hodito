import m from 'mithril';
import NoteList from './NoteList';
import Folder from './FolderList';
import Note from './Note';
import NoteListVm from '../vms/NoteList';
import DataStore from '../lib/DataStore';
import FolderCollection from '../models/Folder';

export default {
    controller() {
        const folderCollection = new FolderCollection();
        folderCollection.fetch();

        DataStore.set('noteCollection', NoteListVm.build());
        DataStore.set('folderCollection', folderCollection);
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
