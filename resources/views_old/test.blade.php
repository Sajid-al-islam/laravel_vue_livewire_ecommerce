
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <style>
        body {
            margin: 0;
        }

        #app {
            background-color: #161d31;
            height: 100vh;
            overflow: hidden;
            display: grid;
            justify-content: center;
            align-items: center;
        }

        .content {
            width: 350px;
            max-width: calc(100vw - 30px);
            height: calc(100vh - 100px);
            max-height: 600px;
            background: #283046;
            border-radius: 15px;
            text-align: center;
            font-family: sans-serif;
            box-sizing: border-box;
            padding: 15px;
        }

        .time{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3px;
        }
        #hour,#min,#sec,#med{
            background-color: #343d55;
            color: white;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 5px;
        }
        .profile{
            display: flex;
            gap: 20px;
            align-items: center;
            text-transform: capitalize;
            justify-content: center;
        }
        .profile .img{
            height: 60px;
            width: 60px;
            border-radius: 50%;
            padding: 5px;
            overflow: hidden;
        }
        .profile .img img{
            max-width: 100%;
            border-radius: 50%;
        }
        .data_list{
            height: 123px;`
            border: 1px solid;
            overflow-y: scroll;
            font-size: 11px;
        }
    </style>
</head>

<body onload="initMap()">

    <div id="app">
        <div class="content text-info">
            <h1>Tech Park IT</h1>
            <h3>Attendance</h3>
            <hr>
            <h4 id="day"></h4>

            <div class="time">
                <div id="hour">12</div>
                <span>:</span>
                <div id="min">20</div>
                <span>:</span>
                <div id="sec">30</div>
                <span>:</span>
                <div id="med">PM</div>
            </div>

            <div class="profile mt-4">
                <div class="border img border-info">
                    <img src="https://techparkit.org/uploads/users/2022/02/image4-2022_02_10_11_59_55.jpg" alt="">
                </div>
                <h4>
                    shefat
                </h4>
            </div>

            <h4 class="border border-info rounded p-3 my-4 rounded-sm">
                <span id="my_distance"></span> meeters away
            </h4>

            <ul>
                <li>office in: 05:06:43 pm</li>
                <li>office out: 05:09:44 pm</li>
            </ul>

            <hr>
            <div class="data_list">
                <table class="table text-info">
                    <tr>
                        <td style="width:90px;">29-Nov</td>
                        <td>
                            05:06 pm
                            TO
                            05:09 pm
                        </td>
                    </tr>
                    <tr>
                        <td style="width:90px;">28-Nov</td>
                        <td>
                            03:28 pm
                            TO
                            03:28 pm
                        </td>
                    </tr>
                    <tr>
                        <td style="width:90px;">27-Nov</td>
                        <td>
                            03:28 pm
                            TO
                            03:28 pm
                        </td>
                    </tr>
                    <tr>
                        <td style="width:90px;">26-Nov</td>
                        <td>
                            03:28 pm
                            TO
                            03:28 pm
                        </td>
                    </tr>
                    <tr>
                        <td style="width:90px;">25-Nov</td>
                        <td>
                            03:28 pm
                            TO
                            03:28 pm
                        </td>
                    </tr>
                    <tr>
                        <td style="width:90px;">24-Nov</td>
                        <td>
                            03:28 pm
                            TO
                            03:28 pm
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <create link="adsfja" text="asdf">
        <a href=""vei></a>
    </create>

    auh.preca

    <script>
        window.addEventListener('DOMContentLoaded', (event) => {
            day.innerHTML = moment().format('DD-MMM-Y dddd');
            setInterval(() => {
                hour.innerHTML = moment().format('hh');
                min.innerHTML = moment().format('mm');
                sec.innerHTML = moment().format('ss');
                med.innerHTML = moment().format('a');
            }, 1000);
        });
    </script>

    <!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXfyI7osFNUJSHyOUZU6nTK8hUSe4Z0mY&callback=initMap"-->
    <!--    defer></script>-->

    <script>
        var pos;
        function initMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    user_lat_js.innerHTML = pos.lat;
                    user_lan_js.innerHTML = pos.lng;
                    let distance = findDistance(23.809861231612796, 90.36154818440077, pos.lat, pos.lng);

                    if(document.getElementById('office_in')){
                        office_in.href = "/in-submit?distance="+distance;
                        if(distance > 100 ){
                            office_in.remove();
                            warning.innerHTML="you are not in 100 meter from office."
                        }
                    }

                    if(document.getElementById('office_out')){
                        office_out.href = "/out-submit?distance="+distance;
                    }

                    my_distance.innerHTML = distance.toFixed(2);
                    console.log(pos, distance);

                }, function() {
                    // handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {

            }
        }
    </script>

    <script>
        // findDistance(23.809861231612796, 90.36154818440077, 23.7104, 90.4074);

        function findDistance(lat1, lon1, lat2, lon2) {
            var R = 6371e3; // R is earth’s radius
            // var lat1 = 23.18489670753479; // starting point lat
            // var lat2 = 32.726601;         // ending point lat
            // var lon1 = 72.62524545192719; // starting point lon
            // var lon2 = 74.857025;         // ending point lon
            var lat1radians = toRadians(lat1);
            var lat2radians = toRadians(lat2);

            var latRadians = toRadians(lat2-lat1);
            var lonRadians = toRadians(lon2-lon1);

            var a = Math.sin(latRadians/2) * Math.sin(latRadians/2) +
                    Math.cos(lat1radians) * Math.cos(lat2radians) *
                    Math.sin(lonRadians/2) * Math.sin(lonRadians/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            var d = R * c;

            return d;
        }

        function toRadians(val){
            var PI = 3.1415926535;
            return val / 180.0 * PI;
        }
    </script>
</body>

</html>
