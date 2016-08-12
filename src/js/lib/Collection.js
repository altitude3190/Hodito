import m from 'mithril';
import _ from 'lodash';
import DataStore from './DataStore';

export default class {

    constructor(data) {
        this.modelClass = data.modelClass;
        this.models = m.prop([]);
    }

    add(dataList) {
        _.forEach(dataList, data => {
            const ModelClass = this.modelClass;
            const model = new ModelClass(data);
            this.models().push(model);
        });
    }

    read(fileName) {
        const dataStore = new DataStore({ fileName });
        return dataStore.read();
    }

}
