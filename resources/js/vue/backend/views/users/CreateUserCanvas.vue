<template>
    <div class="canvas_backdrop"
        :class="{active:this[`get_${store_prefix}_show_create_canvas`]}"
        @click="$event.target.classList.contains('canvas_backdrop') && call_store(`set_${store_prefix}_show_create_canvas`,false)">
        <div class="content right" v-if="this[`get_${store_prefix}_show_create_canvas`]">
            <div class="content_header">
                <h3 class="offcanvas-title">Create {{route_prefix}}</h3>
                <i @click="call_store(`set_${store_prefix}_show_create_canvas`, false)" class="fa fa-times"></i>
            </div>
            <div class="cotent_body user_canvas_create_form">
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`First Name`"
                        :data_attr="[{name: 'first_name'}]"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Last Name`"
                        :data_attr="[{name: 'last_name'}]"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Email`"
                        :data_attr="[{name: 'email'}]"
                        :type="`email`"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Photo`"
                        :data_attr="[{name: 'photo'}]"
                        :type="`file`"
                    />
                    <!-- <input type="file" data-name="photo"> -->
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`password`"
                        :type="`password`"
                        :data_attr="[{name: 'password'}]"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`confirm password`"
                        :type="`password`"
                        :data_attr="[{name: 'password_confirmation'}]"
                    />
                </div>
                <div class=" form-group text-center mb-2 " >
                    <button @click.prevent="call_store(`upload_${store_prefix}_create_canvas_input`)" type="button" class="btn btn-outline-info">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import InputField from '../components/InputField.vue'

/** store and route prefix for export object use */
import PageSetup from "./PageSetup";
const {route_prefix, store_prefix, layout_title} = PageSetup;
export default {
    components: { InputField },
    data: function(){
        return {
            route_prefix,
            store_prefix,
            layout_title,
        }
    },
    methods: {
        ...mapActions(['upload_user_create_canvas_input']),
        ...mapMutations([
            'set_user_show_create_canvas',
        ]),
        call_store: function(name, params=null){
            this[name](params)
        },
    },
    computed: {
        ...mapGetters(['get_user_show_create_canvas'])
    }
}
</script>

<style>

</style>
