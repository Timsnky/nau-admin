<template>
    <div class="timeline-item">
        <div class="timeline-badge">
            <img class="timeline-badge-userpic" :src="liveticker.poster.avatar"></div>
        <div class="timeline-body">
            <div class="timeline-body-arrow"> </div>
            <div class="timeline-body-head">
                <div class="timeline-body-head-caption">
                    <a href="javascript:;" class="timeline-body-title font-blue-madison">{{ liveticker.poster.name }}</a>
                    <span class="timeline-body-time font-grey-cascade">Geposted {{ humanize(liveticker.posted_at) }}</span>
                </div>
                <div class="timeline-body-head-actions">
                    <div class="btn-group">
                        <button class="btn btn-circle green btn-sm dropdown-toggle" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Aktionen
                            <i class="fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu pull-right" role="menu">
                            <li>
                                <a href="#" @click.prevent="remove(liveticker)"><i class="fa fa-trash"></i> Löschen</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="timeline-body-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'liveticker'
        ],

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
                    this.$emit('delete', liveticker)
                })
            },
        },
    }
</script>

<style scoped>
    .linebreaks {
        white-space: pre-line;
    }
</style>
