import React from 'react';

import { storiesOf } from '@storybook/react';

import Votebox from './Votebox';

storiesOf('Vote Box', module)
  .add('vote box row', () => <Votebox align="row" postId="1" />)
  .add('vote box col', () => <Votebox align="col" postId="1" />);
