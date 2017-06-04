<template>
    <div class="input-group date">
        <input
            type="text"
            name="date"
            v-model="date"
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
            const $datetime = $('input[name="date"]');

            $datetime
                .datepicker({
                    format: "yyyy-mm-dd",
                    orientation: "bottom left",
                    autoclose: true,
                    toggleActive: true
                })
                .on("changeDate", () => {
                        this.$emit('changeDate', $datetime.val());
                    }
                );
        },
    }
</script>
