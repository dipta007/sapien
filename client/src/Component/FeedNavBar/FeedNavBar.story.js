import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import FeedNavBar from './FeedNavBar';

storiesOf('FeedNavBar', module)
  .addDecorator(StoryRouter())
  .add('sort by most voted', () => <FeedNavBar sortOrder="Most Voted" />)
  .add('sort by Created By', () => <FeedNavBar sortOrder="Created by" />);
