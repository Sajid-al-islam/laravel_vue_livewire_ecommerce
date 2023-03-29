<template>
    <li v-if="is_role_permitted" class="nav-item">
        <a class="d-flex align-items-center" href="#">
            <i :class="icon"></i>
            <span class="menu-title text-truncate">{{ text }}</span>
            <span v-if="alert_count" class="badge badge-light-warning rounded-pill ms-auto me-1">
                {{ alert_count }}
            </span>
        </a>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    props: ['icon','text','alert_count','role_permissions'],
    methods: {
        toggleLi: function(e){
            e.currentTarget.parentNode.classList.toggle('open');
        },
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
}
</script>

<style>

</style>
