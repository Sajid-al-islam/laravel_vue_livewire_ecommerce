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
            <form @submit.prevent="call_store(`store_${store_prefix}`,$event.target)" autocomplete="false" class="product_stock_create_form">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="admin_form form_1">
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <div>
                                        <label class="mb-2 text-capitalize">
                                            Select supplier
                                        </label>
                                        <SupplierManagementModal/>
                                    </div>
                                </div>

                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <div>
                                        <label class="mb-2 text-capitalize">
                                            Select product
                                        </label>
                                        <ProductStockManagementModal/>
                                    </div>
                                </div>

                                <div class=" form-group d-grid align-content-start gap-1 mb-2">
                                    <input-field
                                        :label="`Product Quantity`"
                                        :name="`qty`"
                                        :type="`number`"
                                    />
                                </div>

                                <div class=" form-group d-grid align-content-start gap-1 mb-2">
                                    <input-field
                                        :label="`Purchase Date`"
                                        :name="`purchase_date`"
                                        :type="`date`"
                                    />
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
import ProductStockManagementModal from "../product/components/ManagementModal.vue"
import SupplierManagementModal from "../Supplier/components/ManagementModal.vue"
const {route_prefix, store_prefix} = PageSetup;

export default {
    components: { InputField, ProductStockManagementModal, SupplierManagementModal },
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
        ]),
        call_store: function(name, params=null){
            this[name](params)
        },
    },

    computed: {
        // mapping the getters
        ...mapGetters([
            'get_customer_phone_no',
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
