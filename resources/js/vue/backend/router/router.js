import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../views/Layout'
import Dashboard from '../views/Dashboard'
import Login from '../views/auth/Login'

import user_route from './dashboard_routes/user_route'
import setting_route from './dashboard_routes/setting_route'
import user_role_route from './dashboard_routes/user_role_route'
import contact_meesage_route from './dashboard_routes/contact_meesage_route'
import product_route from './dashboard_routes/product_route'
import category_route from './dashboard_routes/category_route'
import brand_route from './dashboard_routes/brand_route'
import customer_route from './dashboard_routes/customer_route'
import order_route from './dashboard_routes/order_route'
import supplier_route from './dashboard_routes/supplier_route'
import product_stock_route from './dashboard_routes/product_stock_route'

Vue.use(VueRouter);
window.Fire = new Vue();

const routes = [{
        path: '/',
        component: Layout,
        children: [{
                path: '',
                name: 'Dashboard',
                component: Dashboard,
            },
            setting_route,
            user_route,
            user_role_route,
            contact_meesage_route,
            product_route,
            category_route,
            brand_route,
            order_route,
            customer_route,
            supplier_route,
            product_stock_route
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const management_router = new VueRouter({
    routes,
    mode: 'hash',
    linkExactActiveClass: 'active',
    // scrollBehavior: function(to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // }
});

window.management_router = management_router;

management_router.beforeEach((to, from, next) => {
    let isAuthenticated = window.localStorage?.token?.length ? true : false;
    if (isAuthenticated) {
        window.axios.defaults.headers.common["Authorization"] = `Bearer ${window.localStorage?.token}`;
        next();
    } else {
        delete window.axios.defaults.headers.common["Authorization"];
        window.location.href = '/login'
        return 0;
    }

    // next()
})

export default management_router
