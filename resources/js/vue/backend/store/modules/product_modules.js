import StoreModule from "./schema/StoreModule";

let test_module = new StoreModule('product','product','Product');
const {store_prefix, api_prefix, route_prefix} = test_module;

// state list
const state = {
    ...test_module.states(),
    [`${store_prefix}_specification`]: null,
    [`${store_prefix}_description`]: null,
};

// get state
const getters = {
    ...test_module.getters(),
    [`get_${store_prefix}_specification`]: (state)=> state[`${store_prefix}_specification`],
    [`get_${store_prefix}_description`]: (state)=> state[`${store_prefix}_description`],
};

// actions

const actions = {
    ...test_module.actions(),

    [`fetch_${store_prefix}`]: async function ({ state, commit }, { id }) {
        let url = `/${api_prefix}/${id}`;
        await axios.get(url).then((res) => {
            this.commit(`set_${store_prefix}`, res.data);

            var img_string="";
            for (let index = 0; index < res.data.related_images.length; index++) {
                let el = res.data.related_images[index];
                img_string +=`<img src="/${el.image}"/>`
            }
            setTimeout(() => {
                document.querySelector('.file_preview')&&
                (document.querySelector('.file_preview').innerHTML = img_string)
            }, 1000);

            res.data.categories?.forEach((i) => {
                commit(`set_selected_categorys`, i);
            })
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
        form_data.append("specification", state[`${store_prefix}_specification`]);
        form_data.append("description", state[`${store_prefix}_description`]);
        axios.post(`/${api_prefix}/store`,form_data)
            .then(res=>{
                window.s_alert(`new ${store_prefix} has been created`);
                $(`${store_prefix}_create_form input`).val('');
                commit(`set_clear_selected_products`,false);
                commit(`set_clear_selected_suppliers`,false);
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
        form_data.append("specification", state[`${store_prefix}_specification`]);
        form_data.append("description", state[`${store_prefix}_description`]);

        axios.post(`/${api_prefix}/update`, form_data).then((res) => {
            /** reset loaded user_role after data update */
            // this.commit(`set_${store_prefix}`, null);
            window.s_alert("data updated");
        });
    },
}

// mutators
// console.log(test_module.mutations());
const mutations = {
    ...test_module.mutations(),
    [`set_${store_prefix}_specification`]: function(state, data){
        state[`${store_prefix}_specification`] = data;
    },
    [`set_${store_prefix}_description`]: function(state, data){
        state[`${store_prefix}_description`] = data;
    },
};


export default {
    state,
    getters,
    actions,
    mutations,
};
