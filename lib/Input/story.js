import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import Input from './index';
// import withTheme from '../../../stories/withTheme';

storiesOf('Input', module)
  // .addDecorator(withTheme);
  .addDecorator(withKnobs)
  .add('input', () => (
    <Input
      name="username"
      placeholder="username"
      icon={select('icon', ['lock', 'user', 'clock', 'map', ''], 'user')}
      type={select('type', ['text', 'email', 'number', 'password'])}
      disabled={boolean('disabled', false)}
      onChange={action('changed')}
      required={boolean('required', false)}
    />
  ));
