import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import StyledButton from './index';
import styles from './styles';
import { icons } from '../utils/styling';

describe('Button', () => {
  const setup = props => shallow(<Button {...props} />);
  describe('unit tests', () => {
    const onClickMock = jest.fn();
    const wrapper = setup({ onClick: onClickMock });
    it('renders without crashing', () => {
      expect(wrapper.length).toEqual(1);
    });
    it('executes a given onClick function on a click event', () => {
      wrapper.simulate('click');
      expect(onClickMock).toHaveBeenCalled();
    })
  });
  describe('styles', () => {
    it('should match the snapshot', () => {
      expect(styles).toMatchSnapshot();
    });
  });
  describe('styled button', () => {
    expect(StyledButton).toMatchSnapshot();
  })
  describe('props', () => {
    describe('icons', () => {
      let icon;
      let wrapper;
      it('should provide the icon prop as an <i /> if given a string', () => {
        icon = 'foo';
        wrapper = setup({ icon });
        expect(wrapper.find('i').hasClass(icon)).toBe(true);
      });
      it('should not hide icon if icon prop is a true boolean', () => {
        icon = true;
        wrapper = setup({ icon });
        expect(wrapper.find('.icon-container').hasClass('hidden')).toBe(false);
      });
      it('should show a ui icon if icon is a true boolean', () => {
        const props = { icon: true, ui: 'submit' };
        wrapper = setup(props);
        expect(wrapper.find('i').hasClass(icons[props.ui])).toBe(true);
      })
      it('should not show icon if icon prop is falsy', () => {
        icon = undefined;
        wrapper = setup({ icon });
        expect(wrapper.find('.icon-container').hasClass('hidden')).toBe(true);
      });
    });
    describe('loading', () => {
      let wrapper;
      it('should show loading mask when loading prop is true', () => {
        wrapper = setup({ loading: true });
        expect(wrapper.find('i').hasClass(icons.loading)).toBe(true);
      });
      it('should not show loading mask when loading prop is false', () => {
        wrapper = setup({ loading: false });
        expect(wrapper.find('i').hasClass(icons.loading)).toBe(false);
      });
    });
    describe('wide', () => {
      let wrapper;
      it('should add .full-width class when the wide prop is truthy', () => {
        wrapper = setup({ wide: true });
        expect(wrapper.hasClass('full-width')).toBe(true);
      });
      it('should display bigger loading mask when wide prop is truthy', () => {
        const props = { wide: true, loading: true };
        wrapper = setup(props);
        expect(wrapper.find('i').hasClass(icons.big)).toBe(true);
      });
    });
  });
});
