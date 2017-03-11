class IdMaker {
    constructor() {
        this.lastUnixTime = 0;
        this.serialNum = 0;
    }

    makeId() {
        const date = new Date();
        const now = date.getTime(); // current msec unixtime

        if (now !== this.lastUnixTime) {
            this.serialNum = 0;
        } else {
            this.serialNum++;
            if (this.serialNum >= 10) {
                throw new Error('too many requests for making ids at the same time');
            }
        }
        this.lastUnixTime = now;

        return Number(`${now}${this.serialNum}`);
    }
}

// IdMaker is a singleton because it always needs to make an uniq id
export default new IdMaker();
