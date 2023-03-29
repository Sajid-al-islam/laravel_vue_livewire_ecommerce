import axios from "axios";
import { debounce } from "debounce";
import management_router from "../../router/router";

// module perfixes
const store_prefix = `user_role`;
const api_prefix = `user-role`;

// state list
const state = {
    /* data store */
    [`${store_prefix}s`]: {}, // all data
    [`${store_prefix}`]: null, // selected data

    /* data filters */
    [`${store_prefix}_page`]: 1,
    [`${store_prefix}_paginate`]: 10,
    [`${store_prefix}_search_key`]: ``,
    [`orderByCol`]: "id",
    [`orderByAsc`]: true,
    [`${store_prefix}_show_active_data`]: 1, // show all active data

    /* selected data */
    [`${store_prefix}_selected`]: [], // selected data using checkbox
    [`${store_prefix}_show_selected`]: false, // will show selected data into offcanvas

    /* trigger showing data modal */
    [`${store_prefix}_show_management_modal`]: false,

    /* trigger showing data form canvas */
    [`${store_prefix}_show_create_canvas`]: false,
    [`${store_prefix}_show_edit_canvas`]: false,
};

// get state
const getters = {
    [`get_${store_prefix}s`]: (state) => state[`${store_prefix}s`],
    [`get_${store_prefix}`]: (state) => state[`${store_prefix}`],
    [`get_${store_prefix}_show_active_data`]: (state) => state[`${store_prefix}_show_active_data`],
    [`get_${store_prefix}_selected`]: (state) => state[`${store_prefix}_selected`],
    [`get_${store_prefix}_show_selected`]: (state) => state[`${store_prefix}_show_selected`],
    [`get_${store_prefix}_show_create_canvas`]: (state) => state[`${store_prefix}_show_create_canvas`],
    [`get_${store_prefix}_show_edit_canvas`]: (state) => state[`${store_prefix}_show_edit_canvas`],
    [`get_${store_prefix}_show_management_modal`]: (state) => state[`${store_prefix}_show_management_modal`],
};

