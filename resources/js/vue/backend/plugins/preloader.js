window.start_loader = function(){
    $('.loader').addClass('active');
    $('.load_amount h4').html(5);
    $('.progress').width(5+"%");
}

window.update_loader = function(progress){
    $('.loader').addClass('active');
    $('.load_amount h4').html(progress);
    $('.progress').width(progress+"%");
}

window.remove_loader = function(){
    $('.loader').removeClass('active');
    $('.load_amount h4').html(5);
    $('.progress').width(5+"%");
}
