<template>
    <div class="container">
        <div class="card list_card" v-if="this[`get_user`]">
            <div class="card-header">
                <h4>Details</h4>
                <div class="btns">
                    <a href="" @click.prevent="call_store(`set_user`,null), $router.push({ name: `All${route_prefix}` })"  class="btn rounded-pill btn-outline-warning" >
                        <i class="fa fa-arrow-left me-5px"></i>
                        <span >
                            Back
                        </span>
                    </a>
                </div>
            </div>
            <div class="card-body pb-5 ">
                <div class="row justify-content-center">
                    <div class="col-lg-7 ">
                        <table class="table table-bordered details_table">
                            <tr>
                                <td colspan="2" class="text-center">
                                    <img :src="this[`get_user`].photo_url" height="200" alt="">
                                </td>
                            </tr>
                            <tr>
                                <td>id</td>
                                <td>{{ this[`get_user`].id }}</td>
                            </tr>
                            <tr>
                                <td>first Name</td>
                                <td>{{ this[`get_user`].first_name }}</td>
                            </tr>
                            <tr>
                                <td>last Name</td>
                                <td>{{ this[`get_user`].last_name }}</td>
                            </tr>
                            <tr>
                                <td>user name</td>
                                <td>{{ this[`get_user`].user_name }}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{{ this[`get_user`].email }}</td>
                            </tr>
                            <tr>
                                <td>mobile number </td>
                                <td>{{ this[`get_user`].mobile_number  }}</td>
                            </tr>
                            <tr>
                                <td>slug </td>
                                <td>{{ this[`get_user`].slug  }}</td>
                            </tr>
                            <tr>
                                <td>status </td>
                                <td>
                                    <span v-if="this[`get_user`].status == 1" class="badge bg-label-success me-1">active</span>
                                    <span v-if="this[`get_user`].status == 0" class="badge bg-label-success me-1">deactive</span>
                                </td>
                            </tr>
                            <tr>
                                <td>created at </td>
                                <td>
                                    {{ new Date(this[`get_user`].created_at).toDateString()  }}, &nbsp;
                                    {{ new Date(this[`get_user`].created_at).toLocaleTimeString()  }}
                                </td>
                            </tr>
                            <tr>
                                <td>updated at </td>
                                <td>
                                    {{ new Date(this[`get_user`].updated_at).toDateString()  }}, &nbsp;
                                    {{ new Date(this[`get_user`].updated_at).toLocaleTimeString()  }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card-footer text-center">
                <permission-button
                    :permission="`can_edit`"
                    :to="{name:`Edit${route_prefix}`,params:{id:this[`get_user`].id}}"
                    :classList="`btn btn-outline-info`">
                    <i class="fa text-info fa-pencil"></i> &nbsp;
                    Edit
                </permission-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"
import PermissionButton from "../components/PermissionButton.vue"
/** store and route prefix for export object use */
import PageSetup from "./PageSetup";
const {route_prefix, store_prefix} = PageSetup;

export default {
    components: { PermissionButton },
    data: function(){
        return {
            route_prefix,
            store_prefix,
        }
    },
    created: function () {
        this.fetch_user({id: this.$route.params.id, select_all:1})
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

<style>

</style>
