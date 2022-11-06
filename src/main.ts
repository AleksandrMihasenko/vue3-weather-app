import { createApp } from 'vue';
import App from './App.vue';

// the fontawesome core, icon component
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// add icons
library.add(faUserSecret)

import './assets/tailwind.css';

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
