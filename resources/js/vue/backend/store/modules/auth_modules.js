import axios from 'axios';

// state list
const state = {
    auth_information: {},
    auth_tokens: null,
    check_auth: false,
    auth_roles: [],
    auth_permissions: [],
}

// get state
const getters = {
    get_auth_information: state => state.auth_information,
    get_auth_tokens: state => state.auth_tokens,
    get_check_auth: state => state.check_auth,
    get_auth_roles: state => state.auth_roles,
    get_auth_permissions: state => state.auth_permissions,
}

// actions
const actions = {
    fetch_check_auth: function (state) {
        axios.post('/user/check-auth')
            .then((res) => {
                $('#app_pre_loader').toggleClass('d-none');
                this.commit('set_check_auth', res.data.auth_status);
                this.commit('set_auth_information', res.data.auth_information);
                this.commit('set_auth_roles');
                this.commit('set_auth_permissions');
            })
            .catch((err)=>{
                this.commit('set_check_auth', false);
                window.localStorage.removeItem('token');
                console.log('user not authenticated');
                window.location.href = '/login';
            })
    },
    update_user_info: async function(state, data) {
        let res = await axios.post('/user/user_update', data.formData);

        return res
    },
    change_password: async function(state, formData) {
        let res = await axios.post('/user/update-profile', formData);


        return res
    },
    fetch_auth_information: function (state) {
        axios.post('/user/user_info')
            .then((res) => {
                // console.log(res.data);
                this.commit('set_auth_information', res.data);
            })
            .catch((err)=>{
                window.s_alert('error','something went wrong, reload window to fix it. '+(err.response?.data?.err_message || err.response?.data?.message));
            })
    },
    fetch_logout: function (state) {
        window.s_confirm('Logout')
            .then(res=>{
                res &&
                    axios.post('/user/api-logout')
                        .then((res) => {
                            window.localStorage.removeItem('token');
                            this.commit('set_auth_information', null);
                            this.commit('set_check_auth', false);
                            window.location.href = '/login'
                        })
                        .catch((err)=>{
                            window.s_alert('error','something went wrong, reload window to fix it. '+(err.response?.data?.err_message || err.response?.data?.message));
                        })
            })
    },
}

// mutators
const mutations = {
    set_auth_information: function (state, auth_information) {
        state.auth_information = auth_information;
    },
    set_auth_tokens: function (state, auth_tokens) {
        state.auth_tokens = auth_tokens;
    },
    set_check_auth: function (state, check_auth) {
        state.check_auth = check_auth;
    },
    set_auth_roles: function(state){
        state.auth_roles = state.auth_information.roles.map(item=>{
            return item.name;
        })
    },
    set_auth_permissions: function(state){
        state.auth_permissions = state.auth_information.permissions.map(item=>{
            return item.title;
        })
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
