<template>
    <div>
        <page-title title="Master Verwaltung" />

        <div class="form-group">
            <label>Foldermaster</label>
            <multiselect
                v-model="foldermaster"
                :options="authors"
                placeholder="Person suchen"
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

        <div class="form-group">
            <label>Live Director</label>
            <multiselect
                v-model="liveDirector"
                :options="authors"
                placeholder="Person suchen"
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

        <div class="form-group">
            <label>Chamäleon</label>
            <multiselect
                v-model="chameleon"
                :options="authors"
                placeholder="Person suchen"
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

        <button type="button" @click="save" class="btn blue"><i class="fa fa-floppy-o"></i> Speichern</button>
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
            foldermaster: {
                get: function () {
                    return this.$store.state.foldermaster;
                },
                set: function (user) {
                    this.$store.commit('SET_FOLDERMASTER', user);
                }
            },

            liveDirector: {
                get: function () {
                    return this.$store.state.liveDirector;
                },
                set: function (user) {
                    this.$store.commit('SET_LIVE_DIRECTOR', user);
                }
            },

            chameleon: {
                get: function () {
                    return this.$store.state.chameleon;
                },
                set: function (user) {
                    this.$store.commit('SET_CHAMELEON', user);
                }
            },
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

            save() {
                Promise.all([
                    this.$store.dispatch('SET_FOLDERMASTER', this.foldermaster.id),
                    this.$store.dispatch('SET_CHAMELEON', this.chameleon.id),
                    this.$store.dispatch('SET_LIVE_DIRECTOR', this.liveDirector.id),
                ]).then(() => {
                    Vue.toast('Master wurde gesetzt', {
                        className: ['nau_toast', 'nau_success'],
                    });
                })
            },
        }
    }
</script>
