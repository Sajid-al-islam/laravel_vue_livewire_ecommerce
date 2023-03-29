<template>
    <li class="nav-item has-sub" v-if="is_role_permitted">
        <a @click.prevent="toggleLi($event)" class="d-flex align-items-center" href="#">
            <i :class="icon"></i>
            <span class="menu-title text-truncate">{{ text }}</span>
            <span v-if="alert_count" class="badge badge-light-warning rounded-pill ms-auto me-1">
                {{ alert_count }}
            </span>
        </a>
        <ul class="menu-content">
            <slot />
        </ul>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    props: ['icon','text','alert_count','role_permissions'],
    created: function(){

    },
    methods: {
        toggleLi: function(e){
            [...document.querySelectorAll('.nav-item.has-sub')].forEach(el=>(!el.classList.contains('contains')) && el.classList.remove('open'))
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
