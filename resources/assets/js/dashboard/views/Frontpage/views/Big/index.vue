<template>
    <div>
        <page-title title="Frontpage" sub="Big" />

        <div class="row">
            <div class="col-md-8">
                <div class="form-group">
                    <span class="control-label">Artikel</span>
                    <multiselect
                        v-model="selectedArticle"
                        placeholder="Artikel Suchen"
                        label="title"
                        :max-height="500"
                        :options="options"
                        :loading="isLoading"
                        :options-limit="20"
                        :clear-on-select="true"
                        :close-on-select="true"
                        track-by="id"
                        open-direction="bottom"
                        :show-labels="false"
                        :internal-search="false"
                        @search-change="searchArticle">
                            <template slot="clear" scope="props">
                                <div class="multiselect__clear" v-if="options.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
                            </template><span slot="noResult">Keine Artikel gefunden</span>
                        </multiselect>
                        </div>

                    <div class="form-group">
                        <span class="control-label">Position</span>
                        <select class="form-control" v-model="position">
                            <option value="1">Oben</option>
                            <option value="2">Unten</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-primary" @click="replaceBig">Ersetzen</button>
                    </div>
            </div>
            <div class="col-md-4">
                <div v-if="big">
                    <div v-if="big" class="form-group">
                        <button type="button" class="btn btn-danger btn-block btn-lg" @click="removeBig">Big entfernen</button>
                    </div>
                    <article-element v-if="big" :article="big.article" />
                    <div>
                        <h5>Position: {{ big.position == 1 ? 'oben' : 'unten' }}</h5>
                    </div>
                </div>
                <div v-else>
                    <h3>Es exisitert kein Big</h3>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Article from '../../components/Article';

    export default {
        data() {
            return {
                big: null,
                options: [],
                selectedArticle: {},
                isLoading: false,
                position: 1,
            }
        },

        components: {
            'article-element': Article,
        },

        methods: {
            searchArticle: _.debounce(function (query) {
                if(!query) {
                    this.options = [];
                    return;
                }

                Api.http.get(`/articles?search=${query}`)
                    .then((response) => {
                        this.options = response.data;
                        this.isLoading = false
                    })
            }, 400),

            replaceBig() {
                Api.http.post(`/big-article/${this.selectedArticle.id}`, {position: this.position})
                    .then((response) => {
                        this.big = response.data;
                    });
            },

            removeBig() {
                swal({
                    title: 'Sind Sie sicher,',
                    text: "dass der Big Artikel entfernt werden soll?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, entfernen',
                    cancelButtonText: 'Abbrechen',
                }).then(function () {
                    Api.http.delete('/big-article')
                    .then(() => {
                        this.big = null;
                        swal(
                            'Erfolgreich!',
                            'Der Big wurde entfernt.',
                            'success'
                            )
                    })
                })

            },
        },

        created() {
            Api.http
                .get(`/big-article`)
                .then(response => {
                    this.big = response.data;
                });
        },
    }
</script>
