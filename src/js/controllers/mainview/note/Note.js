import m from 'mithril';
import vm from '../../../vms/mainview/note/Note';

export default () => {
    const noteCollection = vm.build();
    const model = noteCollection.findWhere({ key: m.route.param('key') });
    setInterval(() => {
        model.content(document.getElementById('note-content-textarea').value);
        noteCollection.save();
    }, 2000);
    return { model };
};
