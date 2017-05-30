<template>
    <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ idea.date }}</td>
        <td>{{ idea.title }}</td>
        <td>{{ idea.author }}</td>
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

        methods: {
            handleDeleteIdea() {
                this.$emit('deleteIdea', this.idea);
            }
        }
    }
</script>
