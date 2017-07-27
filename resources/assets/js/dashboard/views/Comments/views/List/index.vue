<template>
    <div>
        <page-title title="Kommentare" />
        <div class="row">
            <div class="col-lg-6 col-xs-12 col-sm-12">
                <div class="portlet light bordered comment-approval">
                    <div class="portlet-title">
                        <div class="caption font-green-sharp">
                            <i class="fa fa-comments font-green-sharp"></i>
                            <span class="caption-subject font-green-sharp bold uppercase">Kommentare freischalten</span>
                            <span class="caption-helper">{{ comments.length }} verbleibend</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="general-item-list">

                            <div class="item" v-for="comment in comments">
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
            }
        },

        mounted() {
            Api.http
                .get('/comments?status=approval')
                .then(response => {
                    this.comments = response.data;
                })
                .catch(err => {
                    Vue.toast('Kommentare konnten nicht geladen werden.', {
                        className : ['nau_toast','nau_warning'],
                    });
                });
        },

        methods: {
            humanize(date) {
                return moment(date, moment.ISO_8601).fromNow();
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
</style>
