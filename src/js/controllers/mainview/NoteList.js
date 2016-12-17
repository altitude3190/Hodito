import vm from '../../vms/mainview/NoteList';
import m from 'mithril';

export default function() {
    this.noteCollection = vm.build();
    this.createNewNote = function() {
        const key = 'hogehoge' + new Date();
        this.noteCollection.add([
            {
                id: 'hogehoge' + new Date(),
                title: 'new title',
                key: 'hogehoge' + new Date(),
                createdAt: 11111,
                updatedAt: 22222,
                content: 'hoge\nhoge'
            },
        ]);
        this.noteCollection.save();
        m.route(`/note/${key}/edit`);
    };
    return {
        noteCollection: this.noteCollection,
        createNewNote: this.createNewNote,
    };
};
