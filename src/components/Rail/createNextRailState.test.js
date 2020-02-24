import { assert } from 'chai';
import { stub } from 'sinon';
import createNextRailState from './createNextRailState';

const tileWidths = [200, 200, 200, 200, 200, 200];

describe('createNextRailState', () => {
    describe('isAtLeftEdge()', () => {
        it('should return true if index is 0', () => {
            const state = createNextRailState({
                index: 0
            });
            assert.isTrue(state.isAtLeftEdge);
        });
    
        it('should return false if index is not 0', () => {
            const state = createNextRailState({
                index: 1
            });
            assert.isFalse(state.isAtLeftEdge);
        });
    });

    describe('isAtRight()', () => {
        it('should return true if trackX is less than minTrackX', () => {
            const state = createNextRailState({});
            stub(state, 'trackX').value(0);
            stub(state, 'minTrackX').value(1);

            assert.isTrue(state.isAtRightEdge);
        });

        it('should return true if trackX equals minTrackX', () => {
            const state = createNextRailState({});
            stub(state, 'trackX').value(0);
            stub(state, 'minTrackX').value(0);

            assert.isTrue(state.isAtRightEdge);
        });
    
        it('should return true if trackX is greater than minTrackX', () => {
            const state = createNextRailState({});
            stub(state, 'trackX').value(1);
            stub(state, 'minTrackX').value(0);

            assert.isFalse(state.isAtRightEdge);
        });
    });

    describe('minTrackX', () => {
        it('should return correct minTrackX if minTrack is greater than trackX and 0', () => {
            const params = {
                viewportWidth: 800,
                trackPadding: 100,
                tileWidths
            };
            const state = createNextRailState(params);
            const expectedValue = -(tileWidths.length * 200 + params.trackPadding) + params.viewportWidth;
            assert.equal(state.minTrackX, expectedValue);
        });
    });

    describe('tractX', () => {
        it('should return correct trackX if minTrack is greater than trackX and 0', () => {
            const state = createNextRailState({
                index: 0,
                tileWidths
            });
    
            stub(state, 'minTrackX').value(1);    
            assert.equal(state.trackX, 0);
        });

        it('should return correct trackX if minTrack is smaller than trackX and 0', () => {
            const state = createNextRailState({
                index: 0,
                tileWidths
            });
    
            stub(state, 'minTrackX').value(-400);    
            assert.equal(state.trackX, 0);
        });

        it('should return correct trackX if minTrack is greater than trackX and smaller than 0', () => {
            const state = createNextRailState({
                index: 1,
                tileWidths
            });
    
            stub(state, 'minTrackX').value(-1);    
            assert.equal(state.trackX, -1);
        });
    });

    describe('nextIndex', () => {
        it('should return correct next index', () => {
            const onScreenLength = 4;
            const state = createNextRailState({
                index: 0,
                viewportWidth: 200 * onScreenLength,
                tileWidths
            });

            assert.equal(state.nextIndex, onScreenLength - 1);
        });
    });

    describe('prevIndex', () => {
        it('should return correct prev index', () => {
            const offScreenLength = 2;
            const state = createNextRailState({
                index: tileWidths.length - 1,
                viewportWidth: 200 * (tileWidths.length - offScreenLength),
                tileWidths
            });

            assert.equal(state.prevIndex, offScreenLength);
        });
    });
});