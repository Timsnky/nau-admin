<template>
    <div>
        <page-title title="Articles" sub-title="Liveticker" />

        <div class="timeline">

            <!-- TIMELINE ITEM -->
            <div class="timeline-item" v-for="liveticker in livetickers">
                <div class="timeline-badge">
                    <img class="timeline-badge-userpic" :src="liveticker.user.avatar"></div>
                <div class="timeline-body">
                    <div class="timeline-body-arrow"> </div>
                    <div class="timeline-body-head">
                        <div class="timeline-body-head-caption">
                            <a href="javascript:;" class="timeline-body-title font-blue-madison">{{ liveticker.user.name }}</a>
                            <span class="timeline-body-time font-grey-cascade">Geposted {{ humanize(liveticker.created_at) }}</span>
                        </div>
                        <div class="timeline-body-head-actions">
                            <div class="btn-group">
                                <button class="btn btn-circle green btn-sm dropdown-toggle" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Aktionen
                                    <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu pull-right" role="menu">
                                    <li>
                                        <router-link :to="{name: 'articles.livetickers.edit', params: { article: $route.params.article, liveticker: liveticker.id }}"><i class="fa fa-edit"></i> Bearbeiten</router-link>
                                    </li>
                                    <li class="divider"> </li>
                                    <li>
                                        <a href="#" @click.prevent="remove(liveticker)"><i class="fa fa-trash"></i> Löschen</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-body-content linebreaks">
                        <span class="font-grey-cascade">{{ liveticker.content }}</span>
                    </div>
                </div>
            </div>
            <!-- END TIMELINE ITEM -->

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                livetickers: []
            }
        },

        created() {
            Api.http
                .get(`/articles/${this.$route.params.article}/livetickers`)
                .then(response => this.livetickers = response.data);
        },

        methods: {
            humanize: (date) => {
                return moment(date, moment.ISO_8601).fromNow();
            },

            remove(liveticker)  {
                swal({
                    title: 'Sind sie sicher?',
                    text: "Der Eintrag kann nicht wiederhergestellt werden!",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abbrechen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, löschen!'
                }).then(() => {
                    Api.http
                        .delete(`/livetickers/${liveticker.id}`)
                        .then(response => {
                            this.livetickers.splice(this.livetickers.indexOf(liveticker), 1);
                            Vue.toast('Liveticker wurde gelöscht', {
                                className : ['nau_toast','et-info'],
                            });
                        })
                        .catch(err => {
                            console.log(err)
                            Vue.toast('Ein Fehler ist aufgetreten', {
                                className : ['nau_toast','nau_warning'],
                            });
                        });
                })
            },
        }
    }
</script>

<style scoped>
    .linebreaks {
        white-space: pre-line;
    }
</style>
