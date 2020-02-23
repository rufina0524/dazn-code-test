import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'node-fetch';

Enzyme.configure({ adapter: new Adapter() });

window.fetch = fetch;
