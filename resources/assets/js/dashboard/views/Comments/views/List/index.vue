<template>
    <div>
        <page-title title="Kommentare" />
        <div class="row">
            <div class="col-lg-6 col-xs-12 col-sm-12">
                <div v-if="isLoading">
                    <h3>Laden <i class="fa fa-spinner fa-spin"></i></h3>
                </div>
                <div v-else class="portlet light bordered comment-approval">
                    <div class="portlet-title">
                        <div class="caption font-green-sharp">
                            <i class="fa fa-comments font-green-sharp"></i>
                            <span class="caption-subject font-green-sharp bold uppercase">Kommentare freischalten</span>
                            <span class="caption-helper">{{ comments.length }} verbleibend</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <label>Nur Kommentare für folgenden Author anzeigen.</label>
                        <multiselect
                            v-model="selectedAuthor"
                            placeholder="Artikel Author suchen"
                            label="name"
                            :max-height="500"
                            :options="authors"
                            :options-limit="20"
                            :close-on-select="true"
                            track-by="id"
                            open-direction="bottom"
                            :show-labels="false">
                        </multiselect>
                        <hr>

                        <div class="general-item-list">
                            <div class="item comment" v-for="comment in comments">
                                <div class="item-head">
                                    <div class="item-details">
                                        <img class="item-pic rounded" :src="comment.author.avatar">
                                        <span class="item-name">{{ comment.author.name }}</span>
                                        <span class="item-label">{{ humanize(comment.created_at) }}</span>
                                    </div>
                                    <div class="btn-group btn-group-circle item-status">
                                        <div class="btn btn-outline green btn-xs" @click="approve(comment)">Freischalten</div>
                                        <div class="btn btn-outline red btn-xs" @click="decline(comment)">Ablehnen</div>
                                    </div>
                                </div>
                                <div class="item-body linebreaks">{{ comment.content }}</div>
                                <img class="comment-image" v-if="comment.image" :src="comment.image.url">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                comments: [],
                selectedAuthor: null,
                authors: [],
                isLoading: true,
            }
        },

        async mounted() {
            await Api.http
                .get('/authors')
                .then((response) => {
                    this.authors = response.data;
                });

            this.getComments();
            this.isLoading = false;
        },

        watch: {
            selectedAuthor(author) {
                this.isLoading = true;
                this.getComments();
                this.isLoading = false;
            }
        },

        methods: {
            humanize(date) {
                return moment(date, moment.ISO_8601).fromNow();
            },

            getComments() {
                var url = '/comments?status=approval';

                if(this.selectedAuthor != null) {
                    url += '&author_id=' + this.selectedAuthor.id;
                }

                return Api.http
                    .get(url)
                    .then(response => {
                        this.comments = response.data;
                    })
                    .catch(err => {
                        Vue.toast('Kommentare konnten nicht geladen werden.', {
                            className : ['nau_toast','nau_warning'],
                        });
                    });
            },

            approve(comment) {
                Api.http.put(`/comments/${comment.id}/publish`)
                    .then((response) => {
                        Vue.toast('Kommentar wurde freigegeben', {
                            className : ['nau_toast','et-info'],
                        });
                        this.remove(comment);
                    })
                    .catch(err => {
                        Vue.toast('Kommentar konnten nicht veröffentlicht werden.', {
                            className : ['nau_toast','nau_warning'],
                        });
                    });
            },

            decline(comment) {
                Api.http.put(`/comments/${comment.id}/decline`)
                    .then((response) => {
                        Vue.toast('Kommentar wurde abgelehnt', {
                            className : ['nau_toast','et-info'],
                        });
                        this.remove(comment);
                    })
                    .catch(err => {
                        Vue.toast('Kommentar konnten nicht abgelehnt werden.', {
                            className : ['nau_toast','nau_warning'],
                        });
                    });
            },

            remove(comment) {
                this.comments.splice(this.comments.indexOf(comment), 1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }

    .comment {
        .comment-image {
            width: 100%;
        }
    }
</style>
