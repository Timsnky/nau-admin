<template>
    <select
        class="form-control selectpicker"
        :disabled="options.length == 0">
        <option
            v-for="option in options"
            :key="option.id"
            :value="option.id"
            :selected="option.selected">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
    export default {
        props: {
            users: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            assignments: {
                type: Array,
                default: function() {
                    return [];
                }
            },
        },

        mounted() {
            const $selectpicker = $(this.$el);

            $selectpicker
                .selectpicker({
                    title: 'Select an author'
                })
                .on('changed.bs.select', () => this.$emit('selectAuthor', $selectpicker.val()));
        },

        updated () {
            $(this.$el).selectpicker('refresh');
        },

        computed: {
            options() {
                const assignmentsArray = this.assignments.map(assignment => assignment.user_id);

                return this.users.map(user => ({
                    ...user,
                    selected: assignmentsArray.includes(user.id)
                }));
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
