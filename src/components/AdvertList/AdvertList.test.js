import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import AdvertList from './AdvertList';

configure({ adapter: new Adapter() });

const defaultProps = {
    adverts: {
        count: 1,
        results: [
            {
                createdAt: '2019-10-21T15:26:08.224Z',
                description: 'Vendo XBOX One X como nueva. No tengo tiempo para jugar',
                id: '5db5c80cb00acc1d9437de43',
                name: 'XBOX OneX',
                photo: 'http://localhost:3001/images/anuncios/xbox.jpg',
                price: 35.6,
                tags: ['lifestyle'],
                type: 'sell'
            }
        ],
        success: true
    }
};

const render = props => shallow(<AdvertList {...defaultProps} {...props} />);
let wrapper;


describe('AdvertList component test', () => {
    beforeEach(() => {
        wrapper = render();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render adverts list container', () => {
        expect(wrapper.find('.adverts-container')).toHaveLength(1);
    });
}); 