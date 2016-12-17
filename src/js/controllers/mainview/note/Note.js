import m from 'mithril';
import vm from '../../../vms/mainview/note/Note';
import COSNT from '../../../Config';

export default () => {
    const noteCollection = vm.build(); const key = m.route.param('key') || 'd64c2cefd722';
    // const model = noteCollection.findWhere({ key: m.route.param('key') });
    const model = noteCollection.findWhere({ key });
    const mode = m.route.param('mode') || COSNT.NOTE_MODE.PREVIEW;

    let timer = void 0;
    if (mode === COSNT.NOTE_MODE.EDIT) {
        timer = setInterval(() => {
            model.content(document.getElementById('note-content-textarea').value);
            noteCollection.save();
        }, 2000);
    }

    return { model, mode, onunload: function() { if (timer) clearTimeout(timer); } };
};
