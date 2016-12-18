import m from 'mithril';
import _ from 'lodash';
import DataStore from './DataStore';

export default class {

    constructor(data) {
        this.modelClass = data.modelClass;
        this.modelClassName = data.modelClassName;
        this.models = m.prop([]);
        this.dataStore = new DataStore({ fileName: data.modelClassName });
    }

    add(dataList) {
        _.forEach(dataList, data => {
            const ModelClass = this.modelClass;
            const model = new ModelClass(data);
            this.models().push(model);
        });
    }

    read() {
        return this.dataStore.read();
    }

    fetch() {
        const notes = this.read(this.modelClassName);
        this.add(notes);
    }

    save() {
        const data = _.map(this.models(), model => {
            return model.toJson();
        });
        this.dataStore.write(data);
    }

    findWhere(attrs) {
        return _.find(this.models(), (model) => {
            return _.every(attrs, (val, key) => {
                if (!_.isFunction(model[key])) return false;
                return model[key]() === val;
            });
        });
    }

    filter(filterOptions) {
        return _.filter(this.models(), model => {
            return _.every(filterOptions, (val, key) => {
                if (!_.isFunction(model[key])) return false;
                return model[key]() === val;
            });
        });
    }

}
