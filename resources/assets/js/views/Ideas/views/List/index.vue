<template>
    <div>
        <page-title title="All Ideas" sub="sub heading"></page-title>
        <div class="table-scrollable" v-if="ideas.length > 0">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                <item
                    v-for="(idea, index) in ideas"
                    :key="idea.id"
                    :index="index"
                    :idea="idea"
                    @deleteIdea="deleteIdea"/>
                </tbody>
            </table>
        </div>
        <h2 v-else class="text-center">No ideas found</h2>
    </div>
</template>
<script>
    import Item from './components/Item';

    export default {
        data() {
            return {
                ideas: []
            }
        },

        mounted() {
            axios
                .get('https://api-naut.livesystems.ch/ideas')
                .then(response => this.ideas = response.data)
                .catch(err => console.log('Show some error message here'));
        },

        components: {
            item: Item
        },

        methods: {
            deleteIdea(idea) {
                this.ideas = this.ideas.filter(item => item.id !== idea.id);

                axios
                    .delete(`https://api-naut.livesystems.ch/ideas/${idea.id}`)
                    .then(response => console.log(response))
                    .catch(err => console.log('Show some error message here'));
            }
        }
    }
</script>
