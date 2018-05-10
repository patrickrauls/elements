import React from 'react';
import I from './I';
import StyledI from './index';
import toJson from 'enzyme-to-json'
import 'jest-styled-components';


describe('I (icon component)', () => {
  describe('unit tests', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<I icon="check" />);
      expect(wrapper.exists()).toBe(true);
    });
  });
  describe('ui tests', () => {
    const setup = props => shallow(<StyledI icon="check" {...props} />);
    it('adds styles to the component', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
    it('displays the icon when not given a hidden prop', () => {
      const wrapper = setup();
      expect(toJson(wrapper)).not.toHaveStyleRule('display', 'none');
    });
    it('hides the icon when given hidden prop', () => {
      const wrapper = setup({ hidden: true });
      expect(toJson(wrapper)).toHaveStyleRule('display', 'none');
    });
  });
});
