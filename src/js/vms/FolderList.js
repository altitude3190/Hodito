import DataStore from '../lib/DataStore';
import FolderCollection from '../models/Folder';


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
};

