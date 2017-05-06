import m from 'mithril';
import _ from 'lodash';
import DataStore from '../lib/DataStore';
import NoteCollection from '../models/Note';
import Publisher from '../lib/Publisher';
import { remote } from 'electron';

const { Menu, MenuItem } = remote;
const makeContextMenu = (noteId) => {
    const folderListContextMenus = [
        {
            label: 'delete',
            click() {
                Publisher.trigger('deleteNote', noteId);
            },
        },
    ];
    const folderListContextMenu = new Menu();
    _.forEach(folderListContextMenus, (menu) => {
        folderListContextMenu.append(new MenuItem(menu));
    });
    return folderListContextMenu;
};

let displayNoteModelsCond = {};

export default class {
    build() {
        const noteCollection = new NoteCollection();
        noteCollection.fetch();
        return noteCollection;
    }
    updateDisplayNoteModelsCond(options) {
        displayNoteModelsCond = _.assign({}, displayNoteModelsCond, options);
    }
    getDisplayNoteModels() {
        const noteCollection = DataStore.get('noteCollection');
        if (displayNoteModelsCond.folderId) {
            return noteCollection.filter({ folderId: displayNoteModelsCond.folderId });
        }
        return noteCollection.models();
    }
    createNewNote() {
        const noteCollection = DataStore.get('noteCollection');
        const currentFolderId = displayNoteModelsCond.folderId || 0;
        noteCollection.addDefaultDataList(currentFolderId);
        noteCollection.save();
    }
    deleteNote(noteId) {
        const noteCollection = DataStore.get('noteCollection');
        noteCollection.delete({ id: noteId });
        noteCollection.save();
        m.redraw();
    }
    showContextMenu(noteId) {
        Publisher.on('deleteNote', this.deleteNote, this);
        makeContextMenu(noteId).popup(remote.getCurrentWindow());
    }
    onClickNote(noteId) {
        Publisher.trigger('showNote', noteId);
    }
}
