import m from 'mithril';
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
        this.currentSelectedFolderId = void 0;
        this.currentBeingEditedFolderId = void 0;
    }

    showContextMenu(folderId) {
        Publisher.on('deleteFolder', this.deleteFolder, this);
        makeContextMenu(folderId).popup(remote.getCurrentWindow());
    }

    onClickFolderName(folderId) {
        Publisher.trigger('onClickFolderName', { folderId });
        this.currentSelectedFolderId = folderId;
    }

    getSelectedFolderId() {
        return this.currentSelectedFolderId;
    }

    getBeingEditedFolderId() {
        return this.currentBeingEditedFolderId;
    }

    updateBeingEditedFolderId(folderId) {
        this.currentBeingEditedFolderId = folderId;
    }

    createNewFolder() {
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.addDefaultDataList();
        folderCollection.save();
    }

    deleteFolder(folderId) {
        m.redraw.strategy('diff');
        m.startComputation();
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.delete({ id: folderId });
        folderCollection.save();
        m.endComputation();
    }

    updateFolderName(newFolderName) {
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.update(
            { id: this.currentBeingEditedFolderId },
            {
                name: newFolderName,
                updatedAt: moment().unix(),
            }
        );
        folderCollection.save();
        this.currentBeingEditedFolderId = void 0;
    }

}
