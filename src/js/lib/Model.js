import _ from 'lodash';

export default class {

    constructor(data) {
        this.attrs = data;
        this.props = [];
    }

    toJson() {
        const json = {};
        _.forEach(this.props, prop => {
            json[prop] = this[prop]();
        });
        return json;
    }

}
