<template>
    <tr>
        <td>{{ idea.id }}</td>
        <td>
            <router-link :to="{name: 'ideas.show', params: {id: idea.id}}">
                {{ idea.title }}
            </router-link>
        </td>
        <td>{{ idea.author.name }}</td>
        <td>{{ idea.channel.display_name }}</td>
        <td>{{ date }}</td>
        <td class="text-right">
            <router-link
                :to="{name: 'ideas.show', params: {id: idea.id}}"
                class="btn blue">
                Anzeigen
            </router-link>
            <div class="btn-group">
                <router-link
                    :to="{name: 'ideas.edit', params: {id: idea.id}}"
                    class="btn default">
                    <i class="fa fa-edit"></i> Bearbeiten
                </router-link>
                <button
                    class="btn red"
                    type="button"
                    @click="handleDeleteIdea">
                    <i class="fa fa-trash"></i>
                </button>
            </div>




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
