let date = new Date();

window.unique_str = () => {
    date = new Date();
    return (
        date.getYear() +
        "" +
        date.getMonth() +
        "" +
        date.getDay() +
        "" +
        date.getHours() +
        "" +
        date.getMinutes() +
        "" +
        date.getSeconds()
    );
};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

window.demo_data = () => {
    let inputs = [
        ...document.querySelectorAll('input[type="text"]'),
        ...document.querySelectorAll('input[type="email"]'),
        ...document.querySelectorAll('input[type="number"]'),
        ...document.querySelectorAll('input[type="password"]'),
        ...document.querySelectorAll('input[type="date"]'),
        ...document.querySelectorAll('input[type="time"]'),
        ...document.querySelectorAll("select"),
        ...document.querySelectorAll("textarea"),
    ];

    if (document.querySelectorAll('input[type="checkbox"]').length)
        document.querySelectorAll('input[type="checkbox"]')[0].checked = true;

    if (document.querySelectorAll('input[type="radio"]').length)
        document.querySelectorAll('input[type="radio"]')[0].checked = true;

    inputs.forEach((i) => {
        switch (i.type) {
            case "text":
                i.value = i.name + " " + unique_str();
                break;
            case "textarea":
                i.value = i.name + " " + unique_str();
                break;
            case "email":
                i.value = i.name + " " + unique_str() + "@gmail.com";
                break;
            case "number":
                i.value = unique_str();
                break;
            case "password":
                i.value = "12345678";
                break;
            case "select-one":
                let options = [...i.options];
                options.length > 0
                    ? (options.random().selected = true)
                    : (options[0].selected = true);
                break;
            case "date":
                i.value = `${date.getFullYear()}-${date
                    .getMonth()
                    .toString()
                    .padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;
                break;
            case "time":
                i.value = `${date.getHours().toString().padStart(2, "0")}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`;
                break;

            default:
                break;
        }
    });
};
