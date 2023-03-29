import Layout from '../../views/customer/Layout'
import AllCustomer from '../../views/customer/All'
import CreateCustomer from '../../views/customer/Create'
import EditCustomer from '../../views/customer/Edit'
import DetailsCustomer from '../../views/customer/Details'
import ImportCustomer from '../../views/customer/Import'

export default {
    path: 'customer',
    component: Layout,
    props: {
        role_permissions: ['super_admin','admin'],
        layout_title: 'Customer Management',
    },
    children: [{
            path: '',
            name: 'AllCustomer',
            component: AllCustomer,
        },
        {
            path: 'import',
            name: 'ImportCustomer',
            component: ImportCustomer,
        },
        {
            path: 'create',
            name: 'CreateCustomer',
            component: CreateCustomer,
        },
        {
            path: 'edit/:id',
            name: 'EditCustomer',
            component: EditCustomer,
        },
        {
            path: 'details/:id',
            name: 'DetailsCustomer',
            component: DetailsCustomer,
        },
    ],

};