import React from 'react';
import Select from './Select';
import StyledSelect from './index';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

describe('Select', () => {
  describe('unit tests', () => {
    const setup = (props, method = shallow) => method(<Select {...props} />);
    it('renders without crashing', () => {
      const wrapper = setup();
      expect(wrapper.exists()).toBe(true);
    });
    it('renders its children', () => {
      const children = [
        <option key="1" value="unique 1" />,
        <option key="2" value="unique-2" />
      ];
      const wrapper = setup({ children });
      expect(wrapper.containsAllMatchingElements(children)).toBe(true);
    });
    it('initially displays the placeholder', () => {
      const placeholder = 'Foo';
      const wrapper = setup({ placeholder });
      expect(wrapper.contains(placeholder)).toBe(true);
    });
    it('displays a given icon', () => {
      const icon = "globe";
      const wrapper = setup({ icon });
      expect(wrapper.find('.ellies-select-icon').shallow().prop('icon')).toEqual(icon);
    });
    it('displays a required Flag when dirty and required prop is true', () => {
      const wrapper = setup({ required: true }, mount);
      wrapper.find('select').simulate('focus');
      wrapper.find('select').simulate('blur');
      expect(wrapper.find('Flag').prop('type')).toEqual('required');
      wrapper.unmount();
    });
  });
  describe('interaction tests', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    const setup = (props, method = mount) => method(<Select {...props} />);
    it('fires a given onChange function on change', () => {
      const onChange = jest.fn()
      wrapper = setup({ onChange });
      wrapper.find('select').simulate('change');
      expect(onChange).toHaveBeenCalled();
    });
    it('fires a given onBlur function on blur', () => {
      const onBlur = jest.fn();
      wrapper = setup({ onBlur });
      wrapper.find('select').simulate('blur');
      expect(onBlur).toHaveBeenCalled();
    });
    it('fires a given onFocus function on focus', () => {
      const onFocus = jest.fn();
      wrapper = setup({ onFocus });
      wrapper.find('select').simulate('focus');
      expect(onFocus).toHaveBeenCalled();
    });
    it('puts focus on the select when the component is clicked', () => {
      const focus = jest.fn();
      const currentTarget = {
        children: [{
          tagName: 'SELECT',
          focus
        }]
      };
      wrapper = setup(null, shallow);
      wrapper.simulate('click', { currentTarget });
      expect(focus).toHaveBeenCalled();
    });
    it('syncs its value on change', () => {
      const value = 'abc123';
      const event = {
        target: {
          value,
          checkValidity() {}
        }
      };
      wrapper = setup(null, shallow);
      wrapper.find('select').simulate('change', event);
      expect(wrapper.find('select').prop('value')).toEqual(value);
    });
  });
  describe('ui tests', () => {
    const setup = (props, method = shallow) => method(<StyledSelect {...props} />);
    it('adds styles to the Select', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
    it('puts opacity to 0.4 when disabled', () => {
      const wrapper = setup({ disabled: true });
      expect(toJson(wrapper)).toHaveStyleRule('opacity', '0.4');
    });
  });
});
