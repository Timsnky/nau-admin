<template>
    <div class="input-group input-medium">
        <select class="form-control" v-model="selected">
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="option">
                {{ option.date }}
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

        data() {
            return {
                selected: null,
            }
        },

        watch: {
            selected(value) {
                this.$emit('changeWeek', value);
            }
        },

        computed: {
            options() {
                const options = [];
                let date = moment(`${this.week}-${this.year}`, 'WW-YYYY').subtract(2, 'week');

                for (let i = -2; i <= 8; i++) {
                    let option = {
                        date: date.format('[KW.] WW | DD.MM. - [' + date.clone().endOf('week').format('DD.MM.') + ']'),
                        year: date.year(),
                        week: date.week(),
                    };

                    options.push(option);

                    if(i === 0) {
                        this.selected = option;
                    }

                    date = date.add(1, 'week');
                }

                return options;
            }
        },
    }
</script>
