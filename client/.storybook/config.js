import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';

const req = require.context('../', true, /story\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
