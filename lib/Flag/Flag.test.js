import React from 'react';

import Flag from './Flag';
import StyledFlag from './index';
import { icons } from '../utils/styling';

describe('Flag', () => {
  describe('unit tests', () => {
    let wrapper;
    const setup = props => shallow(<Flag type="hidden" {...props} />);
    it('should render without crashing', () => {
      wrapper = setup();
      expect(wrapper.exists()).toBe(true);
    });
    it('should add .hidden when given a type of hidden', () => {
      wrapper = setup({ type: "hidden" });
      expect(wrapper.hasClass('hidden')).toBe(true);
    });
    it('should show a valid icon when given a type of valid', () => {
      wrapper = setup({ type: 'valid' });
      expect(wrapper.hasClass(icons.valid)).toBe(true);
    });
    it('should show text of invalid when given an type of invalid', () => {
      wrapper = setup({ type: 'invalid' });
      expect(wrapper.text()).toEqual('invalid');
    });
    it('should show text of required when given an type of required', () => {
      wrapper = setup({ type: 'required' });
      expect(wrapper.text()).toEqual('required');
    });
  });
  describe('ui tests', () => {
    const setup = props => shallow(<StyledFlag type="valid" {...props} />);
    it('should add styles to the component', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
