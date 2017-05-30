<template>
    <div>
        <page-title title="Show Idea" sub="sub heading"></page-title>

        <form>
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <div id="title" class="form-control-static">{{ idea.title }}</div>
                </div>

                <div class="form-group">
                    <label for="text">Text</label>
                    <div id="text" class="form-control-static">{{ idea.text }}</div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                idea: {},
            }
        },

        mounted() {
            axios
                .get(`https://api-naut.livesystems.ch/ideas/${this.$route.params.id}`)
                .then(response => {
                    this.idea = response.data;
                })
                .catch(err => console.log('Show some error message here'));
        }
    }
</script>