// actions
const actions = {
    /** fetch all data using data filters */
    [`fetch_${store_prefix}s`]: async function ({ state }) {
        let url = `/${api_prefix}/all?page=${state[`${store_prefix}_page`]}&status=${state[`${store_prefix}_show_active_data`]}&paginate=${state[`${store_prefix}_paginate`]}`;
        url += `&orderBy=${state.orderByCol}`;
        if (state.orderByAsc) {
            url += `&orderByType=ASC`;
        } else {
            url += `&orderByType=DESC`;
        }
        if (state[`${store_prefix}_search_key`]) {
            url += `&search_key=${state[`${store_prefix}_search_key`]}`;
        }
        await axios.get(url).then((res) => {
            this.commit(`set_${store_prefix}s`, res.data);
        });
    },

    /** fetch single data */
    [`fetch_${store_prefix}`]: async function ({ state },{id}) {
        let url = `/${api_prefix}/${id}`;
        await axios.get(url).then((res) => {
            this.commit(`set_${store_prefix}`, res.data);
        });
    },

    /** store user role */
    [`store_${store_prefix}`]: function({state},event){
        let form_data = new FormData(event);
        axios.post(`/${api_prefix}/store`,form_data)
            .then(res=>{
                event.reset();
                window.s_alert('new role been created');
            });
    },

    /** update user role */
    [`update_${store_prefix}`]: function({state},event){
        let form_data = new FormData(event);
        form_data.append('id',state[store_prefix].id)
        axios.post(`/${api_prefix}/update`,form_data)
            .then(res=>{
                /** reset loaded user_role after data update */
                // this.commit(`set_${store_prefix}`, null);
                window.s_alert('role updated');
            });
    },

    /** store data canvas form */
    [`upload_${store_prefix}_create_canvas_input`]: function({state}){
        const {form_values, form_inputs, form_data} = window.get_form_data(`.${store_prefix}_canvas_create_form`);
        axios.post(`/${api_prefix}/canvas-store`,form_data)
            .then(res=>{
                window.s_alert('new role been created');
                this.commit(`set_${store_prefix}_show_create_canvas`,false);
                this.dispatch(`fetch_${store_prefix}s`);
            })
            .catch(error=>{
                let object = error.response?.data?.errors;
                /**
                 * 1. object to render as error
                 * 2. selector key for error redering
                 *      . by default name will find by script
                 *      . else you have to pass selector name
                 *      . here we are using data-name as input fields selector
                 */
                window.render_form_errors(object,'data-name');
            })
    },
    [`upload_${store_prefix}_edit_canvas_input`]: function({state}){
        const {form_values, form_inputs, form_data} = window.get_form_data(`.${store_prefix}_canvas_edit_form`);
        form_data.append('id',state[store_prefix].id)
        axios.post(`/${api_prefix}/canvas-update`,form_data)
            .then(res=>{
                window.s_alert('role updated');
                this.commit(`set_${store_prefix}_show_edit_canvas`,false);
                this.commit(`set_${store_prefix}`,null);
                this.dispatch(`fetch_${store_prefix}s`);
            })
            .catch(error=>{
                let object = error.response?.data?.errors;
                /**
                 * 1. object to render as error
                 * 2. selector key for error redering
                 *      . by default name will find by script
                 *      . else you have to pass selector name
                 *      . here we are using data-name as input fields selector
                 */
                window.render_form_errors(object,'data-name');
            })
    },

    /** Deactivate user, will be hidden from list */
    [`soft_delete_${store_prefix}`]: async function({state, getters, dispatch}, id){
        let cconfirm = await window.s_confirm("Deactive");
        if (cconfirm) {
            axios.post(`/${api_prefix}/soft-delete`,{id})
                .then(({data})=>{
                    dispatch(`fetch_${store_prefix}s`);
                    window.s_alert(`${store_prefix} has been deactivated`);
                })
        }
    },

    /** restore deactivated user */
    [`restore_${store_prefix}`]: async function({state, getters, dispatch}, id){
        let cconfirm = await window.s_confirm("restore");
        if (cconfirm) {
            axios.post(`/${api_prefix}/restore`,{id})
                .then(({data})=>{
                    dispatch(`fetch_${store_prefix}s`);
                    window.s_alert(`${store_prefix} has been restored`);
                })
        }
    },

    /** import bulk data */
    [`bulk_import_${store_prefix}`]: async function ({state}, data) {
        let cconfirm = await window.s_confirm("upload");
        if (cconfirm) {
            axios.post(`/${api_prefix}/bulk-import`,{data})
                .then(({data})=>{
                    window.s_alert(`data imported`);
                })
        }
    },

    /** export all data into csv */
    [`export_${store_prefix}_all`]: async function ({state}) {
        let col = Object.keys(state[`${store_prefix}s`].data[0]);
        var export_csv = new window.CsvBuilder(`${store_prefix}_list.csv`).setColumns(col);
        window.start_loader();
        let last_page = state[`${store_prefix}s`].last_page;
        for (let index = 1; index <= last_page; index++) {
            state.page = index;
            state.paginate = 10;
            await this.dispatch(`fetch_${store_prefix}s`);
            let values = state[`${store_prefix}s`].data.map((i) => Object.values(i));
            export_csv.addRows(values);

            let progress = Math.round(100*index/last_page);
            window.update_loader(progress);
        }
        await export_csv.exportFile();
        window.remove_loader();
    },

    /** export selected data into csv */
    [`export_selected_${store_prefix}_csv`]: function ({state}) {
        let col = Object.keys(state.selected[0]);
        let values = state.selected.map((i) => Object.values(i));
        new window.CsvBuilder(`${store_prefix}_list.csv`)
            .setColumns(col)
            // .addRow(["Eve", "Holt"])
            .addRows(values)
            .exportFile();
    },
};

