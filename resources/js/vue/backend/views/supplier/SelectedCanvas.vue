<template>
    <div class="canvas_backdrop" :class="{active:this[`get_${store_prefix}_show_selected`]}" @click="$event.target.classList.contains('canvas_backdrop') && call_store(`set_${store_prefix}_show_selected`,false)">
        <div class="content right" v-if="this[`get_${store_prefix}_show_selected`]">
            <div class="content_header">
                <h3 class="offcanvas-title">Selected</h3>
                <i @click="call_store(`set_${store_prefix}_show_selected`,false)" class="fa fa-times"></i>
            </div>
            <div class="cotent_body table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>id</th>
                            <th>name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in this[`get_${store_prefix}_selected`]" :key="item.id">
                            <td>
                                <button @click.prevent="call_store(`set_selected_${store_prefix}s`,item)" class="btn btn-outline-danger">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                            <td>{{ item.id }}</td>
                            <td>
                                {{ item.name }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
/** store and route prefix for export object use */
import PageSetup from './PageSetup';
const {route_prefix, store_prefix} = PageSetup;
export default {
    data: function(){
        return {
            /** store prefix for JSX */
            route_prefix,
            store_prefix
        }
    },
    methods: {
        ...mapMutations([
            `set_selected_${store_prefix}s`,
            `set_${store_prefix}_show_selected`,
            `set_clear_selected_single_${store_prefix}`
        ]),
        call_store: function(name, params=null){
            this[name](params)
        },
    },
    computed: {
        ...mapGetters([
            `get_${store_prefix}_show_selected`,
            `get_${store_prefix}_selected`,
        ])
    }
}
</script>

<style>

</style>
