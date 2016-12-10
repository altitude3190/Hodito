import vm from '../../vms/mainview/NoteList';

export default () => {
    const noteCollection = vm.build();
    return {
        noteCollection,
    };
};
