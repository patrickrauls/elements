import React from 'react';

import Form from './Form';

describe('Form', () => {
  const onSubmitMock = jest.fn();
  const children = [
    <input
      key="foobar"
      name="foo"
      value="bar"
    />
  ];
  const setup = props => shallow(
    <Form
      children={children}
      onSubmit={onSubmitMock}
      {...props}
    />
  );
  describe('unit tests', () => {
    const elements = [
      {
        type: 'input',
        name: 'foo',
        value: 'foo',
        blur() { },
        focus() { },
        checkValidity() {
          return true;
        }
      }
    ]
    const event = {
      preventDefault: () => { },
      target: {
        elements
      }
    };
    let wrapper = setup({ children });
    it('should fire a given onSubmit function on submit', () => {
      wrapper.simulate('submit', event);
      expect(onSubmitMock).toHaveBeenCalled();
    });
    it('should provide a payload from its form controls to the onSubmit function', () => {
      wrapper.simulate('submit', event);
      expect(onSubmitMock).toHaveBeenCalledWith({ foo: 'foo' });
    });
    it('should render its children', () => {
      const children = [
        <input className="unique1" key="foo" name="foo" />,
        <input className="unique2" key="bar" name="bar" />
      ];
      wrapper = setup({ children });
      expect(wrapper.containsAllMatchingElements(children)).toBe(true);
    });
    it('should prevent submission with invalid form controls', () => {
      const invalidSubmitMock = jest.fn();
      wrapper = setup({ onSubmit: invalidSubmitMock });
      const invalidEvent = {
        ...event,
        target: {
          ...event.target,
          elements: [
            {
              ...elements[0],
              checkValidity() {
                return false;
              }
            }
          ]
        }
      };
      wrapper.simulate('submit', invalidEvent);
      expect(invalidSubmitMock).not.toHaveBeenCalled();
    });
  });
});
