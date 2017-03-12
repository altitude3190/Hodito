import m from 'mithril';
import _ from 'lodash';
import DataApi from './DataApi';

export default class {

    constructor(data) {
        this.modelClass = data.modelClass;
        this.modelClassName = data.modelClassName;
        this.models = m.prop([]);
        this.dataApi = new DataApi({ fileName: data.modelClassName });
    }

    add(dataList) {
        _.forEach(dataList, data => {
            const ModelClass = this.modelClass;
            const model = new ModelClass(data);
            this.models().push(model);
        });
    }

    update(targetAttrs, overwriteData) {
        _.forEach(this.models(), (model) => {
            const isMatch = _.every(targetAttrs, (val, key) => {
                return model[key]() === val;
            });
            if (!isMatch) return;
            _.forEach(overwriteData, (val, key) => {
                model[key](val);
            });
        });
    }

    delete(targetAttr) {
        if (!_.isObject(targetAttr)) throw new Error('targetAttr must be Object');
        const index = _.findIndex(this.models(), model => {
            return _.every(targetAttr, (val, key) => {
                return model[key]() === val;
            });
        });
        if (index === -1) return;
        this.models().splice(index, 1);
    }

    read() {
        return this.dataApi.read();
    }

    fetch() {
        const notes = this.read(this.modelClassName);
        this.add(notes);
    }

    save() {
        const data = _.map(this.models(), model => {
            return model.toJson();
        });
        this.dataApi.write(data);
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
