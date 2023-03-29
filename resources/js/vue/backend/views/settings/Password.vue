<template>
  <div class="conatiner">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card list_card">
            <div class="card-header">
              <h5>Change Password</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="changePassword($event.target)">
                  <div class="row">
                      <div class="mb-3 col-md-6 form-password-toggle fv-plugins-icon-container">
                          <label class="form-label" for="currentPassword">Current Password</label>
                          <div class="form-group">
                              <input class="form-control" type="password" name="old_password" id="currentPassword" placeholder="············" />
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="mb-3 col-md-6 form-password-toggle fv-plugins-icon-container">
                          <label class="form-label" for="newPassword">New Password</label>
                          <div class="form-group">
                              <input class="form-control" type="password" name="newpassword" placeholder="············" />
                          </div>
                          
                      </div>

                      <div class="mb-3 col-md-6 form-password-toggle fv-plugins-icon-container">
                          <label class="form-label" for="confirmPassword">Confirm New Password</label>
                          <div class="form-group">
                              <input class="form-control" type="password" name="newpassword_confirmation" id="confirmPassword" placeholder="············" />
                          </div>
                      </div>
                      <div class="col-12 mb-4">
                          <h6>Password Requirements:</h6>
                          <ul class="ps-3 mb-0">
                              <li class="mb-1">Minimum 8 characters long - the more, the better</li>
                              <li class="mb-1">At least one lowercase character</li>
                              <li>At least one number, symbol, or whitespace character</li>
                          </ul>
                      </div>
                      <div class="mb-3">
                          <button type="submit" class="btn btn-primary me-2 waves-effect waves-light">Save changes</button>
                          <button type="reset" class="btn btn-secondary ">Cancel</button>
                      </div>
                  </div>
                  
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    methods: {
        ...mapActions(['change_password']),
        changePassword: async function(event) {
            let formData = new FormData(event);
            
            let res = await this.change_password(formData);
            event.reset();
            window.s_alert(res.data.message, 'success');
        },
    },
}
</script>

<style>

</style>
