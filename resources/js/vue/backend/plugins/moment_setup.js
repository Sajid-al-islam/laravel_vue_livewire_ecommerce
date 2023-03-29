import moment from "moment";

window.moment = moment;

window.formatDate = (date, format_type="date") => {
    if(format_type == 'date'){
        return moment(date).format('DD-MMMM-YYYY')
    }else if(format_type == 'date_time'){
        return moment(date).format('DD-MMMM-YYYY hh:mm:ss A')
    }else if(format_type == 'time'){
        return moment(date).format('hh:mm:ss A')
    }else{
        return moment(date).format(format_type)
    }
}
