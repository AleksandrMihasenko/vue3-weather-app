import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

// the fontawesome core, icon component
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faSun, faCircleInfo, faPlus } from '@fortawesome/free-solid-svg-icons'

import './assets/tailwind.css';

// add icons
library.add(faUserSecret, faSun, faCircleInfo, faPlus);

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
