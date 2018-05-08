import React from 'react';
import { mount, shallow } from 'enzyme';

import Input from './Input';
import { FAILED_VALIDATION, emails } from '../utils/constants';

describe('Input', () => {
  const setup = props => shallow(<Input {...props} />);
  describe('unit tests', () => {
    let wrapper = setup();
    it('should render without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });
    it('should make the defaultValue the initial value', () => {
      wrapper = setup({ defaultValue: 'Zebra' });
      expect(wrapper.find('input').prop('value')).toEqual('Zebra');
    });
    it('should set a class of disabled if given a disabled prop', () => {
      wrapper = setup({ disabled: true });
      expect(wrapper.hasClass('disabled')).toBe(true);
    });
    it('should fire a given onBlur function', () => {
      const onBlur = jest.fn();
      wrapper = setup({ onBlur });
      wrapper.find('input').simulate('blur');
      expect(onBlur).toHaveBeenCalled();
    });
    it('should fire a given onFocus function', () => {
      const onFocus = jest.fn();
      wrapper = setup({ onFocus });
      wrapper.find('input').simulate('focus');
      expect(onFocus).toHaveBeenCalled();
    });
    it('should focus on <input /> when container is clicked', () => {
      const focus = jest.fn();
      const currentTarget = {
        children: [
          {
            tagName: 'INPUT',
            focus
          }
        ]
      };
      wrapper = setup();
      wrapper.simulate('click', { currentTarget });
      expect(focus).toHaveBeenCalled();
    });
    it('should display each requirement description on focus', () => {
      const description = 'must be Jamaica';
      const validate = value => value === 'Jamaica';
      const requirements = [{ description, validate }];
      wrapper = setup({ requirements });
      wrapper.find('input').simulate('focus');
      expect(wrapper.find('.input-requirement').text()).toEqual(description);
    });
    it('should hide each requirement description on blur', () => {
      wrapper.find('input').simulate('blur');
      expect(wrapper.find('.input-requirement').length).toEqual(0);
    });
    it('should indicate when a requirement has been met on change', () => {
      const description = 'must be Jamaica';
      const validate = value => value === 'Jamaica';
      const requirements = [{ description, validate }];
      wrapper = mount(<Input requirements={requirements} />);
      wrapper.find('input').simulate('focus');
      wrapper.find('input').simulate('change', {
        target: {
          value: 'Jamaica',
          setCustomValidity() { },
          checkValidity() { }
        }
      });
      expect(wrapper.find('.input-requirement')
        .find('.valid-requirement').length).toEqual(1);
    });
  });
  describe('interaction tests', () => {
    let wrapper;
    const setCustomValidity = jest.fn();
    const checkValidity = jest.fn();
    const target = {
      value: 'Tiger',
      setCustomValidity,
      checkValidity
    };
    it('should fire a given onChange function', () => {
      const onChange = jest.fn();
      wrapper = setup({ onChange });
      wrapper.find('input').simulate('change', { target });
      expect(onChange).toHaveBeenCalled();
    });
    it('should sync value on change', () => {
      wrapper = setup({ defaultValue: 'Zebra' });
      wrapper.find('input').simulate('change', { target });
      expect(wrapper.find('input').prop('value')).toEqual('Tiger');
    });
    it('should fire validations from requirements prop on change', () => {
      const validate = jest.fn();
      const anotherValidate = jest.fn();
      wrapper = setup({
        requirements: [{
          description: 'mock requirement',
          validate
        }, {
          description: 'another mock requirement',
          validate: anotherValidate
        }]
      });
      wrapper.find('input').simulate('change', { target });
      expect(validate).toHaveBeenCalledWith(target.value);
      expect(anotherValidate).toHaveBeenCalledWith(target.value);
    });
    it('should set itself as invalid on change for unmet validations', () => {
      const validate = value => false;
      wrapper = setup({
        requirements: [{
          description: 'mock requirement',
          validate
        }]
      });
      wrapper.find('input').simulate('change', { target });
      expect(setCustomValidity).toHaveBeenCalledWith(FAILED_VALIDATION);
    });
    it('unsets itself as invalid on change when validations are met', () => {
      const validate = value => true;
      wrapper = setup({
        requirements: [{
          description: 'mock requirement',
          validate
        }]
      });
      wrapper.find('input').simulate('change', { target });
      expect(setCustomValidity).toHaveBeenCalledWith('');
    });
  });
  describe('UI tests', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should re-validate any time the validateOn prop changes', () => {
      const validate = jest.fn();
      const props = {
        validateOn: 'Foo',
        defaultValue: 'Zoo',
        requirements: [{
          description: 'mock validation',
          validate
        }]
      };
      wrapper = mount(<Input {...props} />);
      wrapper.setProps({ validateOn: 'Bar' });
      expect(validate).toHaveBeenCalledWith('Zoo');
    });
    it('should not validate without a change in value or validateOn', () => {
      const validate = jest.fn();
      const props = {
        validateOn: 'Foo',
        defaultValue: 'Zoo',
        requirements: [{
          description: 'mock validation',
          validate
        }]
      };
      wrapper = mount(<Input {...props} />);
      wrapper.setProps({ validateOn: 'Foo' });
      expect(validate).not.toHaveBeenCalled();
    });
    it('should provide a prop type=valid to a Flag if valid', () => {
      wrapper = mount(<Input />);
      wrapper.find('input').simulate('change');
      expect(wrapper.find('Flag').prop('type')).toEqual('valid');
    });
    it('should provide a prop type=invalid to a Flag if invalid', () => {
      wrapper = mount(
        <Input
          requirements={[{
            description: 'fails to validate',
            validate: value => false
          }]}
        />
      );
      wrapper.find('input').simulate('change');
      expect(wrapper.find('Flag').prop('type')).toEqual('invalid');
    });
    it('should provide a prop type=required to a Flag if required', () => {
      wrapper = mount(<Input required />);
      wrapper.find('input').simulate('change');
      expect(wrapper.find('Flag').prop('type')).toEqual('required');
    });
  });
  describe('email input validation tests', () => {
    describe('valid emails', () => {
      const wrapper = mount(<Input type="email" />);
      afterAll(() => {
        wrapper.unmount();
      });
      const input = wrapper.find('input');
      const changeTo = (value) => {
        input.instance().value = value;
        input.simulate('change');
      };
      emails.valid.forEach(email => {
        it(email.description, () => {
          changeTo(email.value);
          expect(wrapper.find('Flag').prop('type')).toEqual('valid');
        });
      });
    });
    describe('invalid emails', () => {
      const wrapper = mount(<Input type="email" />);
      afterAll(() => {
        wrapper.unmount();
      });
      const input = wrapper.find('input');
      const changeTo = (value) => {
        input.instance().value = value;
        input.simulate('change');
      };
      emails.invalid.forEach(email => {
        it(email.description, () => {
          changeTo(email.value);
          expect(wrapper.find('Flag').prop('type')).toEqual('invalid');
        });
      });
    })
  });
});
/*
*/
