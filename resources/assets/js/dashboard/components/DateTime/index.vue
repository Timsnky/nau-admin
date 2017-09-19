<template>
    <div class="input-group">
        <input
            ref="datepicker"
            type="text"
            name="date"
            :value="date"
            placeholder="2017-08-05"
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
                var today = new Date();
                var yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                $(vm.$refs.datepicker).datetimepicker({
                    minDate: yesterday,
                    format: 'YYYY-MM-DD'
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
            $(this.$refs.datepicker).off().datetimepicker('destroy');
        }
    }
</script>
<style>
    #dateTimePicker {
        z-index: auto;
    }
</style>
