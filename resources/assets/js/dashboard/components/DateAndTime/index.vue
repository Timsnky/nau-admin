<template>
    <div class="input-group">
        <input
                id="dateTimePicker"
                type="text"
                name="date"
                :value="date"
                class="form-control">
        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
    </div>
</template>

<script>
    export default {
        props: {
            date: String
        },

        mounted() {
            let vm = this;

            $(function() {
                let $today = new Date();
                $today.setHours(0,0,0);

                $('#dateTimePicker').datetimepicker({
                    minDate: $today,
                    format: 'YYYY-MM-DD HH:mm'
                }).on("dp.change", function (e)
                {
                    if(e.date)
                    {
                        vm.$emit('changeDate', e.date.format());
                    }
                    else
                    {
                        vm.$emit('changeDate', '');
                    }
                });
            });
        },

        destroyed()
        {
            $('#dateTimePicker').off().datetimepicker('destroy');
        }
    }
</script>
<style>
    #dateTimePicker {
        z-index: auto;
    }
</style>
