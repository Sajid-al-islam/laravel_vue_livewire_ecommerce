<template>
    <div class="canvas_backdrop"
        :class="{active: this[`get_${store_prefix}_show_create_canvas`]}"
        @click="$event.target.classList.contains('canvas_backdrop') && call_store(`set_${store_prefix}_show_create_canvas`,(false))">
        <div class="content right" v-if="this[`get_${store_prefix}_show_create_canvas`]">
            <div class="content_header">
                <h3 class="offcanvas-title">Create</h3>
                <i @click="call_store(`set_${store_prefix}_show_create_canvas`,(false))" class="fa fa-times"></i>
            </div>
            <div :class="`cotent_body ${store_prefix}_canvas_create_form`" @keyup.enter="call_store(`upload_${store_prefix}_create_canvas_input`)">
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Brand Title`"
                        :data_attr="[{name: 'name'}]"
                    />
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
            route_prefix,
            store_prefix,
        }
    },
    methods: {
        ...mapActions([`upload_${store_prefix}_create_canvas_input`]),
        ...mapMutations([
            `set_${store_prefix}_show_create_canvas`,
        ]),

        call_store: function(name, params=null){
            this[name](params)
        },
    },
    computed: {
        ...mapGetters([
            `get_${store_prefix}_show_create_canvas`,
        ])
    }
}
</script>

<style>

</style>
