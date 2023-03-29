import StoreModule from "./schema/StoreModule";

let test_module = new StoreModule('order','order','Order');
const {store_prefix, api_prefix, route_prefix} = test_module;

// state list
const state = {
    ...test_module.states(),

};

// get state
const getters = {
    ...test_module.getters(),
};

// actions

const actions = {
    ...test_module.actions(),

    [`fetch_${store_prefix}`]: async function ({ state, commit }, { id }) {
        let url = `/${api_prefix}/${id}`;
        await axios.get(url).then((res) => {
            this.commit(`set_${store_prefix}`, res.data);

            var img_string="";
            if(res.data.related_images) {
                for (let index = 0; index < res.data.related_images.length; index++) {
                    let el = res.data.related_images[index];
                    img_string +=`<img src="/${el.image}"/>`
                }
                setTimeout(() => {
                    
                    document.querySelector('.file_preview')&&
                    (document.querySelector('.file_preview').innerHTML = img_string)
                }, 1000);
            }
            
        });
    },

    [`store_${store_prefix}`]: function({state, getters, commit}){
        const {form_values, form_inputs, form_data} = window.get_form_data(`.create_form`);
        // console.log(form_data, form_inputs, form_values);
        const {get_category_selected: category} = getters;

        category.forEach((i)=> {
            form_data.append('selected_categories[]',i.id);
        });
        // console.log(form_data);
        axios.post(`/${api_prefix}/store`,form_data)
            .then(res=>{
                window.s_alert(`new ${store_prefix} has been created`);
                $(`${store_prefix}_create_form input`).val('');
                commit(`set_clear_selected_${store_prefix}s`,false);
                management_router.push({name:`All${route_prefix}`})
            })
            .catch(error=>{

            })
    },


    [`update_${store_prefix}`]: function ({ state, getters, commit }, event) {
        const {form_values, form_inputs, form_data} = window.get_form_data(`.update_form`);
        const {get_category_selected: category} = getters;

        category.forEach((i)=> {
            form_data.append('selected_categories[]',i.id);
        });
        form_data.append("id", state[store_prefix].id);
        axios.post(`/${api_prefix}/update`, form_data).then((res) => {
            /** reset loaded user_role after data update */
            // this.commit(`set_${store_prefix}`, null);
            window.s_alert("data updated");
        });
    },

    [`set_${store_prefix}_status_update`]: function ({ state, getters, commit }, event) {
        const {form_values, form_inputs, form_data} = window.get_form_data(`.status_change_form`);
        
        form_data.append("id", state[store_prefix].id);

        axios.post(`/${api_prefix}/status_update`, form_data).then((res) => {
            console.log("login store data", state[store_prefix].id);
            let order_id = state[store_prefix].id;
            this.dispatch(`fetch_${store_prefix}`, { id: order_id });
            window.s_alert("data updated");
        });
    },

    [`print_${store_prefix}_details`]: function ({ state, getters, commit }, event) {
        window.print();
    },

    [`email_${store_prefix}_invoice`]: function ({ state, getters, commit }, event) {
        
    },


}

// mutators
const mutations = {
    ...test_module.mutations(),

};


export default {
    state,
    getters,
    actions,
    mutations,
};
