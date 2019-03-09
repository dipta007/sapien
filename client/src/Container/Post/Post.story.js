import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import Post from './Post';

storiesOf('Post', module)
  .addDecorator(StoryRouter())
  .add('post', () => <Post />);
