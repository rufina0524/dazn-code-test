import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import { mount } from 'enzyme';

import App from './App';
import { RAILS_PATH } from './services/constants/paths';

describe('<App />', function() {
    const self = this;

    before(() => {
        self.fetchStub = stub(window, 'fetch').resolves({
            ok: true,
            json: () => Promise.resolve([])
        });
    });

    after(() => {
        self.fetchStub.restore();
    });

    it('requests rails data when mounted', () => {
        mount(<App />);

        assert.isTrue(self.fetchStub.calledWith(RAILS_PATH));
    });
});
