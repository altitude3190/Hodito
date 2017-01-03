import m from 'mithril';
import DataStore from '../lib/DataStore';
import FolderCollection from '../models/Folder';

const editableTitleFolderId = m.prop(null);

export default {
    build() {
        const folderCollection = new FolderCollection();
        folderCollection.fetch();
        return folderCollection;
    },
    createNewFolder() {
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.addDefaultDataList();
        folderCollection.save();
    },
    deleteFolder(targetAttr) {
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.delete(targetAttr);
        folderCollection.save();
    },
    updateFolderName(newFolderName) {
        const folderCollection = DataStore.get('folderCollection');
        folderCollection.update({ key: editableTitleFolderId() }, { name: newFolderName });
        folderCollection.save();
    },
    editableTitleFolderId,
};

