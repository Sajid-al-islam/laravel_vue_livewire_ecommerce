import { debounce } from "debounce";

/**
 * Class defination
 * @class StoreModule
 * @property store_prefix
 * @property api_prefix
 * @property route_prefix
 * @property start_page
 * @property paginate
 */
class StoreModule {
    /**
     * @type {String}
     */
    store_prefix;
    api_prefix;
    route_prefix;
    start_page;
    paginate;

    /**
     * @constructor
     * ```js
        let user_module = new StoreModule(
                store_prefix: String,
                api_prefix: String,
                route_prefix: String,
                start_page: Number,
                paginate: Number
            )
        store_prefix = "", // user_module as user, user_role_module as user_role
        api_prefix = "", // /api/user/all as user, /api/user-role/all as user-role
        route_prefix = "",
        start_page = 1,
        paginate = 10
     * ```
     */
    constructor(
        store_prefix = "",
        api_prefix = "",
        route_prefix = "",
        start_page = 1,
        paginate = 10
    ) {
        this.store_prefix = store_prefix;
        this.api_prefix = api_prefix;
        this.route_prefix = route_prefix;
        this.start_page = start_page;
        this.paginate = paginate;
    }

    /**
     * get default states for each CRUD operations
     * ```js
     * let store_prefix = 'user';
     * ```
     * @returns
     * ```js
     * return {
            "users": {}, // all data
            "user": null, // selected data

            // data filters
            "user_page": 1,
            "user_paginate": 10,
            "user_search_key": "",
            "orderByCol": "id",
            "orderByAsc": true,
            "user_show_active_data": 1, // show all active data

            // selected data
            "user_selected": [], // selected data using checkbox
            "user_show_selected": false, // will show selected data into offcanvas

            // trigger showing data modal
            "user_show_management_modal": false,

            // trigger showing data form canvas
            "user_show_create_canvas": false,
            "user_show_edit_canvas": false
        }
     *```
    */
    states(store_prefix = this.store_prefix, start_page = this.start_page, paginate = this.paginate) {
        // state list
        const state = {
            /* data store */
            [`${store_prefix}s`]: {}, // all data
            [`${store_prefix}`]: null, // selected data

            /* data filters */
            [`${store_prefix}_page`]: start_page,
            [`${store_prefix}_paginate`]: paginate,
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

        return state;
    }

    /**
     * @method getters
     * ```js
     * let store_prefix = 'user';
     * ```
     * @returns
     * ```js
     * return {
            get_users: (state) => state.users
            get_user: (state) => state.user

            get_user_selected: (state) => state.user_selected
            get_user_show_selected: (state) => state.user_show_selected

            // return 1 | 0
            get_user_show_active_data: (state) => state.user_show_active_data

            // return true | false
            get_user_show_create_canvas: (state) => state.user_show_create_canvas
            get_user_show_edit_canvas: (state) => state.user_show_edit_canvas

            get_user_show_management_modal: (state) => state.user_show_management_modal
        }
     *```
    */

    getters() {
        let store_prefix = this.store_prefix;

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

        return getters;
    }

    /**
     * @method actions
     * ```js
     * let store_prefix = 'user';
     * ```
     * @returns
     * ```js
     * return {
            fetch_users: ({commit,dispatch,getters,rootGetters,rootState,state}) => '' // fetch all data using data filters
            fetch_user: () => '' // fetch single data

            store_user: () => ''
            update_user: () => ''

            soft_delete_user: () => ''
            restore_user: () => ''

            upload_user_create_canvas_input: () => '' // store data canvas form
            upload_user_edit_canvas_input: () => '', // update data canvas form

            bulk_import_user: () => '' // import from csv
            export_user_all: () => '' // export all data into csv
            export_selected_user_csv: () => '' // export all selected data into csv
        }
     *```
    */
    actions() {
        let store_prefix = this.store_prefix;
        let api_prefix = this.api_prefix;

        let actions = {
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
            [`fetch_${store_prefix}`]: async function ({ state }, { id }) {
                let url = `/${api_prefix}/${id}`;
                await axios.get(url).then((res) => {
                    this.commit(`set_${store_prefix}`, res.data);
                });
            },

            /** store data */
            [`store_${store_prefix}`]: function ({ state }, event) {
                let form_data = new FormData(event);
                axios.post(`/${api_prefix}/store`, form_data).then((res) => {
                    event.reset();
                    window.s_alert("new role been created");
                });
            },

            /** update data */
            [`update_${store_prefix}`]: function ({ state }, event) {
                let form_data = new FormData(event);
                form_data.append("id", state[store_prefix].id);
                axios.post(`/${api_prefix}/update`, form_data).then((res) => {
                    /** reset loaded user_role after data update */
                    // this.commit(`set_${store_prefix}`, null);
                    window.s_alert("data updated");
                });
            },

            /** store data canvas form */
            [`upload_${store_prefix}_create_canvas_input`]: function ({
                state,
            }) {
                const { form_values, form_inputs, form_data } =
                    window.get_form_data(`.${store_prefix}_canvas_create_form`);
                axios
                    .post(`/${api_prefix}/canvas-store`, form_data)
                    .then((res) => {
                        window.s_alert("new role been created");
                        this.commit(
                            `set_${store_prefix}_show_create_canvas`,
                            false
                        );
                        this.dispatch(`fetch_${store_prefix}s`);
                    })
                    .catch((error) => {
                        let object = error.response?.data?.errors;
                        /**
                         * 1. object to render as error
                         * 2. selector key for error redering
                         *      . by default name will find by script
                         *      . else you have to pass selector name
                         *      . here we are using data-name as input fields selector
                         */
                        window.render_form_errors(object, "data-name");
                    });
            },
            [`upload_${store_prefix}_edit_canvas_input`]: function ({ state }) {
                const { form_values, form_inputs, form_data } =
                    window.get_form_data(`.${store_prefix}_canvas_edit_form`);
                form_data.append("id", state[store_prefix].id);
                axios
                    .post(`/${api_prefix}/canvas-update`, form_data)
                    .then((res) => {
                        window.s_alert("role updated");
                        this.commit(
                            `set_${store_prefix}_show_edit_canvas`,
                            false
                        );
                        this.commit(`set_${store_prefix}`, null);
                        this.dispatch(`fetch_${store_prefix}s`);
                    })
                    .catch((error) => {
                        let object = error.response?.data?.errors;
                        /**
                         * 1. object to render as error
                         * 2. selector key for error redering
                         *      . by default name will find by script
                         *      . else you have to pass selector name
                         *      . here we are using data-name as input fields selector
                         */
                        window.render_form_errors(object, "data-name");
                    });
            },

            /** Deactivate user, will be hidden from list */
            [`soft_delete_${store_prefix}`]: async function (
                { state, getters, dispatch },
                id
            ) {
                let cconfirm = await window.s_confirm("Deactive");
                if (cconfirm) {
                    axios
                        .post(`/${api_prefix}/soft-delete`, { id })
                        .then(({ data }) => {
                            dispatch(`fetch_${store_prefix}s`);
                            window.s_alert(
                                `${store_prefix} has been deactivated`
                            );
                        });
                }
            },

            /** restore deactivated user */
            [`restore_${store_prefix}`]: async function (
                { state, getters, dispatch },
                id
            ) {
                let cconfirm = await window.s_confirm("restore");
                if (cconfirm) {
                    axios
                        .post(`/${api_prefix}/restore`, { id })
                        .then(({ data }) => {
                            dispatch(`fetch_${store_prefix}s`);
                            window.s_alert(`${store_prefix} has been restored`);
                        });
                }
            },

            /** import bulk data */
            [`bulk_import_${store_prefix}`]: async function ({ state }, data) {
                let cconfirm = await window.s_confirm("upload");
                if (cconfirm) {
                    axios
                        .post(`/${api_prefix}/bulk-import`, { data })
                        .then(({ data }) => {
                            window.s_alert(`data imported`);
                        });
                }
            },

            /** export all data into csv */
            [`export_${store_prefix}_all`]: async function ({ state }) {
                let cconfirm = await window.s_confirm("export all");
                if (cconfirm) {
                    let col = Object.keys(state[`${store_prefix}s`].data[0]);
                    var export_csv = new window.CsvBuilder(
                        `${store_prefix}_list.csv`
                    ).setColumns(col);
                    window.start_loader();
                    let last_page = state[`${store_prefix}s`].last_page;
                    for (let index = 1; index <= last_page; index++) {
                        state.page = index;
                        state.paginate = 10;
                        await this.dispatch(`fetch_${store_prefix}s`);
                        let values = state[`${store_prefix}s`].data.map((i) =>
                            Object.values(i)
                        );
                        export_csv.addRows(values);

                        let progress = Math.round((100 * index) / last_page);
                        window.update_loader(progress);
                    }
                    await export_csv.exportFile();
                    window.remove_loader();
                }
            },

            /** export selected data into csv */
            [`export_selected_${store_prefix}_csv`]: function ({ state }) {
                let col = Object.keys(state[`${store_prefix}_selected`][0]);
                let values = state[`${store_prefix}_selected`].map((i) => Object.values(i));
                new window.CsvBuilder(`${store_prefix}_list.csv`)
                    .setColumns(col)
                    // .addRow(["Eve", "Holt"])
                    .addRows(values)
                    .exportFile();
            },
        };

        return actions;
    }


    /**
     * @method setters
     * ```js
     * let store_prefix = 'user';
     * ```
     * @returns
     * ```js
     * return {
            // set data array state
            // set single data

            set_users: ( state , {
                current_page: 1,
                data: [],
                first_page_url: '',
                from: 1,
                last_page : 14,
                last_page_url: '',
                next_page_url: '',
                per_page: 10,
                prev_page_url: 10,
                to: 10,
                total: 10,
            }) => '',

            set_user: (state, {...selected_data_object}) => '',

            // filter data object
            // 1. set per page paginate amount
            // 2. switch to targeted page
            // 3. set order by collumn name
            // 4. set searh key for data set
            // 5. set show data type active or deactive

            set_user_paginate: (state, per_page_paginate_amount = 10) => '',
            set_user_page: (state, navigate_to_page_not=1) => '',
            set_user_orderByCol: (state, orderByCol='id' ) => '', // default asscending order
            set_user_search_key: (state, searchKey='') => '',
            set_user_show_active_data: (state, show_active_data = 1 ) => '', // 1 for render active data, 0 for render deactive data

            // set selected data array
            set_selected_users: (state, selected_data_object) => '', // selected_data will push to selected data array

            // select all data
            set_select_all_users: () => '', // push all data into selected data array

            // clear all selected data
            // if confirm true alert will show
            set_clear_selected_users: (state , is_should_confirm = true||false) => '', // clear all data from selected data array

            // remove single from selected data
            set_clear_selected_single_user: (state, data_index) => '', // remove single data from selected data array

            // watch selected data into side canvas
            set_user_show_selected: (state, true || false) => '', // show or hide

            // trigger data create canvas ( sidebar)
            set_user_show_create_canvas: (state, true || false) => '',
            set_user_show_edit_canvas: (state, true || false) => '',
            set_user_show_management_modal: (state, true || false) => '',
        }
     *```
    */
    mutations(){
        let store_prefix = this.store_prefix;

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

        return mutations;
    }
}



export default StoreModule;
