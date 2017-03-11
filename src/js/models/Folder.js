import m from 'mithril';
import Collection from '../lib/Collection';
import Model from '../lib/Model';
import _ from 'lodash';
import IdMaker from '../util/IdMaker';
import moment from 'moment';

class Folder extends Model {

    constructor(data) {
        super(data);
        this.props = ['id', 'name', 'createdAt', 'updatedAt'];
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
        const now = moment().unix();
        this.add([
            {
                id: IdMaker.makeId(),
                name: 'new folder',
                createdAt: now,
                updatedAt: now,
            },
        ]);
    }

}
