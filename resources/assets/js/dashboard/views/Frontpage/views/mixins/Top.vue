<template>
    <div>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <div class="row">
            <div class="col-md-6">
                <div class="row  equal">

                    <top-article
                        v-for="(layout, key) in layouts"
                        v-if="topArticles[layout.articleIndex]"
                        :key="key"
                        :layout="layout"
                        :article="topArticles[layout.articleIndex].article"
                        @add="addAtIndex(layout.articleIndex)"
                        @replace="replaceAtIndex(layout.articleIndex)"
                    />

                </div>
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
                    <h5>{{ topArticles[selectedIndex].title }}</h5>
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
                            <img class="option-image" width="140" height="70" :src="(this.layouts[0].indexOf('teaser') !== -1 ? props.option.teaser.url : props.option.image.url) + '?w=140&h70'" :alt="props.option.title">
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
                        <img class="option-image" width="140" height="70" :src="props.option.image.url + '?w=140&h70'" :alt="props.option.title">
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

    export default {
        data() {
            return {
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
                topArticles: [],
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
            TopArticle
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
                        this.topArticles.forEach((topArticle) => {
                            if(topArticle.article.id === article.id) {
                                result = false;
                            }
                        });

                        return result;
                    });

                    this.isLoading = false;
                });
            }, 400),

            replaceTop() {
                Vue.set(this.topArticles, this.selectedIndex, {
                    id: this.topArticles[this.selectedIndex].id,
                    order: this.selectedIndex,
                    article: this.selectedArticle,
                });
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
                this.topArticles.splice(this.selectedIndex, 0, {
                    id: null,
                    order: this.selectedIndex,
                    article: this.selectedArticle,
                });
                this.selectedIndex = null;
                this.showAddDropdown = false;
                this.selectedArticle = {};
            },

            cancel() {
                this.showAddDropdown = false;
                this.showReplaceDropdown = false;
            },

            save() {
                var topArticles = this.layouts.filter((layout) => {
                    // Filter out layouts that can not be edited
                    return layout.editable;
                }).map((layout) => {
                    return this.topArticles[layout.articleIndex];
                })

                this.saveTopArticles(topArticles)
                .then(response => {
                    this.topArticles = response.data;
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
</style>
