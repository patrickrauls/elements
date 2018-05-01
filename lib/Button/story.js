import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import Button from './index';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('lowercase', () => (
    <Button
      disabled={boolean('disabled', false)}
      icon={boolean('icon', false)}
      onClick={action('clicked')}
      ui={select('ui', ['submit', 'delete', 'edit', 'cancel'], 'submit')}
      wide={boolean('wide', true)}
    />
  ))
  .add('with caps', () => (
    <Button
      disabled={boolean('disabled', false)}
      icon={boolean('icon', false)}
      onClick={action('clicked')}
      text="SAVE"
      ui={select('ui', ['submit', 'delete', 'edit', 'cancel'], 'submit')}
      wide={boolean('wide', true)}
    />
  ));
