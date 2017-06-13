<template>
    <div class="input-group">
        <input
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
            const $datepicker = $(this.$el).find('input');

            $datepicker
                .datepicker({
                    format: "yyyy-mm-dd",
                    orientation: "bottom left",
                    autoclose: true,
                    weekStart: 1
                })
                .on("changeDate", () => this.$emit('changeDate', $datepicker.val()));
        },

        watch: {
            date(value) {
                const $datepicker = $(this.$el).find('input');

                $datepicker.datepicker('setDate', value);
            }
        },

        destroyed() {
            $(this.$el).find('input')
                .off()
                .datepicker('destroy');
        }
    }
</script>
