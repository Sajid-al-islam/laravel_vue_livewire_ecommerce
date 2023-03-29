<template>
    <li class="nav-item dropdown dropdown-user">
        <a @click.prevent="show_menu=!show_menu" class="nav-link dropdown-toggle dropdown-user-link"
            id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <div class="user-nav d-sm-flex d-none">
                <span class="user-name fw-bolder">
                    {{ get_auth_information.first_name }}
                    {{ get_auth_information.last_name }}
                </span>
                <span class="user-status">
                    {{ get_auth_information.user_name }}
                </span>
            </div>
            <span class="avatar">
                <img class="round"
                    src="/avatar.jpg"
                    alt="avatar" height="40" width="40">
                <span class="avatar-status-online"></span>
            </span>
        </a>
        <div :class="{show:show_menu}" class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
            <a class="dropdown-item" href="#">
                <i class="me-50" data-feather="user"> </i>
                Profile
            </a>
            <a class="dropdown-item" href="#">
                <i class="me-50" data-feather="mail"></i>
                Inbox
            </a>
            <a class="dropdown-item" href="#"><i class="me-50" data-feather="check-square"></i> Task</a>
            <a class="dropdown-item" href="#"><i class="me-50" data-feather="message-square"></i> Chats</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#"><i class="me-50" data-feather="settings"></i> Settings</a>
            <a class="dropdown-item" href="#"><i class="me-50" data-feather="credit-card"></i> Pricing</a>
            <a class="dropdown-item" href="#"><i class="me-50" data-feather="help-circle"></i> FAQ</a>
            <a class="dropdown-item" href="#"><i class="me-50" data-feather="power"></i> Logout</a>
        </div>
    </li>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data: function(){
        return {
            show_menu: false,
        }
    },
    computed: {
        ...mapGetters(['get_auth_information'])
    }
}
</script>

<style>

</style>
