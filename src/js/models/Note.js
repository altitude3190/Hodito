import m from 'mithril';
import Collection from '../lib/Collection';
import Model from '../lib/Model';
import _ from 'lodash';

class Note extends Model {

    constructor(data) {
        super(data);
        this.props = ['id', 'title', 'key', 'folder', 'createdAt', 'updatedAt', 'content'];
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
        this.add([
            {
                id: 'hogehoge' + new Date(),
                title: 'new title',
                key: 'hogehoge' + new Date(),
                folder: '' + folderId,
                createdAt: 11111,
                updatedAt: 22222,
                content: 'hoge\nhoge'
            }
        ]);
    }

}
