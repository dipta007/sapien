import React from 'react';

import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import ImageUpload from './ImageUpload';

storiesOf('Image Upload', module)
  .addDecorator(StoryRouter())
  .add('With Label', () => <ImageUpload label="Test Label" />)
  .add('WithOut Label', () => <ImageUpload />)
  .add('Required', () => (
    <ImageUpload required alertMessage="Its an alert message" submitted />
  ));
