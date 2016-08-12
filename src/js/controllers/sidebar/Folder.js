import vm from '../../vms/sidebar/Folder';

export default () => {
    const folderCollection = vm.build();
    return {
        folderCollection,
    };
};
