import _ from 'lodash';
import DataStore from '../lib/DataStore';
import NoteCollection from '../models/Note';

let displayNoteModelsCond = {};

export default {
    build() {
        const noteCollection = new NoteCollection();
        noteCollection.fetch();
        return noteCollection;
    },
    updateDisplayNoteModelsCond(options) {
        displayNoteModelsCond = _.assign({}, displayNoteModelsCond, options);
    },
    getDisplayNoteModels() {
        const noteCollection = DataStore.get('noteCollection');
        if (displayNoteModelsCond.folderId) return noteCollection.filter({ folder: '' + displayNoteModelsCond.folderId });
        return noteCollection.models();
    },
    createNewNote() {
        const noteCollection = DataStore.get('noteCollection');
        const currentFolderId = displayNoteModelsCond.folderId;
        noteCollection.addDefaultDataList(currentFolderId);
        noteCollection.save();
    },
    deleteNote(targetAttr) {
        const noteCollection = DataStore.get('noteCollection');
        noteCollection.delete(targetAttr);
        noteCollection.save();
    },
};
