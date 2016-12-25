import jetpack from 'fs-jetpack';
import CONFIG from '../Config';

export default class {

    constructor(data) {
        this.fileName = data.fileName;
        this.filePath = `${CONFIG.SAVE_DATA_DIR}/${this.fileName}.json`;
    }

    read() {
        return jetpack.read(this.filePath, 'json');
    }

    write(data) {
        return jetpack.write(this.filePath, data);
    }

}

