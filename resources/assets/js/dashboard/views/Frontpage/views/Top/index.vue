<template>
    <div>
        <page-title title="Frontpage" sub="Top" />

        <div class="row">
            <div class="col-md-8">
                <h2>Sortierung</h2>
                <draggable v-model="articles">
                    <div v-for="article in articles">
                        <img :src="article.image.url" height="50px" width="100px" alt="Artikel Bild"/>
                        {{ article.title }}
                        <span class="form-group pull-right">
                            <button type="button" class="btn btn-primary" @click="toReplace = article">Ersetzen</button>
                        </span>
                        <hr>
                    </div>
                </draggable>

                <div class="form-group">
                    <button type="button" class="btn btn-lg btn-primary btn-block" @click="save()">Speichern</button>
                </div>
            </div>

            <div class="col-md-4" v-if="Object.keys(toReplace).length !== 0">
                <div class="form-group">
                    <h3>Artikel ersetzen</h3>
                    <h5>{{ toReplace.title }}</h5>
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
                position: 1,
                toReplace: {},
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

                Api.http.get(`/articles?search=${query}&community=0&teaser=1`)
                    .then((response) => {
                        this.options = response.data;
                        this.isLoading = false
                    })
            }, 400),

            replaceTop() {
                Vue.set(this.articles, this.articles.indexOf(this.toReplace), this.selectedArticle);
                this.toReplace = {};
                this.selectedArticle = {};
            },

            save() {
                let mapped = this.articles.map(function(article) {
                    return article.id;
                });

                Api.http
                    .put('/top-articles', mapped)
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
        },

        mounted() {
            Api.http
                .get(`/top-articles`)
                .then(response => {
                    this.articles = response.data.map(function(value) {
                        return value.article;
                    });
                });
        },
    }
</script>
