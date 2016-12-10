import m from 'mithril';
import Collection from '../lib/Collection';

class Note {

    constructor(data) {
        this.id = m.prop(data.id);
        this.title = m.prop(data.title);
    }

}

export default class extends Collection {

    constructor() {
        super({ modelClass: Note });
    }

    fetch() {
        const notes = this.read('Note').notes;
        this.add(notes);
    }

}
