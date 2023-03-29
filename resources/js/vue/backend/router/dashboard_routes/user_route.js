import userLayout from '../../views/users/Layout'
import AllUser from '../../views/users/AllUser'
import CreateUser from '../../views/users/CreateUser'
import EditUser from '../../views/users/EditUser'
import DetailsUser from '../../views/users/DetailsUser'
import ImportUser from '../../views/users/ImportUser'

export default {
    path: 'user',
    component: userLayout,
    props: {role_permissions: ['super_admin']},
    children: [{
            path: '',
            name: 'AllUser',
            component: AllUser,
        },
        {
            path: 'import',
            name: 'ImportUser',
            component: ImportUser,
        },
        {
            path: 'create',
            name: 'CreateUser',
            component: CreateUser,
        },
        {
            path: 'edit/:id',
            name: 'EditUser',
            component: EditUser,
        },
        {
            path: 'details/:id',
            name: 'DetailsUser',
            component: DetailsUser,
        },
    ],

};
