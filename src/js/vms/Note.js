import prop from 'mithril/stream';
import _ from 'lodash';
import moment from 'moment';
import DataStore from '../lib/DataStore';
import { NOTE_MODES } from '../Constant';

export default class {

    constructor() {
        this.currentDisplayNoteId = prop(void 0);
        this.mode = NOTE_MODES.PREVIEW;
        this.timer = void 0;
    }

    onShowNote(noteId) {
        this.currentDisplayNoteId(noteId);
        this.changeMode(NOTE_MODES.PREVIEW);
    }

    getDisplayNoteModel() {
        const noteCollection = DataStore.get('noteCollection');
        return noteCollection.findWhere({ id: this.currentDisplayNoteId() });
    }

    updateNoteTitle(newNoteTitle) {
        const noteModel = this.getDisplayNoteModel();
        if (noteModel.title() === newNoteTitle) return;

        noteModel.title(newNoteTitle);
        noteModel.updatedAt(moment().unix());
        DataStore.get('noteCollection').save();
    }

    isPreviewMode() {
        return this.mode === NOTE_MODES.PREVIEW;
    }

    changeMode(nextMode) {
        if (!nextMode) {
            this.mode = this.isPreviewMode() ? NOTE_MODES.EDIT : NOTE_MODES.PREVIEW;
            return;
        }
        if (!_.includes(_.values(NOTE_MODES), nextMode)) throw new Error('invalid next mode');
        this.mode = nextMode;
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
