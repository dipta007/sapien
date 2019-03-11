import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import { ApolloProvider } from 'react-apollo';
import Feed from './Feed';

import apolloClient from '../../Utilities/apolloClient';

storiesOf('Main Feed', module)
  .addDecorator(StoryRouter())
  .add('main news feed', () => (
    <ApolloProvider client={apolloClient}>
      <Feed />
    </ApolloProvider>
  ));
