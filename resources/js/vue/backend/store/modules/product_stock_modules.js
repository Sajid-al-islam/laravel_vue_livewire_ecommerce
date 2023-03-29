import StoreModule from "./schema/StoreModule";

let test_module = new StoreModule('product_stock','product_stock','ProductStock');
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
            console.log(res.data);
            commit(`set_selected_products`, res.data.product);
            commit(`set_selected_suppliers`, res.data.supplier);
        });
    },
    [`store_${store_prefix}`]: function({state, getters, commit}){
        const {form_values, form_inputs, form_data} = window.get_form_data(`.product_stock_create_form`);
        console.log(form_data, form_values);
        const {get_product_selected: product} = getters;
        const {get_supplier_selected: supplier} = getters;

        product.forEach((i)=> {
            form_data.append('selected_product[]',i.id);
        });
        supplier.forEach((i)=> {
            form_data.append('selected_supplier[]',i.id);
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
        const {form_values, form_inputs, form_data} = window.get_form_data(`.update_form_product_stock`);
        const {get_product_selected: product} = getters;
        const {get_supplier_selected: supplier} = getters;

        product.forEach((i)=> {
            form_data.append('selected_product[]',i.id);
        });

        supplier.forEach((i)=> {
            form_data.append('selected_supplier[]',i.id);
        });
        form_data.append("id", state[store_prefix].id);
        axios.post(`/${api_prefix}/update`, form_data).then((res) => {
            /** reset loaded user_role after data update */
            // this.commit(`set_${store_prefix}`, null);
            
            if(res.status == 400 && res.data.err_type == 'quantity_invalid') {
                window.s_alert(res.data.err_message,"error");
                console.log('from module');
            }
            window.s_alert("data updated");
        });
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
