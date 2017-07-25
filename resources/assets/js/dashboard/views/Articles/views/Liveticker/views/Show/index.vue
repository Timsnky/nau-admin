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
                <div class="timeline-body-content">
                    <span class="font-grey-cascade">
                        <div class="form-group">
                            <select v-model="type" class="form-control" rows="6">
                                <option value="" disabled hidden>Typ auswählen</option>
                                <option value="body">Text</option>
                                <option value="socialmedia">Socialmedia</option>
                            </select>
                        </div>

                        <socialmedia-input v-if="type === 'socialmedia'" @new-post="fetchLivetickers"></socialmedia-input>
                        <body-input v-if="type === 'body'" @new-post="fetchLivetickers"></body-input>
                    </span>
                </div>
            </div>
        </div>

        <timeline-item v-for="liveticker in livetickers" :key="liveticker.id" :liveticker="liveticker" @delete="removeLiveticker(liveticker)">
            <socialmedia-element v-if="liveticker.type === 'socialmedia'" :url="liveticker.url" />

            <text-element v-if="liveticker.type === 'body'">
                {{ liveticker.content }}
            </text-element>

        </timeline-item>
    </div>
</template>
<script>
    import TimelineItem from './components/TimelineItem'
    import TextElement from './components/Elements/TextElement'
    import BodyInput from './components/Inputs/BodyInput'
    import SocialmediaElement from './components/Elements/SocialmediaTwitterElement'
    import SocialmediaInput from './components/Inputs/SocialmediaInput'

    export default {
        data() {
            return {
                type: '',
                livetickers: [],
                me: {},
                content: '',
            }
        },

        components: {
            'timeline-item': TimelineItem,
            'text-element': TextElement,
            'body-input': BodyInput,
            'socialmedia-input': SocialmediaInput,
            'socialmedia-element': SocialmediaElement,
        },

        methods: {
            removeLiveticker(liveticker) {
                Api.http
                        .delete(`/article/${this.$route.params.article}/livetickers/${liveticker.id}`)
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

            },

            fetchLivetickers() {
                Api.http
                    .get(`/articles/${this.$route.params.article}/livetickers`)
                    .then(response => this.livetickers = response.data);
            }
        },

        mounted() {
            Api.http
                .get(`/me`)
                .then(response => this.me = response.data);

            this.fetchLivetickers();
        },
    }
</script>
