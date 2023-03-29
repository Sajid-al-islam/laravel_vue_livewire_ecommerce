import Layout from '../../views/supplier/Layout'
import AllSupplier from '../../views/supplier/All'
import CreateSupplier from '../../views/supplier/Create'
import EditSupplier from '../../views/supplier/Edit'
import DetailsSupplier from '../../views/supplier/Details'
import ImportSupplier from '../../views/supplier/Import'

export default {
    path: 'supplier',
    component: Layout,
    props: {
        role_permissions: ['super_admin','admin'],
        layout_title: 'Supplier Management',
    },
    children: [{
            path: '',
            name: 'AllSupplier',
            component: AllSupplier,
        },
        {
            path: 'import',
            name: 'ImportSupplier',
            component: ImportSupplier,
        },
        {
            path: 'create',
            name: 'CreateSupplier',
            component: CreateSupplier,
        },
        {
            path: 'edit/:id',
            name: 'EditSupplier',
            component: EditSupplier,
        },
        {
            path: 'details/:id',
            name: 'DetailsSupplier',
            component: DetailsSupplier,
        },
    ],

};