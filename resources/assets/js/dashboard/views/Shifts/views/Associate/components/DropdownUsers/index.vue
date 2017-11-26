<template>
    <div>
        <multiselect
            v-model="selected"
            placeholder="Benutzer wählen"
            :options="users"
            label="name"
        />
    </div>
</template>

<script>
    export default {
        props: {
            users: Array,
            value: Object,
        },

        data() {
            return {
                selected: null,
            };
        },

        watch: {
            selected(value) {
                this.$emit('input', value);
            },

            value(value) {
                if(this.selected != value) {
                    this.selected = value;
                }
            }
        },

        created() {
            this.selected = this.value;
        }
    }
</script>
