import Layout from '../../views/Brand/Layout'
import AllBrand from '../../views/Brand/All'
import CreateBrand from '../../views/Brand/Create'
import EditBrand from '../../views/Brand/Edit'
import DetailsBrand from '../../views/Brand/Details'
import ImportBrand from '../../views/category/Import'

export default {
    path: 'brand',
    component: Layout,
    props: {
        role_permissions: ['super_admin','admin'],
        layout_title: 'Brand Management',
    },
    children: [{
            path: '',
            name: 'AllBrand',
            component: AllBrand,
        },
        {
            path: 'import',
            name: 'ImportBrand',
            component: ImportBrand,
        },
        {
            path: 'create',
            name: 'CreateBrand',
            component: CreateBrand,
        },
        {
            path: 'edit/:id',
            name: 'EditBrand',
            component: EditBrand,
        },
        {
            path: 'details/:id',
            name: 'DetailsBrand',
            component: DetailsBrand,
        },
    ],

};