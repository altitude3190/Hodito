import m from 'mithril';
import NoteList from './NoteList';
import Folder from './FolderList';
import Note from './Note';
import DataStore from '../lib/DataStore';
import FolderCollection from '../models/Folder';
import NoteCollection from '../models/Note';

export default {
    oninit() {
        const folderCollection = new FolderCollection();
        folderCollection.fetch();
        const noteCollection = new NoteCollection();
        noteCollection.fetch();

        DataStore.set('folderCollection', folderCollection);
        DataStore.set('noteCollection', noteCollection);
    },
    onremove() {
        DataStore.reset();
    },
    view() {
        return [
            m(Folder),
            m(NoteList),
            m(Note),
        ];
    },
};
