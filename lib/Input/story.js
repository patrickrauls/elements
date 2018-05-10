import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import Input from './index';
// import withTheme from '../../../stories/withTheme';

storiesOf('Input', module)
  // .addDecorator(withTheme);
  .addDecorator(withKnobs)
  .add('Username', () => (
    <Input
      name="username"
      placeholder="username"
      type={select('type', ['text', 'email', 'number', 'password'])}
      disabled={boolean('disabled', false)}
      onChange={action('changed')}
      required={boolean('required', false)}
    />
  ))
  .add('Password', () => (
    <Input
      name="password"
      placeholder="password"
      type={select('type', ['text', 'email', 'number', 'password'])}
      disabled={boolean('disabled', false)}
      onChange={action('changed')}
      required={boolean('required', false)}
    />
  ));
