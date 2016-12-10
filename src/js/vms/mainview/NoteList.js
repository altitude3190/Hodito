import NoteCollection from '../../models/Note';


export default {
    build() {
        const noteCollection = new NoteCollection();
        noteCollection.fetch();
        return noteCollection;
    },
};
