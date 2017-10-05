<template>
    <div>
        <page-title title="Frontpage" sub="Big" />

        <div class="row">
            <div class="col-md-8">
                <button v-if="!image" type="button" class="btn btn-primary">
                    Big Bild hochladen
                </button>
                <div class="big" :style="{'background-image': 'url(' + big.image + ')'}" v-else>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="half">
                                <article-dropdown v-model="articles[0]"></article-dropdown>
                            </div>
                            <div class="half">
                                <article-dropdown v-model="articles[1]"></article-dropdown>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="third">
                                <article-dropdown v-model="articles[2]"></article-dropdown>
                            </div>
                            <div class="third">
                                <article-dropdown v-model="articles[3]"></article-dropdown>
                            </div>
                            <div class="third">
                                <article-dropdown v-model="articles[4]"></article-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div v-if="hasBig()">
                    <div class="form-group">
                        <button type="button" class="btn btn-danger btn-block btn-lg" @click="removeBig">Big entfernen</button>
                    </div>
                    <article-element :article="big.article" />
                    <div>
                        <h5>Position: {{ big.position == 1 ? 'oben' : 'unten' }}</h5>
                    </div>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label>Position</label>
                        <select v-model="position" class="form-control">
                            <option value="1">Oben</option>
                            <option value="2">Unten</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-primary" :disabled="validate" @click="createBig()">Big erstellen</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Article from '../../components/Article';
    import ArticleDropdown from './components/ArticleDropdown';

    export default {
        data() {
            return {
                articles: [{}, {}, {}, {}, {}],
                image: null,
                big: {},
                options: [],
                selectedArticle: {},
                position: 1,
            }
        },

        components: {
            'article-element': Article,
            'article-dropdown': ArticleDropdown,
        },

        methods: {
            hasBig() {
                return !_.isEmpty(this.big);
            },

            createBig() {
                Api.http.post(`/big/${this.selectedArticle.id}`, {position: this.position})
                .then((response) => {
                    this.big = response.data;
                });
            },

            validate() {
                var ret = true;

                if(!this.image) {
                    return false;
                }

                this.articles.each((article) => {
                    if(_.isEmpty(this.big)) {
                        ret = false;
                    }
                });

                return ret;
            },

            removeBig() {
                var vm = this;
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
                    Api.http.delete('/big')
                    .then(() => {
                        vm.big = null;
                        swal(
                            'Erfolgreich!',
                            'Der Big wurde entfernt.',
                            'success'
                            )
                    })
                })

            },
        },

        mounted() {
            Api.http
            .get(`/big`)
            .then(response => {
                this.big = response.data;
            });
        },
    }
</script>

<style lang="scss" scoped>
    .big {
        height: 600px;

        .col-md-6 {

            &:first-of-type {
                padding-right: 0;
            }

            &:last-of-type {
                padding-left: 0;
            }
        }

        .half, .third {
            border: 2px solid black;
        }

        .half {
            height: 300px;
        }

        .third {
            height: 200px;
        }
    }
</style>
