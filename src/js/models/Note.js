import m from 'mithril';
import Collection from '../lib/Collection';
import Model from '../lib/Model';
import _ from 'lodash';

class Note extends Model {

    constructor(data) {
        super(data);
        this.props = ['id', 'title', 'key', 'createdAt', 'updatedAt', 'content'];
        _.forEach(this.props, prop => {
            this[prop] = m.prop(data[prop]);
        });
    }

}

export default class extends Collection {

    constructor() {
        super({
            modelClass: Note,
            modelClassName: 'Note',
        });
    }

    fetch() {
        const notes = this.read(this.modelClassName);
        this.add(notes);
    }

}
