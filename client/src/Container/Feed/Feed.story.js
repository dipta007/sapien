import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import Feed from './Feed';

storiesOf('Main Feed', module)
  .addDecorator(StoryRouter())
  .add('main news feed', () => <Feed />);
