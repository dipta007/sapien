import React from 'react';

import { storiesOf } from '@storybook/react';

import { ApolloProvider } from 'react-apollo';
import Votebox from './Votebox';

import apolloClient from '../../Utilities/apolloClient';

storiesOf('Vote Box', module)
  .add('vote box row', () => (
    <ApolloProvider client={apolloClient}>
      <Votebox align="row" postId="1" />
    </ApolloProvider>
  ))
  .add('vote box col', () => (
    <ApolloProvider client={apolloClient}>
      <Votebox align="col" postId="1" />
    </ApolloProvider>
  ));
