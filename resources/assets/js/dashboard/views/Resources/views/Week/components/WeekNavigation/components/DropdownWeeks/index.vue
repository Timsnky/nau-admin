<template>
    <div class="input-group input-medium">
        <select class="form-control selectpicker bs-select">
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="index"
                :selected="option.selected">
                {{ option.week }} - {{ option.year }}
            </option>
        </select>
        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
    </div>
</template>

<script>
    export default {
        props: {
            week: [String, Number],
            year: [String, Number],
        },

        mounted() {
            const $selectpicker = $(this.$el).find('.selectpicker');

            $selectpicker
                .selectpicker()
                .on('changed.bs.select', () => this.$emit('changeWeek', this.options[$selectpicker.val()]));
        },

        updated () {
            $(this.$el).find('.selectpicker').selectpicker('refresh');
        },

        computed: {
            options() {
                const options = [];
                let date = moment(`${this.week}-${this.year}`, 'WW-YYYY').subtract(2, 'week');

                for (let i = -2; i <= 20; i++) {
                    options.push({
                        year: date.year(),
                        week: date.week(),
                        selected: i === 0
                    });

                    date = date.add(1, 'week');
                }

                return options;
            }
        },

        destroyed() {
            $(this.$el).find('.selectpicker')
                .off()
                .selectpicker('destroy');
        }
    }
</script>

<style scoped>
    .selectpicker {
        z-index: 0 !important;
    }
</style>
