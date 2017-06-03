import m from 'mithril';
import prop from 'mithril/stream';
import _ from 'lodash';
import moment from 'moment';
import DataStore from '../lib/DataStore';
import Publisher from '../lib/Publisher';
import { remote } from 'electron';

const { Menu, MenuItem } = remote;
const makeContextMenu = (folderId) => {
    const folderListContextMenus = [
        {
            label: 'delete',
            click() {
                Publisher.trigger('deleteFolder', folderId);
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
        this.currentSelectedFolderId = prop(void 0);
        this.currentBeingEditedFolderId = prop(void 0);
    }

    showContextMenu(folderId) {
        Publisher.on('deleteFolder', this.deleteFolder, this);
        makeContextMenu(folderId).popup(remote.getCurrentWindow());
    }

    onClickFolderName(folderId) {
        Publisher.trigger('onClickFolderName', folderId);
        this.currentSelectedFolderId(folderId);
    }

    onEnterKeyDown(e) {
        const ENTER_KEY_CODE = 13;
        if (e.keyCode !== ENTER_KEY_CODE) {
            // I want to write `e.redraw = false`,
            // but I write the following because of eslint no-param-reassign.
            _.assignIn(e, { redraw: false });
            return;
        }
        e.target.blur();
    }

    createNewFolder() {
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.addDefaultDataList();
        folderCollection.save();
    }

    deleteFolder(folderId) {
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.delete({ id: folderId });
        folderCollection.save();

        const noteCollection = DataStore.get('noteCollection');
        noteCollection.delete({ folderId });
        noteCollection.save();

        if (this.currentSelectedFolderId() === folderId) {
            Publisher.trigger('onClickFolderName', void 0);
        }

        m.redraw();
    }

    updateFolderName(newFolderName) {
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.update(
            { id: this.currentBeingEditedFolderId() },
            {
                name: newFolderName,
                updatedAt: moment().unix(),
            }
        );
        folderCollection.save();
        this.currentBeingEditedFolderId(void 0);
    }

}
