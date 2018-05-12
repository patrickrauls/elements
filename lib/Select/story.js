import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import Select from './index';

storiesOf('Select', module)
  // .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add('one child', () => (
    <Select
      disabled={boolean('disabled', false)}
      invalid={boolean('invalid', false)}
      name={select('name', ['default', 'timezone', 'timeslot'])}
      onChange={action('changed')}
    >
      <option>Hey</option>
    </Select>
  ))
  .add('with placeholder', () => (
    <Select
      disabled={boolean('disabled', false)}
      placeholder="none"
      invalid={boolean('invalid', false)}
      name={select('name', ['default', 'timezone', 'timeslot'])}
      onChange={action('changed')}
    >
      <option selected>select</option>
      <option>Hey</option>
    </Select>
  ));
