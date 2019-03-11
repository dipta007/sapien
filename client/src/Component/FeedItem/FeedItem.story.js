import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { ApolloProvider } from 'react-apollo';
import FeedItem from './FeedItem';
import apolloClient from '../../Utilities/apolloClient';

storiesOf('NewsFeed Post', module)
  .addDecorator(StoryRouter())
  .add('post', () => {
    const payload = {
      id: '1',
      title: 'test title',
      description: 'lorem ipsum',
      author: {
        userthumbnail:
          'https://avatars0.githubusercontent.com/u/13894030?s=400&v=4',
        username: 'dipta007'
      },
      createdat: 1551890000000,
      upvotes: 10,
      downvotes: 20,
      media: {
        mediacover:
          'https://cdn.pixabay.com/photo/2017/12/29/18/47/nature-3048299__340.jpg',
        mediathumbnail:
          'https://cdn.pixabay.com/photo/2017/12/29/18/47/nature-3048299__340.jpg'
      }
    };

    return (
      <ApolloProvider client={apolloClient}>
        <FeedItem payload={payload} />
      </ApolloProvider>
    );
  });
