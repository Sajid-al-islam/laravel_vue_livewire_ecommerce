<template>
    <div class="container">
        <div class="card list_card">
            <div class="card-header no_print">
                <h4>Email invoice</h4>
            </div>
            <form @submit.prevent="send_invoice_email($event.target)" autocomplete="false" class="email_sending_form">
            <div class="card-body">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <label for="email_invoice mb-2">Add emails</label>
                        <div class="admin_form form_1" v-for="(email_data, index) in get_email_data" :key="index">
                            <div class="form-group d-grid align-content-start gap-1 mb-2">
                                <div class="d-flex align-items-center">
                                    <input type="text" class="form-control invoice_email" v-model="email_data.email" id="email_invoice">
                                    <input type="hidden" :value="order_id" name="order_id">
                                    <div class="justify-content-between">
                                        <div class="d-flex"> 
                                            <button class="btn btn-sm btn-outline-primary justify-content-between add_btn_email" @click.prevent="add_email_for_invoice(index)">
                                                <i class="fa-solid fa-plus"></i>
                                            </button>
                                            <button v-if="get_email_data.length > 1" class="btn btn-sm btn-outline-danger justify-content-between remove_btn_email" @click.prevent="remove_email_for_invoice(index)">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-center">
                <button type="submit" class="btn btn-outline-info" >
                    <i class="fa fa-upload"></i>
                    Submit
                </button>
            </div>
            </form>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            order_id: null
        }
    },
    methods: {
        // Getting the actions
        ...mapActions([
            'add_email_for_invoice',
            'remove_email_for_invoice',
            'send_invoice_email'
        ]),
        
    },
    created: async function()  {
        this.order_id = this.$route.params.id;
        console.log(this.order_id);
    },
    computed: {
        // mapping the getters
        ...mapGetters([
            'get_email_data',
        ]),

    },
    watch : {
       
       
    },
   
}
    
</script>
<style scoped>
.invoice_email {
    margin-right: 10px !important;
}
.add_btn_email {
    margin-right: 10px !important;
}
</style>