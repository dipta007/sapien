import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';

import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import Post from './Post';
import apolloClient from '../../Utilities/apolloClient';
import store from '../../redux/store';

storiesOf('Post', module)
  .addDecorator(StoryRouter())
  .add('post', () => (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Post />
      </Provider>
    </ApolloProvider>
  ));
