window.set_form_data = function (selector, data) {

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];
            let input = document.querySelector(`${selector} input[name="${key}"]`);
            let select = document.querySelector(`${selector} select[name="${key}"]`);
            let textarea = document.querySelector(`${selector} textarea[name="${key}"]`);

            if(input){
                if(['text','email','number','date','time'].includes(input.type)){
                    input.value = (value);
                }
                if(input.type == 'file'){
                    document.querySelector('.file_preview').innerHTML = `<img src="${data[key+'_url']}" />`
                }
            }
            if(select){
                select.value = (value);
            }
            if(textarea){
                textarea.value = (value);
            }
        }
    }

};
