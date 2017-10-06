<template>
    <div>
        <page-title title="Foldermaster" sub="Auswählen" />

        <div class="form-group">
            <multiselect
                v-model="master"
                :options="authors"
                placeholder="Type to search author"
                label="name"
                :max-height="500"
                :clear-on-select="false"
                :close-on-select="true"
                track-by="id"
                :multiple="false"
                open-direction="bottom"
                :internal-search="false"
                @search-change="searchAuthors"
            />
        </div>

        <button type="button" @click="save" class="btn btn-primary">Speichern</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                authors: [],
                master: null,
            };
        },

        async created() {
            this.master = (await Api.http.get('/foldermaster')).data.user;
        },

        methods: {
           searchAuthors: _.debounce(function (query) {
                if(!query) {
                    return false;
                }

                Api.http
                    .get(`/authors?search=${query}`)
                    .then(response => {
                        this.authors.list = response.data;
                    });
            }, 500),

            save() {
                Api.http.put('/foldermaster', {
                    user_id: this.master.id,
                }).then(() => {
                    Vue.toast('Foldermaster wurde gesetzt', {
                        className: ['nau_toast', 'nau_success'],
                    });
                }).catch(() => {
                    Vue.toast('Foldermaster konnte nicht gesetzt werden', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                });
            },
        }
    }
</script>
