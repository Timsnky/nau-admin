<template>
    <select
        class="form-control selectpicker"
        :disabled="options.length == 0">
        <option
            v-for="(option, index) in options"
            :key="option.id"
            :value="index"
            :selected="option.selected">
            {{ option.display_name }}
        </option>
    </select>
</template>

<script>
    export default {
        props: {
            users: Array,
            assignments: Array,
            newAssignment: {}
        },

        mounted() {
            const $selectpicker = $(this.$el);

            $selectpicker
                .selectpicker({
                    title: 'Select an author'
                })
                .on('changed.bs.select', () => this.$emit('selectAuthor', this.users[$selectpicker.val()]));
        },

        updated () {
            $(this.$el).selectpicker('refresh');
        },

        computed: {
            options() {
                const options = this.users.map(user => ({
                    id: user.id,
                    display_name: user.display_name,
                    selected: user.id === this.newAssignment.user_id
                }));

                return options;
            }
        },

        destroyed() {
            $(this.$el)
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
