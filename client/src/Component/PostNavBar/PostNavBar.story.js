import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import PostNavBar from './PostNavBar';

storiesOf('PostNavBar', module)
  .addDecorator(StoryRouter())
  .add('Post Nav Bar', () => <PostNavBar />);
