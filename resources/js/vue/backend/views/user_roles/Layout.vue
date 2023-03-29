<template>
    <div>
        <h3 class="mb-2">{{ layout_title }}</h3>
        <router-view v-if="is_role_permitted"></router-view>
        <div v-else class="text-center">
            <h4 class="text-warning">sorry you have no permission</h4>
            <router-link class="btn btn-outline-warning mt-3" :to="{name:'Dashboard'}">Go Back</router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
/** store and route prefix for export object use */
import PageSetup from './PageSetup';
const {route_prefix, store_prefix, layout_title} = PageSetup;
export default {
    props: ['role_permissions'],
    data: function(){
        return {
            route_prefix,
            store_prefix,
            layout_title,
        }
    },
    created: function(){
        // console.log(this.role_permissions);
    },
    computed: {
        ...mapGetters(['get_auth_roles']),
        is_role_permitted: function(){
            for (let i=0; i<this.role_permissions?.length; i++) {
                let item = this.role_permissions[i];
                if(this.get_auth_roles.includes(item)){
                    return true;
                }
            }
            return false;
        }
    }

};
</script>

<style></style>
