import createStateFactory from '../../shared/util/createStateFactory';

const createNextRailState = createStateFactory(() => ({
    index: 0,
    tileCount: -1,
    tileWidths: [],
    viewportWidth: -1,
    trackPadding: -1,

    get isAtLeftEdge() {
        return this.index === 0;
    },

    get isAtRightEdge() {
        return this.trackX <= this.minTrackX;
    },

    get minTrackX() {
        const totalWidth = this.tileWidths.reduce(
            (sum, width) => sum + width,
            0
        );

        return -(totalWidth + this.trackPadding) + this.viewportWidth;
    },

    get trackX() {
        let trackX = 0;

        for (let i = 0; i < this.index; i++) {
            trackX -= this.tileWidths[i];
        }

        return Math.min(0, Math.max(this.minTrackX, trackX));
    },

    get nextIndex() {
        let nextIndex = this.index;
        let offset = this.tileWidths[nextIndex];

        while (offset < this.viewportWidth) {
            nextIndex++;
            offset += this.tileWidths[nextIndex];
        }

        return nextIndex;
    },

    get prevIndex() {
        let prevIndex = this.index;
        let offset = this.tileWidths[prevIndex];

        while (offset < this.viewportWidth) {
            prevIndex++;
            offset += this.tileWidths[prevIndex];
        }

        return prevIndex;
    }
}));

export default createNextRailState;
