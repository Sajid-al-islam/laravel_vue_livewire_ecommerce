<template>
    <li>
        <div class="watch to_nav_watch">
            <div class="hour">{{hour}}</div>:
            <div class="min">{{min}}</div>:
            <div class="sec">{{sec}}</div>
            <div class="meridian">{{meridian}}</div>
        </div>
    </li>
</template>

<script>
export default {
    created: function(){
        setInterval(() => {
            this.hour = moment().format('hh');
            this.min = moment().format('mm');
            this.sec = moment().format('ss');
            this.meridian = moment().format('a');
        }, 1000);
    },
    data: function () {
        return {
            hour:null,
            min: null,
            sec: null,
            meridian: null,
        }
    }
}
</script>

<style>

</style>
