<template>
    <select class="form-control" v-model="selected">
        <option disabled :value="null">Benutzer wählen</option>
        <option v-for="user in users" :value="user">
            {{ user.name }}
        </option>
    </select>
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
