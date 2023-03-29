<template>
    <!-- BEGIN: Header-->
    <nav class="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-dark navbar-shadow container-xxl">
        <div class="navbar-container d-flex content">
            <div class="bookmark-wrapper d-flex align-items-center">
                <ul class="nav navbar-nav align-items-center">
                    <nav-sidebar-toggler></nav-sidebar-toggler>
                    <top-nav-watch></top-nav-watch>
                </ul>
            </div>
            <ul class="nav navbar-nav align-items-center ms-auto">
                <nav-theme-mode></nav-theme-mode>
                <nav-search></nav-search>
                <nav-notifications></nav-notifications>
                <nav-right-profile-menu></nav-right-profile-menu>
            </ul>
        </div>
    </nav>
    <!-- END: Header-->
</template>

<script>
import NavNotifications from './NavNotifications.vue';
import NavRightProfileMenu from './NavRightProfileMenu.vue'
import NavSearch from './NavSearch.vue';
import NavSidebarToggler from './NavSidebarToggler.vue';
import NavThemeMode from './NavThemeMode.vue';
import TopNavWatch from './TopNavWatch.vue';
export default {
    components: { NavRightProfileMenu,  NavSearch, NavNotifications, NavThemeMode, NavSidebarToggler, TopNavWatch },
}
</script>

<styl,
        ,
        NavSidebarTogglerNavThemeModee>
</style>
