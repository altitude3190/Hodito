import m from 'mithril';
import vm from '../../../vms/mainview/note/Note';

export default () => {
    const noteCollection = vm.build();
    return {
        model: noteCollection.findWhere({ key: m.route.param('key') }),
    };
};
