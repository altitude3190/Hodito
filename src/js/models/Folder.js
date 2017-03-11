import m from 'mithril';
import Collection from '../lib/Collection';
import Model from '../lib/Model';
import _ from 'lodash';
import IdMaker from '../util/IdMaker';

class Folder extends Model {

    constructor(data) {
        super(data);
        this.props = ['id', 'name', 'key', 'createdAt', 'updatedAt', 'content'];
        _.forEach(this.props, prop => {
            this[prop] = m.prop(data[prop]);
        });
    }

}

export default class extends Collection {

    constructor() {
        super({
            modelClass: Folder,
            modelClassName: 'Folder',
        });
    }

    fetch() {
        const folders = this.read('Folder');
        this.add(folders);
    }

    addDefaultDataList() {
        this.add([
            {
                id: IdMaker.makeId(),
                name: 'new folder',
            },
        ]);
    }

}
