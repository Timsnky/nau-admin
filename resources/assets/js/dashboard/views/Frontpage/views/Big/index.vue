<template>
    <div>
        <page-title title="Frontpage" sub="Big" />

        <div class="row">
            <div class="col-md-8">
                <div class="big" :style="{'background-image': 'url(' + big.image + ')'}">
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
                    <h3>Es exisitert kein Big</h3>
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

            replaceBig() {
                Api.http.post(`/big/${this.selectedArticle.id}`, {position: this.position})
                .then((response) => {
                    this.big = response.data;
                });
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
            padding: 0;
            margin: 0;
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
