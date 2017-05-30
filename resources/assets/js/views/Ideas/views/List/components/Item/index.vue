<template>
    <tr>
        <td>{{ idea.id }}</td>
        <td>{{ date }}</td>
        <td>{{ idea.title }}</td>
        <td>{{ idea.author.display_name }}</td>
        <td>
            <router-link
                :to="{name: 'ideas.show', params: {id: idea.id}}"
                class="btn btn-success">
                Show
            </router-link>
            <router-link
                :to="{name: 'ideas.edit', params: {id: idea.id}}"
                class="btn btn-warning">
                Edit
            </router-link>
            <button
                class="btn btn-danger"
                type="button"
                @click="handleDeleteIdea">
                Delete
            </button>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            idea: Object,
            index: Number,
        },

        computed: {
            date() {
                return moment(this.idea.created_at).format('DD.MM.YYYY');
            }
        },

        methods: {
            handleDeleteIdea() {
                this.$emit('deleteIdea', this.idea);
            }
        }
    }
</script>
