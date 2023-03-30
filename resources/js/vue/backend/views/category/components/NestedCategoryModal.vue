<template>
    <div class="multiple_select_body" :id="`${store_prefix}_id`" >
        <div id="selected_categories" class="multiple_select_data" @click="call_store(`set_${store_prefix}_show_nested_category_modal`,true)">
            <div v-for="item in this[`get_${store_prefix}_selected`]" :key="item.id" class="item">
                {{ item.name }}
            </div>
            <div class="btn btn-sm btn-outline-danger" v-if="!this[`get_${store_prefix}_selected`].length">
                no data selected
            </div>
        </div>

        <div class="multiple_select_modal"  v-show="this[`get_${store_prefix}_show_nested_category_modal`]">
            <div class="multiple_select_modal_backdrop" @click="call_store(`set_${store_prefix}_show_nested_category_modal`,false)"></div>
            <div class="multiple_select_modal_body" style="overflow: unset;">
                <div class="header">
                    <div class="search">
                        <input @keyup="call_store(`set_${store_prefix}_search_key`,($event.target.value))" type="text"
                            class="rounded-pill d-none form-control">
                    </div>
                    <div class="action_btns">
                        <a @click.prevent="call_store(`set_clear_selected_${store_prefix}s`)" v-if="this[`get_${store_prefix}_selected`].length" href="#" class="btn rounded-pill btn-outline-danger me-2"><i class="fa fa-trash"></i> remove selected</a>
                    </div>
                </div>
                <div class="selected">
                    <div class="item" v-for="user in this[`get_${store_prefix}_selected`]" :key="user.id">
                        <button @click.prevent="call_store(`set_selected_${store_prefix}s`,user)" class="btn rounded-pill btn-outline-secondary" type="button">
                            <span>
                                {{ user.name }}
                            </span>
                            <span>|</span>
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="data_list text-nowrap">
                    <div class="category_card_dropdown custom_scroll" style="height:568px; overflow-y: scroll; padding-left: 5px;">
                        <nested-cat-list :child="this[`get_${store_prefix}_all_json_nested`]"></nested-cat-list>
                    </div>
                </div>
                <div class="footer_modal d-flex justify-content-between align-items-start">
                    <button type="button" @click.prevent="call_store(`set_${store_prefix}_show_nested_category_modal`,(false))" href="#" class="btn rounded-pill btn-outline-secondary">
                        <i class="fa fa-floppy-disk"></i>
                        Save &amp; Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CreateCanvas from '../CreateCanvas.vue';
import EditCanvas from '../EditCanvas.vue';
import TableTh from './TableTh.vue';

/** store and route prefix for export object use */
import PageSetup from '../PageSetup';
import NestedCatList from './NestedCatList.vue';
const {route_prefix, store_prefix} = PageSetup;

export default {
    components: { TableTh, CreateCanvas, EditCanvas, NestedCatList },
    data: function(){
        return {
            /** store prefix for JSX */
            store_prefix,
            route_prefix,
        }
    },
    created: function(){
        // this[`set_${this.store_prefix}_paginate`](9);
        // this[`fetch_${this.store_prefix}s`]();
        this[`fetch_${this.store_prefix}_all_json`]();
    },
    methods: {
        ...mapActions([
            // `fetch_${store_prefix}s`,
            `fetch_${store_prefix}_all_json`,
        ]),
        ...mapMutations([
            `set_${store_prefix}_paginate`,
            `set_${store_prefix}_page`,
            `set_${store_prefix}_search_key`,
            `set_${store_prefix}_orderByCol`,
            `set_${store_prefix}`,
            `set_selected_${store_prefix}s`,
            `set_select_all_${store_prefix}s`,
            `set_clear_selected_${store_prefix}s`,
            `set_${store_prefix}_show_selected`,

            `set_${store_prefix}_show_selected`,
            `set_${store_prefix}_show_create_canvas`,
            `set_${store_prefix}_show_edit_canvas`,
            `set_${store_prefix}_show_nested_category_modal`,
        ]),

        call_store: function(name, params=null){
            this[name](params)
        },
        handle_pagination: function(page=1){
            return this[`set_${store_prefix}_page`](page);
        },
        check_if_data_is_selected: function(user){
            let check_index = this[`get_${store_prefix}_selected`].findIndex((i) => i.id == user.id);
            if(check_index >= 0){
                return true;
            }else{
                return false;
            }
        },
    },
    computed: {
        ...mapGetters([
            `get_${store_prefix}s`,
            `get_${store_prefix}_selected`,
            `get_${store_prefix}_show_nested_category_modal`,
            `get_${store_prefix}_all_json_nested`,
        ]),
    }
};
</script>

<style>
</style>
