<template>
    <div class="container">
        <div class="card list_card">
            <div class="card-header">
                <h4>Edit</h4>
                <div class="btns">
                    <a href="" @click.prevent="set_user(null), $router.push({ name: 'AllUser' })"  class="btn rounded-pill btn-outline-warning" >
                        <i class="fa fa-arrow-left me-5px"></i>
                        <span >
                            Back
                        </span>
                    </a>
                </div>
            </div>
            <form @keyup.enter="update_user" class="user_edit_form">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="admin_form form_1">
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <div>
                                        <label class="mb-2 text-capitalize">
                                            Select user role
                                        </label>
                                        <role-management-modal></role-management-modal>
                                    </div>
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`First Name`"
                                        :name="`first_name`"
                                    />
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Last Name`"
                                        :name="`last_name`"
                                    />
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`User Name`"
                                        :name="`user_name`"
                                    />
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Email`"
                                        :type="`email`"
                                        :name="`email`"
                                    />
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Mobile Number`"
                                        :name="`mobile_number`"
                                    />
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Password`"
                                        :type="`password`"
                                        :name="`password`"
                                    />
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`confirm password`"
                                        :type="`password`"
                                        :name="`password_confirmation`"
                                    />
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="'photo'"
                                        :name="`photo`"
                                        :type="`file`"
                                        :accept="'image/*'"
                                        :multiple="true"
                                        :preview="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button type="button" @click.prevent="update_user" class="btn btn-outline-info" >
                        <i class="fa fa-upload"></i>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import RoleManagementModal from '../user_roles/components/ManagementModal.vue'
export default {
    components: { RoleManagementModal },
    created: function () {
        this.fetch_user({id: this.$route.params.id, render_to_form: true})
    },
    methods: {
        ...mapActions([
            'update_user',
            'fetch_user',
        ]),
        ...mapMutations([
            'set_user'
        ]),
    },
};
</script>

<style>
</style>
