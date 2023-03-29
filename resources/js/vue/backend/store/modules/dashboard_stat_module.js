// state list
const state = {
    dashboard_stat: []
};

// get state
const getters = {
    get_dashboard_stat: state => state.dashboard_stat,
};

// actions

const actions = {
    fetch_dashboard_stats: async function (context) {
        await axios.get('/dashboard/dashboard_info').then((response) => {
            
            this.commit('set_dashboard_stat', response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    },
}

// mutators
const mutations = {
    set_dashboard_stat: function (state, data) {
        state.dashboard_stat = data;
    },
};


export default {
    state,
    getters,
    actions,
    mutations,
};
