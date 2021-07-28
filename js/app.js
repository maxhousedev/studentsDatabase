'use strict';

import { createApp } from './studentsDatabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const MOUNT = document.getElementById('root');
  createApp(MOUNT);
});
