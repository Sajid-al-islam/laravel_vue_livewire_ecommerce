<template>
    <div class="canvas_backdrop" :class="{active:get_user}" @click="$event.target.classList.contains('canvas_backdrop') && set_user(null)">
        <div class="content right" v-if="get_user">
            <div class="content_header">
                <h3 class="offcanvas-title">User Details</h3>
                <i @click="set_user(null)" class="fa fa-times"></i>
            </div>
            <div class="cotent_body">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Id</td>
                            <td>:</td>
                            <td>{{ get_user.id }}</td>
                        </tr>
                        <tr>
                            <td>first name</td>
                            <td>:</td>
                            <td>{{ get_user.first_name }}</td>
                        </tr>
                        <tr>
                            <td>last name</td>
                            <td>:</td>
                            <td>{{ get_user.last_name }}</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>:</td>
                            <td>{{ get_user.email }}</td>
                        </tr>
                        <tr>
                            <td>mobile number</td>
                            <td>:</td>
                            <td>{{ get_user.mobile_number }}</td>
                        </tr>
                        <tr>
                            <td>created at</td>
                            <td>:</td>
                            <td>{{ new Date(get_user.created_at).toLocaleString() }}</td>
                        </tr>
                        <tr>
                            <td>photo</td>
                            <td>:</td>
                            <td>
                                <img :src="get_user.photo_url" height="120px" alt="user profile">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations(['set_user']),
    },
    computed: {
        ...mapGetters(['get_user'])
    }
}
</script>

<style>

</style>
