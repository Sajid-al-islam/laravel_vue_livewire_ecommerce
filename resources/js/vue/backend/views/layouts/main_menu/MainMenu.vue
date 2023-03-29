<template>
    <!-- BEGIN: Main Menu-->
    <div  class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
        <main-menu-navbar-top></main-menu-navbar-top>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content custom_scroll">
            <left-nav-list></left-nav-list>
        </div>
    </div>

    <!-- END: Main Menu-->
</template>

<script>
import LeftNavList from '../LeftNavList.vue'
import MainMenuNavbarTop from './MainMenuNavbarTop.vue'
export default {
    components: { MainMenuNavbarTop, LeftNavList },

}
</script>

<style>

</style>
