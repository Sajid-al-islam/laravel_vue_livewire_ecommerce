import StoreModule from "./schema/StoreModule";

let test_module = new StoreModule('customer','customer','Customer');
const {store_prefix, api_prefix, route_prefix} = test_module;

// state list
const state = {
    ...test_module.states(),
    phone_no: [
        {
            phone_no: ''
        }
    ]
};

// get state
const getters = {
    ...test_module.getters(),
    get_customer_phone_no: state => state.phone_no,
};

// actions
const actions = {
    ...test_module.actions(),
    add_customer_phone_no: function (context, phone_no) {
        context.state.phone_no.push({
            phone_no: "",
        });
    },
    remove_customer_phone_no: function(context, index) {
        context.state.phone_no.splice(index, 1)
    },

    [`fetch_${store_prefix}`]: async function ({ state }, { id }) {
        let url = `/${api_prefix}/${id}`;
        await axios.get(url).then((res) => {
            state.phone_no = res.data.phone_numbers;
            this.commit(`set_${store_prefix}`, res.data);
        });
    },

    [`store_${store_prefix}`]: function({state, getters, commit}){
        const {form_values, form_inputs, form_data} = window.get_form_data(`.create_form`);
        // console.log(form_data, form_inputs, form_values);
        
        form_data.append('mobile_numbers', JSON.stringify(state.phone_no));
       
        // console.log(form_data);
        axios.post(`/${api_prefix}/store`,form_data)
            .then(res=>{
                window.s_alert(`new ${store_prefix} has been created`);
                $(`${store_prefix}_create_form input`).val('');
                commit(`set_clear_selected_${store_prefix}s`,false);
                management_router.push({name:`All${route_prefix}`})
                commit(`set_phone_no`, []);
            })
            .catch(error=>{

            })
    },

    [`update_${store_prefix}`]: function ({ state }, event) {
        const {form_values, form_inputs, form_data} = window.get_form_data(`.update_form`);
        form_data.append("id", state[store_prefix].id);
        form_data.append('mobile_numbers', JSON.stringify(state.phone_no));
        axios.post(`/${api_prefix}/update`, form_data).then((res) => {
            /** reset loaded user_role after data update */
            // this.commit(`set_${store_prefix}`, null);
            window.s_alert("data updated");
        });
    },
}

// mutators
const mutations = {
    ...test_module.mutations(),
    [`set_phone_no`]: function (state, data) {
        state.phone_no = data;
    },
};


export default {
    state,
    getters,
    actions,
    mutations,
};
