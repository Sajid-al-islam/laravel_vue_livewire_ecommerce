<template>
    <div class="container">
        <div class="card list_card">
            <div class="card-header">
                <h4>Edit</h4>
                <div class="btns">
                    <a href="" @click.prevent="call_store(`set_${store_prefix}`,null), $router.push({ name: `All${route_prefix}` })"  class="btn rounded-pill btn-outline-warning" >
                        <i class="fa fa-arrow-left me-5px"></i>
                        <span >
                            Back
                        </span>
                    </a>
                </div>
            </div>
            <form @submit.prevent="call_store(`update_${store_prefix}`,$event.target)" autocomplete="false" class="update_form">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="admin_form form_1" v-if="this[`get_${store_prefix}`]">
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Customer Name`"
                                        :name="`name`"
                                        :value="this[`get_${store_prefix}`]['name']"
                                    />
                                </div>
                                <div class="form-group d-aligh align-content-start gap-1 mb-2">
                                    <input-field
                                        :label="`Customer Address`"
                                        :name="`address`"
                                        :value="this[`get_${store_prefix}`]['address']"
                                    />
                                </div>

                                <div class="form-group d-aligh align-content-start gap-1 mb-2">
                                    <input-field
                                        :label="`Customer Email`"
                                        :name="`email`"
                                        :value="this[`get_${store_prefix}`]['email']"
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
                        Update
                    </button>
                </div>
            </form>
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
    created: function () {
        this[`fetch_${store_prefix}`]({id: this.$route.params.id});
    },
    methods: {
        ...mapActions([
            `update_${store_prefix}`,
            `fetch_${store_prefix}`,
            `add_supplier_phone_no`,
            `remove_supplier_phone_no`
        ]),
        ...mapMutations([
            `set_${store_prefix}`,
        ]),
        call_store: function(name, params=null){
            this[name](params)
        },
    },
    computed: {
        ...mapGetters([
            `get_${store_prefix}`,
            'get_supplier_phone_no'
        ])
    }
};
</script>

<style>
</style>
