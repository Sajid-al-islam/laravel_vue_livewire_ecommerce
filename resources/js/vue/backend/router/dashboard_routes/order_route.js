import Layout from '../../views/order/Layout'
import AllOrder from '../../views/order/All'
import EditOrder from '../../views/order/Edit'
import DetailsOrder from '../../views/order/Details'
import ImportOrder from '../../views/order/Import'
import EmailOrder from '../../views/order/Email'

export default {
    path: 'order',
    component: Layout,
    props: {
        role_permissions: ['super_admin','admin'],
        layout_title: 'Order Management',
    },
    children: [{
            path: '',
            name: 'AllOrder',
            component: AllOrder,
        },
        {
            path: 'import',
            name: 'ImportOrder',
            component: ImportOrder,
        },
        
        {
            path: 'edit/:id',
            name: 'EditOrder',
            component: EditOrder,
        },
        {
            path: 'details/:id',
            name: 'DetailsOrder',
            component: DetailsOrder,
        },
        {
            path: 'email_order_invoice/:id',
            name: 'EmailOrder',
            component: EmailOrder,
        },
    ],

};
