<template>
    <div>
        <page-title title="Frontpage" sub="Big" />

        <div class="row">
            <div class="col-md-8">
                <button v-if="image == null" @click="showImageSelectionModal" type="button" class="btn btn-primary btn-lg">
                    Big Bild hochladen
                </button>
                <div class="big" :style="{'background-image': 'url(' + image.url + ')'}" v-else>
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

            <div class="col-md-4" v-if="image && image.id">
                <div>
                    <div class="form-group">
                        <button type="button" class="btn btn-danger btn-block btn-lg" @click="removeBig"><i class="fa fa-trash"></i> Big entfernen</button>
                    </div>

                    <div class="form-group">
                        <label>Position</label>
                        <select v-model="position" class="form-control">
                            <option value="1">Oben</option>
                            <option value="2">Unten</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-primary" :disabled="!validate || this.saving" @click="createBig()">
                            <i v-if="!saving" class="fa fa-floppy-o"></i>
                            <i v-if="saving" class="fa fa-spinner fa-spin"></i>
                            Big speichern
                        </button>
                    </div>

                    <div v-if="!validate" class="note note-info">
                        <h4 class="block">Information</h4>
                        <p>Um den Big speichern zu können müssen alle 5 Artikel felder ausgefüllt sein.</p>
                    </div>
                </div>
            </div>
        </div>

        <image-select-modal></image-select-modal>
    </div>
</template>

<script>
    import Article from '../../components/Article';
    import ArticleDropdown from './components/ArticleDropdown';
    import ImageSelectModal from 'dashboard/components/ImageSelectModal';

    export default {
        data() {
            return {
                articles: [{}, {}, {}, {}, {}],
                image: null,
                options: [],
                selectedArticle: {},
                position: 1,
                saving: false,
            }
        },

        components: {
            'article-element': Article,
            ArticleDropdown,
            ImageSelectModal,
        },

        computed: {
            selectedImageId()
            {
                return Api.getImage();
            },

            validate() {
                var ret = true;

                if(!this.image) {
                    return false;
                }

                this.articles.forEach((article) => {
                    if(_.isEmpty(article)) {
                        ret = false;
                    }
                });

                return ret;
            },
        },

        watch: {
            selectedImageId(image) {
                if(image === null) {
                    return;
                }

                this.getImage(image).then(({data}) => {
                    this.image = data;
                });
            }
        },

        methods: {
            getImage(id) {
                return Api.http.get(`/images/${id}`);
            },

            showImageSelectionModal()
            {
                Api.resetImage();
                Api.setImageType(2);
                this.$emit('imageTypeChange');
                $('#imageSelectionModal').modal('show');
            },

            createBig() {
                this.saving = true;
                Api.http.post(`/big`, {
                    articles: this.articles.map((article) => {
                        return article.id;
                    }),
                    image: this.image.id,
                    position: this.position
                })
                .then(({data}) => {
                    this.image = data.image;
                    this.articles = data.articles;
                    this.position = data.position;
                    this.saving = false;
                    swal(
                        'Erfolgreich!',
                        'Der Big wurde gespeichert.',
                        'success'
                    )
                })
                .catch((error) => {
                    console.error(error);
                    this.saving = false;
                    Vue.toast('Big konnte nicht gespeichert werden.', {
                        className: ['nau_toast', 'nau_warning'],
                    });
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
                }).then(() => {
                    Api.http.delete('/big')
                    .then(() => {
                        this.articles = [{}, {}, {}, {}, {}];
                        this.image = null;
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
            .then(({data, status_code}) => {
                if(status_code === 200) {
                    this.image = data.image;
                    this.articles = data.articles;
                    this.position = data.position;
                    this.saving = false;
                }
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
