<template>
    <div class="watch">
        <div class="title">left time</div>:
        <div class="min ms-3">{{left_time_min}}</div>:
        <div class="sec">{{left_time_sec}}</div>
        <div class="meridian">min</div>
    </div>
</template>

<script>
export default {
    created: function(){
        this.update_left_time();
    },
    data: function(){
        return {
            left_time_min: '00',
            left_time_sec: '00',
        }
    },
    methods: {
        update_left_time: function(){
            let that = this;
            setInterval(() => {
                let diff = ( 60000 * window.auto_logout_time ) - window.sessionStorage.getItem('idle_time');
                that.left_time_min = moment.utc(diff).format('mm');
                that.left_time_sec = moment.utc(diff).format('ss');
            }, 1000);
        },
    }
}
</script>

<style>

</style>
