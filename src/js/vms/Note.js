import NoteCollection from '../models/Note';
import DataStore from '../lib/DataStore';

let displayCond = {};
let mode = 'preview';
let timer = void 0;

export default {
    build() {
        const noteCollection = new NoteCollection();
        noteCollection.fetch();
        return noteCollection;
    },
    updateDisplayCond(cond) {
        displayCond = cond;
    },
    getModelByDisplayCond() {
        const noteCollection = DataStore.get('noteCollection');
        return noteCollection.findWhere({ key: displayCond.noteId });
    },
    changeMode() {
        mode = mode === 'preview' ? 'edit' : 'preview';
    },
    isPreviewMode() {
        return mode === 'preview';
    },
    saveAtRegularInterval(options) {
        if (this.isPreviewMode()) return;
        const noteModel = options.noteModel || this.getModelByDisplayCond();
        timer = setInterval(() => {
            noteModel.content(document.getElementById('note-textarea').value);
            DataStore.get('noteCollection').save();
        }, 2000);
    },
    clearTimer() {
        if (timer) clearTimeout(timer);
    },
};
