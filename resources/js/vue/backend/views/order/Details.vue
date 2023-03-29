<template>
    <div class="container">
        <div class="card list_card">
            <div class="card-header no_print">
                <h4>Details</h4>
                <div class="btns">
                    <a href="" @click.prevent="$router.push({ name: 'EmailOrder', params:{id: $route.params.id} })"  class="btn rounded-pill btn-outline-success me-2">

                        <i class="fa fa-envelope me-5px"></i>
                        <span >
                            Email invoice
                        </span>
                    </a>

                    <a href="" @click.prevent="call_store(`print_${store_prefix}_details`, null)"  class="btn rounded-pill btn-outline-success me-2">

                        <i class="fa fa-print me-5px"></i>
                        <span >
                            Print
                        </span>
                    </a>

                    <a href="" @click.prevent="call_store(`set_${store_prefix}`,null), $router.push({ name: 'AllOrder' })"  class="btn rounded-pill btn-outline-warning" >
                        <i class="fa fa-arrow-left me-5px"></i>
                        <span >
                            Back
                        </span>
                    </a>


                </div>
            </div>
            <div class="card-body pb-5" v-if="this[`get_${store_prefix}`]" id="print_section">
                <div class="row justify-content-center">
                    <div class="col-lg-7">
                        <div class="row mb-4">
                            <div class="col-sm-6">
                                <h5 class="mb-3">From:</h5>
                                <h3 class="text-dark mb-1">{{ get_company_info.company_name }}</h3>
                                <div>{{ get_company_info.address[0].building }}, </div>
                                <div>{{ get_company_info.address[0].shop }}, </div>
                                <div>{{ get_company_info.address[0].area }}, {{ get_company_info.address[0].division }}</div>
                                <div>Email: {{ get_company_info.email }}</div>
                                <div>Phone: {{ get_company_info.mobile_no[0] }}</div>
                            </div>
                            <div class="col-sm-6" v-if="this[`get_${store_prefix}`]">
                                <h5 class="mb-3">To:</h5>
                                <h3 class="text-dark mb-1">{{ this[`get_${store_prefix}`].order_address.first_name }} {{ this[`get_${store_prefix}`].order_address.last_name }}</h3>
                                <div>{{ this[`get_${store_prefix}`].order_address.address }}</div>
                                <div>Email: {{ this[`get_${store_prefix}`].order_address.email }}</div>
                                <div>Phone: {{ this[`get_${store_prefix}`].order_address.mobile_number }}</div>
                            </div>
                        </div>
                        <div class="table-responsive-sm" v-if="this[`get_${store_prefix}`]">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="center">#</th>
                                        <th>Item</th>
                                        <th class="right">Price</th>
                                        <th class="center">Qty</th>
                                        <th class="right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <span v-if="this[`get_${store_prefix}`]">
                                        {{ this[`get_${store_prefix}`].order_details }}
                                    </span> -->

                                    <tr v-for="(order_detail, index) in this[`get_${store_prefix}`].order_details" :key="index" class="single_row_table">

                                        <td class="center">{{ index+1 }}</td>
                                        <td class="left strong">{{ order_detail.product.product_name }}</td>
                                        <td class="right">{{ order_detail.product_price }}</td>
                                        <td class="center">{{ order_detail.qty }}</td>
                                        <td class="right">{{ order_detail.product_price * order_detail.qty }}</td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-sm-5"></div>
                            <div class="col-lg-4 col-sm-5 ml-auto">
                                <table class="table table-clear">
                                    <tbody>
                                        <tr>
                                            <td class="left">
                                                <strong class="text-dark">Subtotal</strong>
                                            </td>
                                            <td class="right">{{ this[`get_${store_prefix}`].sub_total }}</td>
                                        </tr>
                                        <tr>
                                            <td class="left">
                                                <strong class="text-dark">Total</strong>
                                            </td>
                                            <td class="right">
                                                <strong class="text-dark">{{ this[`get_${store_prefix}`].total_price }}</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <hr>
                <div class="seo_section full_width mt-5 no_print">
                    <div class="heading mb-4">
                        <h4 class="d-flex justify-content-center">Order action</h4>
                        <h6 class="d-flex justify-content-center">change order status.</h6>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-4 mx-auto">
                            <form class="status_change_form" action="javascript:void(0)" @submit.prevent="call_store(`set_${store_prefix}_status_update`, null)">
                                <div class="mb-2">
                                    <label for="order_status_change" class="form-label">Change Status</label>

                                    <select id="order_status_change" v-model="this[`get_${store_prefix}`].order_status" class="form-select" name="order_status">
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="processing">Processing</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </div>
                                <button class="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="card-footer text-center">
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import PermissionButton from '../components/PermissionButton.vue'
/** store and route prefix for export object use */
import PageSetup from './PageSetup';
const {route_prefix, store_prefix} = PageSetup;

export default {
    components: { PermissionButton },
    data: function(){
        return {
            /** store prefix for JSX */
            store_prefix,
            route_prefix,
        }
    },
    created: function () {
        this[`fetch_${store_prefix}`]({id: this.$route.params.id, select_all:1})

        // setTimeout(() => {
        //     document.querySelector("section").style.background = "transparent"
        //     // if(this[`get_${store_prefix}`].description.includes("bg-white")) {
        //     //     document.querySelector("section").style.background-color = "transparent";
        //     // }
        // }, 1000);

    },
    methods: {
        ...mapActions([
            `fetch_${store_prefix}`,
            `set_${store_prefix}_status_update`,
            `print_${store_prefix}_details`,
            `email_${store_prefix}_invoice`
        ]),
        ...mapMutations([
            `set_${store_prefix}`
        ]),
        call_store: function(name, params=null){
            // import action before using call store() function
            this[name](params)
        },
    },
    computed: {
        ...mapGetters(
            [
                `get_${store_prefix}`,
                'get_company_info'
            ]
        )
    }
}
</script>
