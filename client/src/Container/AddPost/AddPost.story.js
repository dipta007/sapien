import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import { Provider } from 'react-redux';
import AddPost from './AddPost';

import store from '../../redux/store';

storiesOf('Add Post', module)
  .addDecorator(StoryRouter())
  .add('Add post', () => (
    <Provider store={store}>
      <AddPost />
    </Provider>
  ));
