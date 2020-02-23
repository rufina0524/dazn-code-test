import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import { mount } from 'enzyme';

import App from './App';
import { RAILS_PATH } from './services/constants/paths';

describe('<App />', function() {
    const self = this;

    before(() => {
        self.addEventHandlerSpy = spy(window, 'addEventListener');
        self.fetchStub = stub(window, 'fetch').resolves({
            ok: true,
            json: () => Promise.resolve([])
        });
    });

    after(() => {
        self.addEventHandlerSpy.restore();
        self.fetchStub.restore();
    });

    it('attaches a click handler to the `window` when mounted', () => {
        const wrapper = mount(<App />);

        assert.isTrue(
            self.addEventHandlerSpy.calledWith(
                'click',
                wrapper.instance().handleLinkClick
            )
        );
    });

    it('requests rails data when mounted', () => {
        const wrapper = mount(<App />);

        assert.isTrue(self.fetchStub.calledWith(RAILS_PATH));
    });
});
