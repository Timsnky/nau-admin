<template>
    <div>
        <page-title title="Foldermaster" sub="Auswählen" />

        <div class="form-group">
            <multiselect
                v-model="selected"
                :options="authors"
                placeholder="Type to search author"
                label="name"
                :max-height="500"
                :close-on-select="true"
                :allow-empty="false"
                track-by="id"
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
                selected: null,
            };
        },

        computed: {
            foldermaster() {
                return this.$store.state.foldermaster;
            }
        },

        mounted() {
            this.selected = this.foldermaster
        },

        methods: {
           searchAuthors: _.debounce(function (query) {
                if(!query) {
                    return false;
                }

                Api.http
                    .get(`/authors?search=${query}`)
                    .then(response => {
                        this.authors = response.data;
                    });
            }, 500),

            async save() {
                await this.$store.dispatch('SET_FOLDERMASTER', this.selected.id);

                Vue.toast('Foldermaster wurde gesetzt', {
                    className: ['nau_toast', 'nau_success'],
                });
            },
        }
    }
</script>
