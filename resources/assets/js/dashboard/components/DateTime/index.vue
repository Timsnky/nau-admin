<template>
    <div class="input-group">
        <input
            ref="datepicker"
            type="text"
            name="date"
            :value="formattedDate"
            :placeholder="placeholder || formattedToday"
            class="form-control">
        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
    </div>
</template>

<script>
    export default {
        props: {
            value: '',
            format: {
                type: String,
                default: 'YYYY-MM-DD'
            },
            minDate: String,
            placeholder: String,
        },

        computed: {
            formattedDate() {
                return this.formatDate(this.value);
            },
            formattedToday() {
                return this.formatDate(moment());
            }
        },

        mounted() {
            var {minDate, format} = this;

            $(() => {
                $(this.$refs.datepicker).datetimepicker({
                    minDate,
                    format
                }).on("dp.change", (e) => {
                    this.$emit('input', e.date);
                });
            });
        },

        watch: {
            value(date) {
                if(date._isAMomentObject) {
                    return;
                }

                this.$emit('input', this.getMoment(date));
            }
        },

        methods: {
            getMoment(date) {
                if(!date) {
                    return null;
                }

                if(!date._isAMomentObject)  {
                    date = moment(date);
                }

                return date;
            },

            formatDate(date) {
                if(!date) {
                    return null;
                }

                return this.getMoment(date).format(this.format);
            }
        },

        destroyed() {
            $(this.$refs.datepicker).off().datetimepicker('destroy');
        }
    }
</script>

<style scoped>
    .input-group .form-control {
        z-index: auto !important;
    }
</style>
