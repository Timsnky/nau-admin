<template>
    <div>
        <page-title title="Frontpage" sub="Top Community" />

        <div class="row">
            <div class="col-md-8 scroll">
                <h2>Sortierung</h2>
                <draggable v-model="articles">
                    <div v-for="(article, key) in articles" :key="article.id">
                        <hr>
                        <button type="button" class="btn btn-block btn-success" @click="addAtIndex(key)"><i class="fa fa-plus"></i> Hinzufügen</button>
                        <hr>
                        <div :class="{'bg-danger': key > 7}">
                            <h2 class="ranking-number">{{ key + 1 }}</h2>
                            <img :src="article.teaser.url" height="50px" width="100px" alt="Artikel Bild"/>
                            {{ article.title }}
                            <span class="form-group pull-right">
                                <button type="button" class="btn btn-primary" @click="replaceAtIndex(key)">Ersetzen</button>
                            </span>
                        </div>
                    </div>
                </draggable>
            </div>

            <div class="col-md-4 sticky" v-if="!showReplaceDropdown && !showAddDropdown">
                <h3>Aktuelle Sortierung speichern</h3>
                <div class="form-group">
                    <button type="button" class="btn btn-lg btn-primary btn-block" @click="save()">Speichern</button>
                </div>
            </div>

            <div class="col-md-4 sticky" v-if="showReplaceDropdown">
                <div class="form-group">
                    <h3>Artikel ersetzen</h3>
                    <h5>{{ articles[selectedIndex].title }}</h5>
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
                    <button type="button" class="btn btn-primary" @click="replaceTop()" :disabled="Object.keys(selectedArticle).length === 0">Ersetzen</button>
                    <button type="button" class="btn btn-danger" @click="cancel()">Abbrechen</button>
                </div>
            </div>

            <div class="col-md-4 sticky" v-if="showAddDropdown">
                <h3>Artikel hinzufügen an Position {{ selectedIndex + 1 }}</h3>
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
                    <button type="button" class="btn btn-primary" @click="addTop()" :disabled="Object.keys(selectedArticle).length === 0">Hinzufügen</button>
                    <button type="button" class="btn btn-danger" @click="cancel()">Abbrechen</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Article from '../../components/Article';
    import draggable from 'vuedraggable';

    export default {
        data() {
            return {
                articles: [],
                options: [],
                selectedArticle: {},
                isLoading: false,
                showAddDropdown: false,

                showReplaceDropdown: false,
                selectedIndex: null,
            }
        },

        components: {
            'article-element': Article,
            draggable,
        },

        methods: {
            searchArticle: _.debounce(function (query) {
                if(!query) {
                    this.options = [];
                    return;
                }

                Api.http.get(`/articles?search=${query}&community=1&teaser=1&status=published`)
                    .then((response) => {
                        var result = true;

                        this.options = response.data.data.filter((article) => {
                            this.articles.forEach((topArticle) => {
                                if(topArticle.id === article.id) {
                                    result = false;
                                }
                            });

                            return result;
                        });

                        // this.options = articles;
                        this.isLoading = false
                    })
            }, 400),

            replaceTop() {
                Vue.set(this.articles, this.selectedIndex, this.selectedArticle);
                this.selectedIndex = null;
                this.showReplaceDropdown = false;
                this.selectedArticle = {};
            },

            replaceAtIndex(index) {
                this.selectedIndex = index;
                this.showAddDropdown = false;
                this.showReplaceDropdown = true;
            },

            addAtIndex(index) {
                this.selectedIndex = index;
                this.showReplaceDropdown = false;
                this.showAddDropdown = true;
            },

            addTop() {
                this.articles.splice(this.selectedIndex, 0, this.selectedArticle);
                this.selectedIndex = null;
                this.showAddDropdown = false;
                this.selectedArticle = {};
            },

            save() {
                let mapped = this.articles.slice(0, 8).map(function(article) {
                    return article.id;
                });

                Api.http
                    .put('/top-community-articles', mapped)
                    .then(response => {
                        Vue.toast('Top Artikel erfolgreich gespeichert.', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }).catch(error => {
                        console.log(error);
                        Vue.toast('Ein Fehler ist aufgetreten.', {
                            className : ['nau_toast','nau_warning'],
                        });
                    })
            },

            cancel() {
                this.showAddDropdown = false;
                this.showReplaceDropdown = false;
            },
        },

        mounted() {
            Api.http
                .get(`/top-community-articles`)
                .then(response => {
                    this.articles = response.data.map(function(value) {
                        return value.article;
                    });
                });
        },
    }
</script>

<style lang="scss" scoped>
    .ranking-number {
        display: inline;
        margin: 0 .2em 0 0;
        vertical-align: middle;
    }

    .sticky {
        padding-top: 4em;
        top: 0;
        position: -webkit-sticky;
        position: sticky;
    }
</style>
