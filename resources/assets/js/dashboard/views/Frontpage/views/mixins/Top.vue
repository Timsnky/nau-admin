<template>
    <div>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <div class="row">
            <div class="col-md-6">
                <draggable :class="{flex, articles: true}" v-model="articles">
                    <top-article
                        v-for="(layout, key) in layouts"
                        v-if="articles[key]"
                        :key="key"
                        :layout="layout"
                        :article="articles[key]"
                        @add="addAtIndex(key)"
                        @replace="replaceAtIndex(key)"
                    />
                </draggable>
            </div>
            <div class="col-md-4 sticky" v-if="!showReplaceDropdown && !showAddDropdown">
                <h3>Aktuelle Sortierung speichern</h3>
                <div class="form-group">
                    <button type="button" class="btn btn-lg blue btn-block" @click="save()">Speichern</button>
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
                    :option-height="104"
                    :show-labels="false"
                    :internal-search="false"
                    @search-change="searchArticle">
                        <template slot="option" scope="props">
                            <img class="option-image" width="140" height="70" :src="(layouts[0].class.indexOf('teaser') !== -1 ? props.option.teaser.url : props.option.image.url) + '?w=140&h70'" :alt="props.option.title">
                            <div class="option-desc">
                                <span class="option-title">{{ props.option.dateline }} - <b>{{ props.option.title }}</b></span>
                            </div>
                        </template>
                        <span slot="noResult">Keine Artikel gefunden</span>
                    </multiselect>
                </div>

                <div class="form-group">
                    <button type="button" class="btn blue" @click="replaceTop()" :disabled="Object.keys(selectedArticle).length === 0">Ersetzen</button>
                    <button type="button" class="btn red" @click="cancel()">Abbrechen</button>
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
                    <template slot="option" scope="props">
                        <img class="option-image" width="140" height="70" :src="(layouts[0].class.indexOf('teaser') !== -1 ? props.option.teaser.url : props.option.image.url) + '?w=140&h70'" :alt="props.option.title">
                        <div class="option-desc">
                            <span class="option-title">{{ props.option.dateline }} - <b>{{ props.option.title }}</b></span>
                        </div>
                    </template>
                    <span slot="noResult">Keine Artikel gefunden</span>
                </multiselect>
            </div>

            <div class="form-group">
                <button type="button" class="btn blue" @click="addTop()" :disabled="Object.keys(selectedArticle).length === 0">Hinzufügen</button>
                <button type="button" class="btn red" @click="cancel()">Abbrechen</button>
            </div>
        </div>

        </div>
    </div>
</template>

<script>
    import TopArticle from '../components/Article';
    import Draggable from 'vuedraggable';

    export default {
        data() {
            return {
                flex: true,
                layouts: [{
                    editable: true,
                    class: ['teaser', 'col-md-8']
                }, {
                    editable: true,
                    class: ['teaser', 'col-md-4']
                }, {
                    editable: true,
                    class: ['teaser', 'col-md-4']
                }, {
                    editable: false,
                    class: ['col-md-4']
                }, {
                    editable: false,
                    class: ['col-md-4']
                }, {
                    editable: false,
                    class: ['col-md-4']
                }, {
                    editable: true,
                    class: ['teaser', 'col-md-6']
                }, {
                    editable: true,
                    class: ['teaser', 'col-md-6']
                }, {
                    editable: true,
                    class: ['col-md-4']
                }, {
                    editable: true,
                    class: ['col-md-4']
                }, {
                    editable: true,
                    class: ['col-md-4']
                }],
                topArticleIds: [],
                notInLayoutArticles: [],
                articles: [],
                allArticles: [],
                options: [],
                limit: 8,
                selectedArticle: {},
                isLoading: false,
                showAddDropdown: false,
                showReplaceDropdown: false,
                selectedIndex: null,
            };
        },

        components: {
            TopArticle,
            Draggable
        },

        methods: {
            searchArticle: _.debounce(function (query) {
                if(!query) {
                    this.options = [];
                    return;
                }

                this.isLoading = true;

                this.getArticles(query).then((articles) => {
                    this.options = articles.filter((article) => {
                        var result = true;

                        // Exclude already used articles
                        this.articles.forEach((topArticle) => {
                            if(topArticle.id === article.id) {
                                result = false;
                            }
                        });

                        this.notInLayoutArticles.forEach((notInLayoutArticle) => {
                            if(notInLayoutArticle.id === article.id) {
                                result = false;
                            }
                        });

                        return result;
                    });

                    this.isLoading = false;
                });
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

            cancel() {
                this.showAddDropdown = false;
                this.showReplaceDropdown = false;
            },

            save() {
                var articles = [];
                this.layouts.filter((layout) => {
                    // Filter out layouts that can not be edited
                    return layout.editable;
                }).forEach((layout, key) => {
                    articles.push({
                        id: this.topArticleIds[layout.articleIndex],
                        article_id: this.articles[key].id,
                    });
                })

                this.saveTopArticles(articles)
                .then(response => {
                    let topArticles = response.data;
                    this.mapTopArticles(topArticles);
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

            saveTopArticles(articles) {
                return Api.http.put('/top-articles', articles);
            },

            async loadTopArticles() {
                var topArticles = await this.getTopArticles()
                this.mapTopArticles(topArticles);
            },

            mapTopArticles(topArticles) {
                this.topArticleIds = topArticles.map((topArticle) => {
                    return topArticle.id;
                });

                this.allArticles = topArticles.map((topArticle) => {
                    return topArticle.article;
                });

                this.articles = this.allArticles.filter((article, key) => {
                    var exists = false;

                    this.layouts.forEach((layout) => {
                        if(layout.articleIndex === key) {
                            exists = true;
                        }
                    });

                    return exists;
                });

                this.notInLayoutArticles = this.allArticles.filter((article, key) => {
                    var exists = false;

                    this.layouts.forEach((layout) => {
                        if(layout.articleIndex !== key) {
                            exists = true;
                        }
                    });

                    return exists;
                });
            },

            getTopArticles() {
                return Api.http.get(this.topArticlesUrl).then((response) => {
                    return response.data;
                });
            },
        },

        mounted() {

        },
    }
</script>

<style lang="scss" scoped>
    .sticky {
        padding-top: 4em;
        top: 0;
        position: -webkit-sticky;
        position: sticky;
    }

    .multiselect {
        .option-image {
            width: 140px;
            height: 70px;
        }

        .option-desc {
            display: inline-block;
            vertical-align: top;
        }

        .option-title {
            //
        }
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
    }

    .item-4 {
        width: 33.333%;
    }

    .item-8 {
        width: 66.666%;
    }

    .item {
        padding: 10px;
    }
</style>
