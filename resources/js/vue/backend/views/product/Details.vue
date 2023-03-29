<template>
    <div class="container">
        <div class="card list_card">
            <div class="card-header">
                <h4>Details</h4>
                <div class="btns">
                    <a href="" @click.prevent="call_store(`set_${store_prefix}`,null), $router.push({ name: `All${route_prefix}` })"  class="btn rounded-pill btn-outline-warning" >
                        <i class="fa fa-arrow-left me-5px"></i>
                        <span >
                            Back
                        </span>
                    </a>
                </div>
            </div>
            <div class="card-body pb-5 ">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div v-if="this[`get_${store_prefix}`]" class="container">
                            <div class="header">
                                <div class="row r1">
                                    <div class="col-md-12">
                                        <h3>{{ this[`get_${store_prefix}`].product_name }}</h3>
                                    </div>
                                    <div class="col-md-5 mt-2">
                                        <img :src="'/'+this[`get_${store_prefix}`].related_images[0].image" width="100px">
                                    </div>
                                    <!-- <div class="col-md-3 text-right pqr"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div> -->
                                    <h3 class="text-left para mt-2">Price: {{ this[`get_${store_prefix}`].default_price }}</h3>
                                </div>
                            </div>
                            <div class="container-body mt-1">
                                <div class="row">
                                    <div class="col-md-10">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">
                                                <b v-if="this[`get_${store_prefix}`].status == 1">Status:  &nbsp;</b><span v-if="this[`get_${store_prefix}`].status == 1" class="badge bg-success me-1">active</span>
                                                <b v-if="this[`get_${store_prefix}`].status == 0">Status:  &nbsp;</b> <span v-if="this[`get_${store_prefix}`].status == 0" class="badge bg-danger me-1">deactive</span>
                                            </li>
                                            <li class="list-group-item">
                                                <b>Created At: </b> &nbsp;
                                                {{ new Date(this[`get_${store_prefix}`].created_at).toDateString()  }}, &nbsp;
                                                {{ new Date(this[`get_${store_prefix}`].created_at).toLocaleTimeString()  }}
                                            </li>
                                            <li class="list-group-item">
                                                <b>Updated At: </b> &nbsp;
                                                {{ new Date(this[`get_${store_prefix}`].updated_at).toDateString()  }}, &nbsp;
                                                {{ new Date(this[`get_${store_prefix}`].updated_at).toLocaleTimeString()  }}
                                            </li>
                                        </ul>
                                    </div>

                                    <h2 style="margin-top: 20px;">Description</h2>
                                    <div
                                        class="product_details_backend mt-3"
                                        v-html="this[`get_${store_prefix}`].description"></div>
                                    <div
                                        class="product_details_backend mt-3"
                                        v-html="this[`get_${store_prefix}`].specification"></div>
                                    <!-- <div class="col-md-5 p-0 klo">
                                        <ul>
                                            <li>100% Quality</li>
                                            <li>Free Shipping</li>
                                            <li>Easy Returns</li>
                                            <li>12 Months Warranty</li>
                                            <li>EMI Starting from (On Credit Cards)</li>
                                            <li>Normal Delivery : 4-5 Days</li>
                                            <li>Express Delivery : 2-3 Days</li>
                                            <li>COD Available (All Over India)</li>
                                        </ul>
                                    </div> -->


                                </div>
                            </div>

                        </div>
                        <!-- <table v-if="this[`get_${store_prefix}`]" class="table table-bordered details_table">
                            <tr>
                                <td>id</td>
                                <td>{{ this[`get_${store_prefix}`].id }}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{{ this[`get_${store_prefix}`].product_name }}</td>
                            </tr>

                            <tr>
                                <td>price</td>
                                <td>{{ this[`get_${store_prefix}`].default_price }}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>
                                    <span v-html="this[`get_${store_prefix}`].description"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>status </td>
                                <td>
                                    <span v-if="this[`get_${store_prefix}`].status == 1" class="badge bg-label-success me-1">active</span>
                                    <span v-if="this[`get_${store_prefix}`].status == 0" class="badge bg-label-success me-1">deactive</span>
                                </td>
                            </tr>
                            <tr>
                                <td>created at </td>
                                <td>
                                    {{ new Date(this[`get_${store_prefix}`].created_at).toDateString()  }}, &nbsp;
                                    {{ new Date(this[`get_${store_prefix}`].created_at).toLocaleTimeString()  }}
                                </td>
                            </tr>
                            <tr>
                                <td>updated at </td>
                                <td>
                                    {{ new Date(this[`get_${store_prefix}`].updated_at).toDateString()  }}, &nbsp;
                                    {{ new Date(this[`get_${store_prefix}`].updated_at).toLocaleTimeString()  }}
                                </td>
                            </tr>
                        </table> -->
                    </div>
                </div>
            </div>
            <div class="card-footer text-center">
                <permission-button
                    :permission="'can_edit'"
                    :to="{name:`Edit${route_prefix}`,params:{id: $route.params.id}}"
                    :classList="'btn btn-outline-info'">
                    <i class="fa text-info fa-pencil"></i> &nbsp;
                    Edit
                </permission-button>
            </div>
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
        ]),
        ...mapMutations([
            `set_${store_prefix}`
        ]),
        call_store: function(name, params=null){
            this[name](params)
        },
    },
    computed: {
        ...mapGetters([`get_${store_prefix}`])
    }
}
</script>

<style scoped>

</style>
