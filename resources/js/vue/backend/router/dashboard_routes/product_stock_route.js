import Layout from '../../views/product_stock/Layout'
import AllProductStock from '../../views/product_stock/All'
import CreateProductStock from '../../views/product_stock/Create'
import EditProductStock from '../../views/product_stock/Edit'
import DetailsProductStock from '../../views/product_stock/Details'
import ImportProductStock from '../../views/product_stock/Import'

export default {
    path: 'product_stock',
    component: Layout,
    props: {
        role_permissions: ['super_admin','admin'],
        layout_title: 'product_stock Management',
    },
    children: [{
            path: '',
            name: 'AllProductStock',
            component: AllProductStock,
        },
        {
            path: 'import',
            name: 'ImportProductStock',
            component: ImportProductStock,
        },
        {
            path: 'create',
            name: 'CreateProductStock',
            component: CreateProductStock,
        },
        {
            path: 'edit/:id',
            name: 'EditProductStock',
            component: EditProductStock,
        },
        {
            path: 'details/:id',
            name: 'DetailsProductStock',
            component: DetailsProductStock,
        },
    ],

};