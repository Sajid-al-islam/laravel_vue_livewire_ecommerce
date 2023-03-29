require('./plugins/axios_setup');
require('./plugins/moment_setup');
require('./plugins/preview_image');
require('./plugins/auto_logout');
require('./plugins/preloader');
require('./plugins/csv_to_array');
require('./plugins/demo_data_load');
require('./plugins/get_selector_form_data');
require('./plugins/set_selector_form_data');
require('./plugins/ck_editor_config');

window.debounce = require('debounce');
window.CsvBuilder = require('filefy').CsvBuilder;

/*********************
   dashboard vue setup
**********************/

import Vue from 'vue'
import router from './router/router';
import store from './store/index';

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('input-field', require('./views/components/InputField.vue').default);
Vue.component('user-management-modal', require('./views/users/components/UserManagementModal.vue').default);
Vue.component('ex-app', require('./App.vue').default);

if (document.getElementById('app')) {
    new Vue({
        store,
        router,
        el: '#app',
        created: function () {
            console.log('dashboard started');
        },
    })
}
