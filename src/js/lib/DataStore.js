import jetpack from 'fs-jetpack';
import CONFIG from '../Config';

export default class {

    constructor(data) {
        this.fileName = data.fileName;
    }

    read() {
        const filePath = `${CONFIG.SAVE_DATA_DIR}/${this.fileName}.json`;
        return jetpack.read(filePath, 'json');
    }

}

