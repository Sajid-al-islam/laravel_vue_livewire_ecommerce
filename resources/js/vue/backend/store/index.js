import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import auth_modules from './modules/auth_modules';
import product_modules from './modules/product_modules';
import order_modules from './modules/order_modules';
import category_modules from './modules/category_modules';
import brand_modules from './modules/brand_modules';
import user_modules from './modules/user_modules';
import user_role_modules from './modules/user_role_modules';
import user_contact_message_modules from './modules/user_contact_message_modules';
import email_invoice_module from './modules/email_invoice_module';
import company_info_module from './modules/company_info_module';
import dashboard_stat_module from './modules/dashboard_stat_module';
import customer_modules from './modules/customer_modules';
import supplier_modules from './modules/supplier_modules';
import product_stock from './modules/product_stock_modules';

const store = new Vuex.Store({
    modules: {
        auth_modules,
        user_modules,
        user_role_modules,
        user_contact_message_modules,
        product_modules,
        order_modules,
        category_modules,
        brand_modules,
        email_invoice_module,
        company_info_module,
        dashboard_stat_module,
        customer_modules,
        supplier_modules,
        product_stock
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    // plugins: [createPersistedState()],
});

export default store;
