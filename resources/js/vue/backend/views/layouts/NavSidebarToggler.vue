<template>
    <li class="nav-item">
        <a @click.prevent="toggle_nav" class="nav-link menu-toggle" href="#">
            <i class="fa fa-align-left"></i>
        </a>
    </li>
</template>

<script>
export default {
    methods: {
        toggle_nav: function(){
            document.querySelector('html').classList.toggle('nav-hide')
        }
    }
}
</script>

<style>

</style>
