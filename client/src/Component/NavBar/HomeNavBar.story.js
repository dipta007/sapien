import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import HomeNavBar from './HomeNavbar';

storiesOf('HomeNavBar', module).add('Nav Bar', () => (
  <Provider store={store}>
    <HomeNavBar />
  </Provider>
));
