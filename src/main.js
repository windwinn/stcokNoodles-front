import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue3-cookies';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLoading from 'vue-loading-overlay';
import PrimeVue from 'primevue/config';

// Theme
// import Noir from './presents/Noir.js';
// // Icons
// import "primeicons/primeicons.css";
// // PrimeFlex
// // import '/node_modules/primeflex/primeflex.css';
// import 'primeflex/primeflex.css';

import 'primevue/resources/themes/saga-blue/theme.css'; // ✅ ธีม
import 'primevue/resources/primevue.min.css';           // ✅ Core
import 'primeicons/primeicons.css';         

// fortawesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// PrimeVue Components
import PanelMenu from 'primevue/panelmenu';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DataView from 'primevue/dataview';
import Tag from 'primevue/tag';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Avatar from 'primevue/avatar';
import Carousel from 'primevue/carousel';
import Galleria from 'primevue/galleria';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import RadioButton from 'primevue/radiobutton';

// SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

window.App = app;

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(VueCookies, {
    expireTimes: 0,
    domain: './',
    path: './'
});
app.use(VueAxios, axios);
app.use(VueSweetalert2);

// Register Global Components
app.component('PanelMenu', PanelMenu);
app.component('Menubar', Menubar);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('DataView', DataView);
app.component('Tag', Tag);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Avatar', Avatar);
app.component('Carousel', Carousel);
app.component('Galleria', Galleria);
app.component('InputNumber', InputNumber);
app.component('Textarea', Textarea);
app.component('Dropdown', Dropdown);
app.component('Dialog', Dialog);
app.component('RadioButton', RadioButton);

app.component('VueLoading', VueLoading);

app.mount('#app');
