import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import FeedItem from './FeedItem';

storiesOf('NewsFeed Post', module)
  .addDecorator(StoryRouter())
  .add('post', () => {
    const payload = {
      id: '1',
      title: 'test title',
      description: 'lorem ipsum',
      author: {
        thumbnail:
          'https://avatars0.githubusercontent.com/u/13894030?s=400&v=4',
        username: 'dipta007'
      },
      createdat: 1551890000000,
      upvotes: 10,
      downvotes: 20,
      media: {
        cover:
          'https://cdn.pixabay.com/photo/2017/12/29/18/47/nature-3048299__340.jpg',
        thumbnail:
          'https://cdn.pixabay.com/photo/2017/12/29/18/47/nature-3048299__340.jpg'
      }
    };

    return <FeedItem payload={payload} />;
  });
