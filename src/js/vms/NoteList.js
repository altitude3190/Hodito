import m from 'mithril';
import prop from 'mithril/stream';
import _ from 'lodash';
import DataStore from '../lib/DataStore';
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

export default class {

    constructor() {
        this.currentSelectedNoteId = prop(void 0);
        this.currentSelectedFolderId = prop(void 0);
    }

    updateCurrentSelectedFolderId(folderId) {
        this.currentSelectedFolderId(folderId);
    }

    getDisplayNoteModels() {
        const noteCollection = DataStore.get('noteCollection');
        if (this.currentSelectedFolderId()) {
            return noteCollection.filter({ folderId: this.currentSelectedFolderId() });
        }
        return noteCollection.models();
    }

    createNewNote() {
        const noteCollection = DataStore.get('noteCollection');
        const currentFolderId = this.currentSelectedFolderId() || 0;
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
        this.currentSelectedNoteId(noteId);
    }

}
