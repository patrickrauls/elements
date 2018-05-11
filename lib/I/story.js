import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import I from './index';
// import withTheme from '../../../stories/withTheme';

storiesOf('I', module)
  // .addDecorator(withTheme);
  .addDecorator(withKnobs)
  .add('icon', () => (
    <I
      icon={select('icon', ['user', 'lock', 'globe'], 'user')}
    />
  ));