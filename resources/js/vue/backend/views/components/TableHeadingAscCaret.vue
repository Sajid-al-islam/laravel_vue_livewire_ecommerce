<template>
    <span v-if="tkey == orderByCol">
        <i class="fa-solid fa-arrow-down-a-z text-success" v-if="orderByAsc"></i>
        <i class="fa-solid fa-arrow-up-z-a text-warning" v-else></i>
    </span>
</template>

<script>
export default {
    props: ['tkey','module'],
    computed: {
        orderByCol: function(){
            return this.$store.state[this.module].orderByCol
        },
        orderByAsc: function(){
            return this.$store.state[this.module].orderByAsc
        },
    }
}
</script>

<style>

</style>
