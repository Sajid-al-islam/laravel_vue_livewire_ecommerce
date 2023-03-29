import settingLayout from '../../views/settings/Layout'
import settingProfile from '../../views/settings/Profile'
import settingPassword from '../../views/settings/Password'

export default {
    path: 'setting',
    component: settingLayout,
    children: [{
            path: '',
            name: 'settingProfile',
            component: settingProfile,
        },
        {
            path: 'password',
            name: 'settingPassword',
            component: settingPassword,
        },
        // {
        //     path: 'details/:id',
        //     name: 'chapterDetails',
        //     component: chapterDetails,
        // },
    ],
};
