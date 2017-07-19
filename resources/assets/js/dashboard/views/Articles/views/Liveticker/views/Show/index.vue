<template>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-badge">
                <img class="timeline-badge-userpic" :src="me.avatar"></div>
            <div class="timeline-body">
                <div class="timeline-body-arrow"> </div>
                <div class="timeline-body-head">
                    <div class="timeline-body-head-caption">
                        <a href="javascript:;" class="timeline-body-title font-blue-madison">{{ me.name }}</a>
                        <span class="timeline-body-time font-grey-cascade">Neues Update erstellen</span>
                    </div>
                    <div class="timeline-body-head-actions">
                        <div class="btn-group">

                        </div>
                    </div>
                </div>
                <div class="timeline-body-content linebreaks">
                    <span class="font-grey-cascade">
                        <div class="form-group">
                            <textarea v-model="content" class="form-control" rows="6"></textarea>
                        </div>

                        <button type="button" class="btn btn-primary" @click="create">Erstellen</button>
                    </span>
                </div>
            </div>
        </div>

        <timeline-item v-for="liveticker in livetickers" :key="liveticker.id" :liveticker="liveticker" @delete="removeLiveticker(liveticker)">
            {{ liveticker.content }}
        </timeline-item>
    </div>
</template>
<script>
    import TimelineItem from './components/TimelineItem'

    export default {
        data() {
            return {
                livetickers: [],
                me: {},
                content: '',
            }
        },

        components: {
            'timeline-item': TimelineItem
        },

        methods: {
            create() {
                Api.http
                    .post(`/articles/${this.$route.params.article}/livetickers`, {
                        content: this.content,
                    }).then(response => {
                        this.livetickers.unshift(response.data);
                        this.content = '';
                        Vue.toast('Liveticker wurde erstellt', {
                            className : ['nau_toast','et-info'],
                        });
                    });
            },

            removeLiveticker(liveticker) {
                this.livetickers.splice(this.livetickers.indexOf(liveticker), 1);
            },
        },



        mounted() {
            Api.http
                .get(`/me`)
                .then(response => this.me = response.data);

            Api.http
                .get(`/articles/${this.$route.params.article}/livetickers`)
                .then(response => this.livetickers = response.data);
        },
    }
</script>

<style scoped>
    .linebreaks {
        white-space: pre-line;
    }
</style>
