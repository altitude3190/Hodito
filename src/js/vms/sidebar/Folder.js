import FolderCollection from '../../models/Folder';


export default {
    build() {
        const folderCollection = new FolderCollection();
        folderCollection.fetch();
        return folderCollection;
    },
};

