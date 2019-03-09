import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import AddPost from './AddPost';

storiesOf('Add Post', module)
  .addDecorator(StoryRouter())
  .add('Add post', () => <AddPost />);
