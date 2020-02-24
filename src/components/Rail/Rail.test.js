import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { spy } from 'sinon';
import Rail from './Rail';

describe('Rail', () => {
    describe('componentWDidMount()', () => {
        it('should add event listener aft', () => {
            const spyAddEventHandler = spy(window, 'addEventListener');
            const comp = mount(<Rail tiles={[]} />);

            assert.isTrue(spyAddEventHandler.calledWith(
                'resize',
                comp.instance().handleResize
            ));
        });
    });

    describe('componentWillUnmount()', () => {
        it('should remove event listener after unmount', () => {
            const spyRemoveEventHandler = spy(window, 'removeEventListener');
            const comp = mount(<Rail tiles={[]} />);
            const handleResize = comp.instance().handleResize;
            comp.unmount();

            assert.isTrue(spyRemoveEventHandler.calledWith(
                'resize',
                handleResize
            ));
        });
    });
});