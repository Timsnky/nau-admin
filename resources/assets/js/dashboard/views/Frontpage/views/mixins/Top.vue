<template>
    <div>
        <div class="row">
            <div class="col-md-8 scroll">
                <h2>Sortierung</h2><p>Drag and Drop um die Position zu ändern</p>
                <draggable v-model="articles">
                    <div v-for="(article, key) in articles" :key="article.id">
                        <hr>
                        <button type="button" class="btn btn-block btn-success" @click="addAtIndex(key)"><i class="fa fa-plus"></i> Hinzufügen</button>
                        <hr>
                        <div :class="{'bg-danger': key > limit - 1}">
                            <h2 class="ranking-number">{{ key + 1 }}</h2>
                            <img :src="article.teaser.url + '?w=140&h70'" height="50px" width="100px" alt="Artikel Bild"/>
                            <div class="row-text">
                                <p class="aritcle-title">{{ article.dateline }} - <b>{{ article.title }}</b></p>
                                <p class="aritcle-publish-date">Publiziert am: {{ moment(article.published_at).format('DD.MM.YY HH:mm') }}</p>
                            </div>

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
                    :option-height="104"
                    :show-labels="false"
                    :internal-search="false"
                    @search-change="searchArticle">
                    <template slot="option" scope="props">
                        <img class="option-image" width="140" height="70" :src="props.option.teaser.url + '?w=140&h70'" :alt="props.option.title">
                        <div class="option-desc">
                            <span class="option-title">{{ props.option.dateline }} - <b>{{ props.option.title }}</b></span>
                        </div>
                    </template>
                    <span slot="noResult">Keine Artikel gefunden</span>
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
                limit: 8,
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

                this.isLoading = true;

                this.getArticles(query).then((articles) => {
                    this.options = articles.filter((article) => {
                        var result = true;

                        this.articles.forEach((topArticle) => {
                            if(topArticle.id === article.id) {
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

            save() {
                this.saveTopArticles(this.articles.slice(0, this.limit))
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

            moment(time) {
                return moment(time);
            },
        },

        mounted() {
            this.getTopArticles().then((articles) => {
                this.articles = articles;
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

    .row-text {
        display: inline-block;
        vertical-align: middle;

        p {
            margin: 0 0 .2em 0;
        }
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
