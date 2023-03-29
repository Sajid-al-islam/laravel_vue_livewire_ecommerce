// state list
const state = {
    emails: [
        {
            email: ""
        }
    ],
};

// get state
const getters = {
    get_email_data: state => state.emails,
};

// actions

const actions = {
    add_email_for_invoice: function (context, email) {
        context.state.emails.push({
            email: "",
        });
    },
    remove_email_for_invoice: function(context, index) {
        context.state.emails.splice(index, 1)
    },
    send_invoice_email: async function (context, params) {
        const {form_values, form_inputs, form_data} = window.get_form_data(`.email_sending_form`);
        form_data.append("emails", JSON.stringify(context.state.emails));
        let res = await axios.post('/order/send_emails', form_data);
        window.s_alert(res.data);
    }
}

// mutators
const mutations = {
    
};


export default {
    state,
    getters,
    actions,
    mutations,
};