// mutators
const mutations = {
    /**
    * set data array state
    * set single data
    * */
    [`set_${store_prefix}s`]: function (state, data) {
        state[`${store_prefix}s`] = data;
    },
    [`set_${store_prefix}`]: function (state, data) {
        state[`${store_prefix}`] = data;
    },

    /**
    * filter data object
    * 1. set per page paginate amount
    * 2. switch to targeted page
    * 3. set order by collumn name
    * 4. set searh key for data set
    * 5. set show data type active or deactive
    * */
    [`set_${store_prefix}_paginate`]: function (state, paginate) {
        state[`${store_prefix}_paginate`] = paginate;
        this.dispatch(`fetch_${store_prefix}s`);
    },
    [`set_${store_prefix}_page`]: function (state, page) {
        state[`${store_prefix}_page`] = page;
        this.dispatch(`fetch_${store_prefix}s`);
        $('table th input[type="checkbox"]').prop("checked", false);
    },
    [`set_${store_prefix}_orderByCol`]: function (state, orderByCol) {
        if (state.orderByCol != orderByCol) {
            state.orderByAsc = true;
        } else {
            state.orderByAsc = !state.orderByAsc;
        }
        state.orderByCol = orderByCol;
        state[`${store_prefix}_page`] = 1;
        this.dispatch(`fetch_${store_prefix}s`);
    },
    [`set_${store_prefix}_search_key`]: debounce(function (state, search_key) {
        state[`${store_prefix}_search_key`] = search_key;
        state[`${store_prefix}_page`] = 1;
        this.dispatch(`fetch_${store_prefix}s`);
    }, 500),
    [`set_${store_prefix}_show_active_data`]: function(state, status=1){
        state[`${store_prefix}_show_active_data`] = status;
        state[`${store_prefix}_page`] = 1;
        this.dispatch(`fetch_${store_prefix}s`);
    },

    /** set selected data array */
    [`set_selected_${store_prefix}s`]: function (state, data) {
        let temp_selected = state[`${store_prefix}_selected`];
        let check_index = temp_selected.findIndex((i) => i.id == data.id);
        if (check_index >= 0) {
            let el = document.querySelector(`input[data-id="${data.id}"]`)
            if(el)el.checked = false;
            el = document.querySelector(`input.check_all`)
            if(el)el.checked = false;
            temp_selected.splice(check_index, 1);
        } else {
            temp_selected.push(data);
        }
        state[`${store_prefix}_selected`] = temp_selected;
    },

    /** select all data */
    [`set_select_all_${store_prefix}s`]: function (state) {
        if (!event.target.checked) {
            return this.commit(`set_clear_selected_${store_prefix}s`);
        }

        let temp_selected = state[`${store_prefix}_selected`];
        let temp_data = state[`${store_prefix}s`];
        temp_data.data.forEach((user) => {
            let check_index = temp_selected.findIndex((i) => i.id == user.id);
            if (check_index >= 0) {
                temp_selected.splice(check_index, 1);
            }
            temp_selected.push(user);
        });
        state[`${store_prefix}_selected`] = temp_selected;
        $('table td input[type="checkbox"]').prop("checked", true);
    },

    /** clear all selected data */
    [`set_clear_selected_${store_prefix}s`]: async function (state, is_should_confirm = true) {
        let cconfirm = is_should_confirm ? await window.s_confirm("Remove all") : true;

        if (cconfirm) {
            state[`${store_prefix}_selected`] = [];
            $('table input[type="checkbox"]').prop("checked", false);
        }
    },

    /** remove single from selected data */
    [`set_clear_selected_single_${store_prefix}`]: async function (state, index) {
        // let cconfirm = await window.s_confirm();
        // if (cconfirm) {
        // }
        let temp_selected = state[`${store_prefix}_selected`];
        $(`table td input[data-id="${temp_selected[index].id}"]`).prop(
            "checked",
            false
        );
        temp_selected.splice(index, 1);

        let el = document.querySelector(`input.check_all`)
        if(el)el.checked = false;

        state[`${store_prefix}_selected`] = temp_selected;
    },

    /** watch selected data into side canvas */
    [`set_${store_prefix}_show_selected`]: function (state, trigger) {
        state[`${store_prefix}_show_selected`] = trigger; // true or false
    },

    /** trigger data management modal */
    [`set_${store_prefix}_show_management_modal`]: function (state, trigger = true) {
        state[`${store_prefix}_show_management_modal`] = trigger; // true or false
    },

    /** trigger data create canvas ( sidebar) */
    [`set_${store_prefix}_show_create_canvas`]: function (state, trigger = true) {
        state[`${store_prefix}_show_create_canvas`] = trigger; // true or false
    },
    [`set_${store_prefix}_show_edit_canvas`]: function (state, trigger = true) {
        state[`${store_prefix}_show_edit_canvas`] = trigger; // true or false
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
};
