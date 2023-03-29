<template>
    <div class="canvas_backdrop" :class="{active:get_user_show_selected}" @click="$event.target.classList.contains('canvas_backdrop') && set_show_selected(false)">
        <div class="content right" v-if="get_user_selected">
            <div class="content_header">
                <h3 class="offcanvas-title">Selected Users</h3>
                <i @click="set_show_selected(false)" class="fa fa-times"></i>
            </div>
            <div class="cotent_body table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>id</th>
                            <th>name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item,index in get_user_selected" :key="item.id">
                            <td>
                                <button @click.prevent="set_clear_selected_single_user(index)" class="btn btn-outline-danger">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                            <td>{{ item.id }}</td>
                            <td>
                                {{ item.first_name }}
                                {{ item.last_name }}
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
        ...mapMutations([
            'set_show_selected',
            'set_clear_selected_single_user'
        ]),
    },
    computed: {
        ...mapGetters([
            'get_user_show_selected',
            'get_user_selected',
        ])
    }
}
</script>

<style>

</style>
