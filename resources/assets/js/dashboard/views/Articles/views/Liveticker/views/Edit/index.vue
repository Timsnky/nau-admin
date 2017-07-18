<template>
    <div>
        <page-title title="Articles" sub-title="Liveticker bearbeiten" />

        <div class="form-group">
            <textarea v-model="liveticker.content" class="form-control" rows="10"></textarea>
        </div>

        <div class="form-group">
            <button type="button" class="btn btn-success" @click="submit">Bearbeiten</button>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                liveticker: {}
            }
        },

        created() {
            Api.http
                .get(`/livetickers/${this.$route.params.liveticker}`)
                .then(response => this.liveticker = response.data);
        },

        methods: {
            submit()  {
                const { content } = this.liveticker;

                Api.http
                    .put(`/livetickers/${this.$route.params.liveticker}`, { content })
                    .then(response => {
                        Vue.toast('Liveticker wurde bearbeitet', {
                            className : ['nau_toast','et-info'],
                        });
                        this.$router.push({name: 'articles.livetickers', 'params': {article: this.$route.params.article}});
                    });
            }
        }
    }
</script>
