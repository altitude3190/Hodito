import _ from 'lodash';
import moment from 'moment';
import DataStore from '../lib/DataStore';
import Publisher from '../lib/Publisher';

export default class {

    constructor(noteId) {
        Publisher.on('showNote', this.updateDisplayNoteId, this);

        this.currentDisplayNoteId = noteId;
        this.mode = 'preview';
        this.timer = void 0;
    }

    getDisplayNoteModel() {
        const noteCollection = DataStore.get('noteCollection');
        return noteCollection.findWhere({ id: this.currentDisplayNoteId });
    }

    updateDisplayNoteId(noteId) {
        this.currentDisplayNoteId = noteId;
    }

    updateNoteTitle(newNoteTitle) {
        const noteModel = this.getDisplayNoteModel();
        if (noteModel.title() === newNoteTitle) return;

        noteModel.title(newNoteTitle);
        noteModel.updatedAt(moment().unix());
        DataStore.get('noteCollection').save();
    }

    isPreviewMode() {
        return this.mode === 'preview';
    }

    switchMode() {
        this.mode = this.isPreviewMode() ? 'edit' : 'preview';
    }

    saveAtRegularInterval(options) {
        this.clearTimer();

        if (this.isPreviewMode()) return;

        const noteModel =
            _.isObject(options) && options.noteModel ?
            options.noteModel : this.getDisplayNoteModel();

        this.timer = setInterval(() => {
            const val = document.getElementById('note-textarea').value;
            if (val === noteModel.content()) return;
            noteModel.content(val);
            noteModel.updatedAt(moment().unix());
            DataStore.get('noteCollection').save();
        }, 2000);
    }

    clearTimer() {
        if (this.timer) clearTimeout(this.timer);
    }

}
