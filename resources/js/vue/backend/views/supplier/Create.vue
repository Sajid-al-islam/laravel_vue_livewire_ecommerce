<template>
    <div class="container">
        <div class="card list_card">
            <div class="card-header">
                <h4>Create</h4>
                <div class="btns">
                    <router-link :to="{ name: `All${route_prefix}` }" class="btn rounded-pill btn-outline-warning" >
                        <i class="fa fa-arrow-left me-5px"></i>
                        Back
                    </router-link>
                </div>
            </div>
            <form @submit.prevent="call_store(`store_${store_prefix}`,$event.target)" autocomplete="false" class="create_form">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="admin_form form_1">
                                <div class=" form-group d-grid align-content-start gap-1 mb-2">
                                    <input-field
                                        :label="`Supplier name`"
                                        :name="`name`"
                                    />
                                </div>

                                <div class=" form-group d-grid align-content-start gap-1 mb-2">
                                    <input-field
                                        :label="`Supplier Email`"
                                        :name="`email`"
                                    />
                                </div>

                                <div class=" form-group d-grid align-content-start gap-1 mb-2">
                                    <input-field
                                        :label="`Supplier Address`"
                                        :name="`address`"
                                    />
                                </div>

                                <div class=" form-group d-grid align-content-start gap-1 mb-2">
                                    <label for="">Mobile number</label>
                                    <div class="d-flex align-items-center" v-for="(customer_phone, index) in get_supplier_phone_no" :key="index">
                                        <input type="text" v-model="customer_phone.phone_no" placeholder="Mobile number" class="form-control invoice_email" id="mobile_numbers">

                                        <div class="justify-content-between">
                                            <div class="d-flex"> 
                                                <button @click.prevent="add_supplier_phone_no(index)" class="btn btn-sm btn-outline-primary justify-content-between add_btn_email">
                                                    <i class="fa-solid fa-plus"></i>
                                                </button>
                                                <button v-if="get_supplier_phone_no.length > 1" class="btn btn-sm btn-outline-danger justify-content-between remove_btn_email" @click.prevent="remove_supplier_phone_no(index)">
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button type="submit" class="btn btn-outline-info" >
                        <i class="fa fa-upload"></i>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
            route_prefix
        }
    },
    created: function () {},
    methods: {
        
        ...mapActions([
            `store_${store_prefix}`,
            `add_supplier_phone_no`,
            `remove_supplier_phone_no`
        ]),
        call_store: function(name, params=null){
            this[name](params)
        },
    },

    computed: {
        // mapping the getters
        ...mapGetters([
            'get_supplier_phone_no',
        ]),

    },
};
</script>

<style scoped>
.invoice_email {
    margin-right: 10px !important;
}
.add_btn_email {
    margin-right: 10px !important;
}
</style>
