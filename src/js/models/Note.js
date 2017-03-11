import m from 'mithril';
import Collection from '../lib/Collection';
import Model from '../lib/Model';
import _ from 'lodash';
import IdMaker from '../util/IdMaker';
import moment from 'moment';

class Note extends Model {

    constructor(data) {
        super(data);
        this.props = ['id', 'title', 'folderId', 'createdAt', 'updatedAt', 'content'];
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

    addDefaultDataList(folderId) {
        const now = moment().unix();
        this.add([
            {
                id: IdMaker.makeId(),
                title: 'no title',
                folderId,
                createdAt: now,
                updatedAt: now,
                content: '',
            },
        ]);
    }

}
