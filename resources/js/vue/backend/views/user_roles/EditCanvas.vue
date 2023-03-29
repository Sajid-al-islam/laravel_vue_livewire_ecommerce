<template>
    <div class="canvas_backdrop"
        :class="{active: this[`get_${store_prefix}_show_edit_canvas`]}"
        @click="$event.target.classList.contains('canvas_backdrop') && call_store(`set_${store_prefix}_show_edit_canvas`,(false))">
        <div class="content right" v-if="this[`get_${store_prefix}_show_edit_canvas`]">
            <div class="content_header">
                <h3 class="offcanvas-title">Edit</h3>
                <i @click="call_store(`set_${store_prefix}_show_edit_canvas`,(false))" class="fa fa-times"></i>
            </div>
            <div :class="`cotent_body ${store_prefix}_canvas_edit_form`" @keyup.enter="call_store(`upload_${store_prefix}_edit_canvas_input`)">
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Role Title`"
                        :value="get_store(`get_${store_prefix}`,`name`)"
                        :data_attr="[{name: 'name'}]"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Role Serial`"
                        :data_attr="[{name: 'role_serial'}]"
                    />
                </div>
                <div class=" form-group text-center mb-2 " >
                    <button @click.prevent="call_store(`upload_${store_prefix}_edit_canvas_input`)" type="button" class="btn btn-outline-info">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import InputField from '../components/InputField.vue'
/** store and route prefix for export object use */
import PageSetup from './PageSetup';
const {route_prefix, store_prefix} = PageSetup;
export default {
    components: { InputField },
    data: function(){
        return {
            /** store prefix for JSX */
            store_prefix,
            route_prefix,
        }
    },
    methods: {
        ...mapActions(['upload_user_role_edit_canvas_input']),
        ...mapMutations([
            'set_user_role_show_edit_canvas',
        ]),

        call_store: function(name, params=null){
            this[name](params)
        },

        get_store: function(name, params=null){
            return this[name][params]
        },

    },
    computed: {
        ...mapGetters([
            `get_${store_prefix}_show_edit_canvas`,
            `get_${store_prefix}`,
        ])
    }
}
</script>

<style>

</style>
