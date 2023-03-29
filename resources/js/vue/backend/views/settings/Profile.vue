<template>
<div class="conatiner">
  <div class="row">
    <div class="col-md-8 mx-auto">
      <div class="card list_card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Update profile</h5>
            <small class="text-muted float-end">Update your profile info</small>
        </div>
        <div class="card-body">
            <form @submit.prevent="updateUser($event.target)">
                <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-fullname">first Name</label>
                    <div class="input-group input-group-merge">
                        <span id="basic-icon-default-fullname2" class="input-group-text"><i class="fa fa-user"></i></span>
                        <input type="text" name="first_name" :value="get_auth_information.first_name" class="form-control" id="basic-icon-default-fullname" placeholder="John Doe" aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-fullname">last Name</label>
                    <div class="input-group input-group-merge">
                        <span id="basic-icon-default-fullname2" class="input-group-text"><i class="fa fa-user"></i></span>
                        <input type="text" name="last_name" :value="get_auth_information.last_name" class="form-control" id="basic-icon-default-fullname" placeholder="John Doe" aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
                    </div>
                </div>
                
                <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-email">Email</label>
                    <div class="input-group input-group-merge">
                        <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                        <input type="text" name="email" :value="get_auth_information.email" id="basic-icon-default-email" class="form-control" placeholder="john.doe" aria-label="john.doe" aria-describedby="basic-icon-default-email2" />
                    </div>
                    <div class="form-text">You can use letters, numbers &amp; periods</div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-phone">Phone No</label>
                    <div class="input-group input-group-merge">
                        <span id="basic-icon-default-phone2" class="input-group-text"><i class="fa fa-phone"></i></span>
                        <input type="text" name="mobile_number" :value="get_auth_information.mobile_number" id="basic-icon-default-phone" class="form-control phone-mask" placeholder="658 799 8941" aria-label="658 799 8941" aria-describedby="basic-icon-default-phone2" />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary waves-effect waves-light mb-2">Update</button>
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
    data() {
      return {

        mssg: ''
      }
    },
    methods: {
        ...mapActions(['fetch_auth_information', 'update_user_info']),
        updateUser: async function(event) {
            let formData = new FormData(event);
            formData.append('id', this.get_auth_information.id);
            let data = {
                formData: formData,
                config: null
            }

            let res = await this.update_user_info(data)
            console.log(res.data.message);
            window.s_alert(res.data.message,'success');
        }
    },
    computed: {
        ...mapGetters(['get_auth_information'])
    },
    
    created: async function()  {
        await this.fetch_auth_information();
        // this.asset_count = this.get_auth_information.assets.length;
    },
}
</script>

