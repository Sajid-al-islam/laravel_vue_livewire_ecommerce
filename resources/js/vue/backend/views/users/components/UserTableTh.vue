<template>
    <th
        @click="sort && call_store(`set_${store_prefix}_orderByCol`,tkey)"
        :class="{ cursor_n_resize: sort }"
        :aria-label="ariaLable"
    >
        {{ title }}
        <table-heading-asc-caret :tkey="tkey" :module="`${store_prefix}_modules`" />
    </th>
</template>

<script>
import { mapMutations } from "vuex";
import TableHeadingAscCaret from "../../components/TableHeadingAscCaret.vue";
/** store and route prefix for export object use */
import PageSetup from '../PageSetup';
const {route_prefix, store_prefix, pagination_limits} = PageSetup;

export default {
    components: { TableHeadingAscCaret },
    props: ["title", "tkey", "sort", "ariaLable"],
    data: function(){
        return {
            route_prefix,
            store_prefix,
            pagination_limits
        }
    },
    methods: {
        ...mapMutations([`set_${store_prefix}_orderByCol`]),
        call_store: function(name, params=null){
            this[name](params)
        },
    },
};
</script>

<style>
</style>
