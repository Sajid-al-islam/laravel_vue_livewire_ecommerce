<template>
    <div class="multiple_select_body">
        <div class="multiple_select_data" @click="call_store(`set_user_show_management_modal`,true)">
            <div v-for="user in this[`get_user_selected`]" :key="user.id" class="item">
                {{ user.first_name }}
                {{ user.last_name }}
            </div>
            <div class="btn btn-sm btn-outline-danger" v-if="!this[`get_user_selected`].length">
                no user selected
            </div>
        </div>

        <div class="multiple_select_modal" v-if="this[`get_user_show_management_modal`]">
            <div class="multiple_select_modal_backdrop" @click="call_store(`set_user_show_management_modal`,false)"></div>
            <div class="multiple_select_modal_body custom_scroll">
                <div class="header">
                    <div class="search">
                        <input @keyup="call_store(`set_user_search_key`,$event.target.value)" type="text" class="rounded-pill form-control">
                    </div>
                    <div class="action_btns">
                        <a @click.prevent="call_store(`set_clear_selected_users`)" v-if="this[`get_user_selected`].length" href="#" class="btn rounded-pill btn-outline-danger me-2"><i class="fa fa-trash"></i> remove selected</a>
                        <a @click.prevent="call_store(`set_user_show_create_canvas`,true)" href="#" class="btn rounded-pill btn-outline-primary"><i class="fa fa-pencil"></i> create</a>
                    </div>
                </div>
                <div class="selected">
                    <div class="item" v-for="user in this[`get_user_selected`]" :key="user.id">
                        <button @click.prevent="call_store(`set_selected_users`, user)" class="btn rounded-pill btn-outline-secondary" type="button">
                            <span>
                                {{ user.user_name }}
                            </span>
                            <span>|</span>
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="data_list custom_scroll table-responsive text-nowrap">
                    <table class="table table-hover table-bordered">
                        <thead class="table-light">
                            <tr>
                                <th><input @click="call_store(`set_select_all_users`)" type="checkbox" class="form-check-input check_all"></th>
                                <user-table-th :sort="true" :ariaLable="`id`" :tkey="`id`" :title="`ID`" />
                                <user-table-th :sort="true" :tkey="`photo`" :title="`Photo`" />
                                <user-table-th :sort="true" :tkey="`first_name`" :title="`Name`" />
                                <!-- <user-table-th :sort="true" :tkey="`email`" :title="`Email`" /> -->
                                <user-table-th :sort="true" :tkey="`mobile_number`" :title="`Mobile NO`" />
                                <!-- <user-table-th :sort="true" :tkey="`status`" :title="`Status`" /> -->
                                <th aria-label="actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            <tr v-for="item in this[`get_users`].data" :key="item.id">
                                <td>
                                    <input v-if="check_if_user_is_selected(item)" :data-id="item.id" checked @change="call_store(`set_selected_users`, item)" type="checkbox" class="form-check-input">
                                    <input v-else @change="call_store(`set_selected_users`, item)" type="checkbox" class="form-check-input">
                                </td>
                                <td>{{ item.id }}</td>
                                <td>
                                    <img :src="`${item.photo_url}`" style="height:30px;" alt="Avatar" class="rounded-circle" />
                                </td>
                                <td >
                                    <span class="text-warning cursor_pointer" @click.prevent="call_store(`set_user`, item)">
                                        {{ item.first_name }} {{ item.last_name }}
                                    </span>
                                </td>
                                <!-- <td>{{ item.email }}</td> -->
                                <td>
                                    {{ item.mobile_number }}
                                </td>
                                <!-- <td>
                                    <span v-if="item.status == 1" class="badge bg-label-success me-1">active</span>
                                    <span v-if="item.status == 0" class="badge bg-label-success me-1">deactive</span>
                                </td> -->
                                <td>
                                    <div class="table_actions">
                                        <a href="#" @click.prevent="()=>``" class="btn btn-sm btn-outline-secondary">
                                            <i class="fa fa-gears"></i>
                                        </a>
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i class="fa text-info fa-pencil"></i>
                                                    Edit
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="footer_modal d-flex justify-content-between align-items-start">
                    <pagination :data="get_users" :limit="5" :size="`small`" :show-disabled="true" :align="`left`"
                        @pagination-change-page="handle_pagination">
                        <span slot="prev-nav"><i class="fa fa-angle-left"></i> Previous</span>
                        <span slot="next-nav">Next <i class="fa fa-angle-right"></i></span>
                    </pagination>
                    <button @click.prevent="call_store(`set_user_show_management_modal`,false)" href="#" class="btn rounded-pill btn-outline-secondary">
                        <i class="fa fa-floppy-disk"></i>
                        Save & Close
                    </button>
                </div>
            </div>
        </div>

        <create-user-canvas></create-user-canvas>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"
import CreateUserCanvas from "../CreateUserCanvas.vue";
import UserTableTh from "./UserTableTh.vue";
/** store and route prefix for export object use */
import PageSetup from "../PageSetup";
const {route_prefix, store_prefix, pagination_limits} = PageSetup;

export default {
    components: { UserTableTh, CreateUserCanvas },
    data: function(){
        return {
            route_prefix,
            store_prefix,
            pagination_limits
        }
    },
    created: function(){
        this.set_user_paginate(9);
        this.fetch_users();
    },
    methods: {
        ...mapActions([`fetch_users`]),
        ...mapMutations([
            `set_user_paginate`,
            `set_user_page`,
            `set_user_search_key`,
            `set_user_orderByCol`,
            `set_user`,
            `set_selected_users`,
            `set_select_all_users`,
            `set_clear_selected_users`,
            `set_user_show_selected`,
            `set_user_show_create_canvas`,
            `set_user_show_management_modal`,
        ]),

        check_if_user_is_selected: function(user){
            let check_index = this.get_user_selected.findIndex((i) => i.id == user.id);
            if(check_index >= 0){
                return true;
            }else{
                return false;
            }
        },

        call_store: function(name, params=null){
            this[name](params)
        },
        handle_pagination: function(page=1){
            return this[`set_${store_prefix}_page`](page);
        },
    },
    computed: {
        ...mapGetters([
            `get_users`,
            `get_user_selected`,
            `get_user_show_management_modal`,
        ]),
    }
};
</script>

<style>
</style>
