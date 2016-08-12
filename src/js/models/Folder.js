import m from 'mithril';
import Collection from '../lib/Collection';

class Folder {

    constructor(data) {
        this.id = m.prop(data.id);
        this.name = m.prop(data.name);
    }

}

export default class extends Collection {

    constructor() {
        super({ modelClass: Folder });
    }

    fetch() {
        const folders = this.read('Folder').folders;
        this.add(folders);
    }

}
