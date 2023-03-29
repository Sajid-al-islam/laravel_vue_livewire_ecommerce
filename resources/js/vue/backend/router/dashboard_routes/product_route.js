import Layout from '../../views/product/Layout'
import AllProduct from '../../views/product/All'
import CreateProduct from '../../views/product/Create'
import EditProduct from '../../views/product/Edit'
import DetailsProduct from '../../views/product/Details'
import ImportProduct from '../../views/product/Import'

export default {
    path: 'product',
    component: Layout,
    props: {
        role_permissions: ['super_admin','admin'],
        layout_title: 'Product Management',
    },
    children: [{
            path: '',
            name: 'AllProduct',
            component: AllProduct,
        },
        {
            path: 'import',
            name: 'ImportProduct',
            component: ImportProduct,
        },
        {
            path: 'create',
            name: 'CreateProduct',
            component: CreateProduct,
        },
        {
            path: 'edit/:id',
            name: 'EditProduct',
            component: EditProduct,
        },
        {
            path: 'details/:id',
            name: 'DetailsProduct',
            component: DetailsProduct,
        },
    ],

};
