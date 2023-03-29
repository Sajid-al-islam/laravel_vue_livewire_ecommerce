<template>
    <li class="nav-item dropdown dropdown-notification me-25">
        <a @click.prevent="show_menu=!show_menu" class="nav-link" href="#" data-bs-toggle="dropdown">
            <i class="fa fa-bell"></i>
            <span class="badge rounded-pill bg-danger badge-up">5</span>
        </a>
        <ul :class="{show:show_menu}" class="dropdown-menu dropdown-menu-media dropdown-menu-end">
            <li class="dropdown-menu-header">
                <div class="dropdown-header d-flex">
                    <h4 class="notification-title mb-0 me-auto">Notifications</h4>
                    <div class="badge rounded-pill badge-light-primary">6 New</div>
                </div>
            </li>
            <li class="scrollable-container media-list">
                <a class="d-flex" href="#">
                    <div class="list-item d-flex align-items-start">
                        <div class="me-1">
                            <div class="avatar">
                                <img src="/avatar.jpg" alt="avatar" width="32" height="32" />
                            </div>
                        </div>
                        <div class="list-item-body flex-grow-1">
                            <p class="media-heading">
                                <span class="fw-bolder">Congratulation Sam 🎉</span>
                                winner!
                            </p>
                            <small class="notification-text"> Won the monthly best seller badge.</small>
                        </div>
                    </div>
                </a>
            </li>
            <li class="dropdown-menu-footer"><a class="btn btn-primary w-100" href="#">Read all notifications</a></li>
        </ul>
    </li>

</template>

<script>
export default {
    data: function(){
        return {
            show_menu: false,
        }
    }
}
</script>

<style>

</style>
