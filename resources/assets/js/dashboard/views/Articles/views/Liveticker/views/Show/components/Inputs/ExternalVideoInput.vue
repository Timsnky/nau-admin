<template>
    <div>
        <div class="form-group">
            <label for="url">URL</label>
            <input type="url" v-model="element.url" id="url" class="form-control" placeholder="https://streamable.com/1535 / https://www.youtube.com/watch?v=XB2g7-HgE_g"></input>
        </div>

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="element.name" id="name" class="form-control" placeholder="Name"></input>
        </div>

        <div class="form-group">
            <label for="lead">Lead</label>
            <input type="text" v-model="element.lead" id="lead" class="form-control" placeholder="Lead"></input>
        </div>

        <div class="form-group">
            <label for="alt">Bildbeschreibung</label>
            <input type="text" v-model="element.alt" id="alt" class="form-control" placeholder="Bildbeschreibung"></input>
        </div>

        <div class="form-group">
            <button :disabled="!(element.url && element.name && element.lead)" type="button" class="btn btn-primary" @click="post">Posten</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                element: {
                    'name': '',
                    'alt': '',
                    'lead': '',
                    'url': '',
                },
            }
        },

        methods: {
            post() {
                Api.http
                    .post(`/external-videos`, this.element).then(response => {
                        var element = response.data;

                        Api.http
                            .put(`/livetickers/${this.$route.params.article}/external-videos/${element.id}`)
                            .then(response => {
                                this.$emit('new-post');
                                Vue.toast('Liveticker wurde erstellt', {
                                    className : ['nau_toast','et-info'],
                                });
                            });
                    });
            },
        },
    }
</script>
