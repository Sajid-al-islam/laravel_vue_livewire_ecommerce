<template>
    <li>
        <router-link :to="{name:to}" class="d-flex align-items-center">
            <i class="far fa-circle"></i>
            <span class="menu-item text-truncate" >
                {{ text }}
            </span>
        </router-link>
    </li>
</template>

<script>
export default{
    props: ['to','text'],
    methods: {

    }
}
</script>

<style>

</style>
