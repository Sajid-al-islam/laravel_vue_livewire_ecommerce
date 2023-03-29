import Layout from '../../views/category/Layout'
import AllCategory from '../../views/category/All'
import CreateCategory from '../../views/category/Create'
import EditCategory from '../../views/category/Edit'
import DetailsCategory from '../../views/category/Details'
import ImportCategory from '../../views/category/Import'

export default {
    path: 'category',
    component: Layout,
    props: {
        role_permissions: ['super_admin','admin'],
        layout_title: 'Category Management',
    },
    children: [{
            path: '',
            name: 'AllCategory',
            component: AllCategory,
        },
        {
            path: 'import',
            name: 'ImportCategory',
            component: ImportCategory,
        },
        {
            path: 'create',
            name: 'CreateCategory',
            component: CreateCategory,
        },
        {
            path: 'edit/:id',
            name: 'EditCategory',
            component: EditCategory,
        },
        {
            path: 'details/:id',
            name: 'DetailsCategory',
            component: DetailsCategory,
        },
    ],

};