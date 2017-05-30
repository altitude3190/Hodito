import jetpack from 'fs-jetpack';
import { remote } from 'electron';

export default class {

    constructor(data) {
        this.fileName = data.fileName;
        this.filePath = `${remote.app.getPath('userData')}/DataFiles/${this.fileName}.json`;
    }

    read() {
        return jetpack.read(this.filePath, 'json');
    }

    write(data) {
        return jetpack.write(this.filePath, data);
    }

}

