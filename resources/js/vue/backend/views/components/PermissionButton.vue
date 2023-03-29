<template>
    <span>
        <router-link v-if="can_have_permission && !click" :to="{ ...to }" :class="classList">
            <slot/>
        </router-link>
        <a v-if="can_have_permission && click" @click.prevent="click(click_param)" href="#" :class="classList">
            <slot/>
        </a>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        "to": {
            type: Object,
            default: {
                name: ''
            }
        },
        "click": {
            type: Function,
            default: null,
        },
        "click_param": {
            default: null,
        },
        "classList":{
            default: '',
        },
        "permission":{
            default: ''
        }
    },
    computed: {
        ...mapGetters(['get_auth_permissions']),
        can_have_permission: function(){
            return this.get_auth_permissions.includes(this.permission)
        }
    }
};
</script>

<style>
</style>
