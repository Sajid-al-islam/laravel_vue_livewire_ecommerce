import moment from "moment";
import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.headers.common["Authorization"] = `Bearer ${window.localStorage?.token}`;
axios.defaults.baseURL = location.origin + '/api/v1';

axios.interceptors.request.use(function (config) {
    $('.loader_body').addClass('active');
    $('.loader_body').css({'top': $('.main_content').scrollTop()});
    $('#backend_body .main_content').css({overflowY:'hidden !mportant'});
    $('form button').prop('disabled',true);
    Pace?.restart();

    window.count_left_time_sec = 1;

    sessionStorage.setItem('last_time',moment().format("DD/MM/YYYY HH:mm:ss"));
    localStorage.setItem('last_time',new moment());

    return {
        ...config,
        // onUploadProgress,
        // onDownloadProgress,
    };
}, function (error) {
    // Do something with request error
    console.log('request error');
    return Promise.reject(error);
});

window.remove_form_action_classes = function() {
    $('.loader_body').removeClass('active');
    $('input,select,textarea').removeClass('border-warning');
    $('form button').prop('disabled',false);
    $(`.error.text-warning`).remove();
}

window.render_form_errors = function(object, selector="name") {
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            let el = document.querySelector(`input[${selector}="${key}`);
            if (!el) {
                el = document.getElementById(`${key}`);
            }

            /**
             *  if html element found then take action
             */
            if(el){
                $(`<div class="error text-warning">${element[0]}</div>`).insertAfter(el);
                el.classList.add('border-warning')
            }
        }
    }
}

window.axios.interceptors.response.use(
    (response) => {
        remove_form_action_classes();
        return response;
    },
    (error) => {
        remove_form_action_classes();
        let object = error.response?.data?.errors;
        render_form_errors(object);

        if (typeof error ?.response ?.data === "string") {
            console.log("error", error?.response?.data ? error?.response?.data : error.response);
        } else {
            // console.log(error.response);
        }

        // if(error.response.status == 401){
        //     window.clear_session();
        // }
        // console.log(error);
        let status = error.response.status;
        window.s_alert('error '+status+': '+error.response?.statusText,'error')
        throw error;
    }
);
