window.init_preview_image = () =>{
    $('input[type="file"]').off().on('change',function(e){
        let check = $(this).next()[0]?.tagName;
        if(check === 'IMG'){
            $(this).next().attr('src', URL.createObjectURL(e.target.files[0]) );
        }else{
            $(`
                <img class="img-thumbnail my-3 d-block" style="height: 50px;" src="${URL.createObjectURL(e.target.files[0])}" alt="">
            `).insertAfter($(this));
        }
    })
}
