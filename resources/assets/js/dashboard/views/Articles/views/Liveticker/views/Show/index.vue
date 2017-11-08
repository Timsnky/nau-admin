<template>
    <div>
        <div class="text-right">
            <button class="btn btn-danger" @click="deleteAll()"><i class="fa fa-trash"></i> Alle Posts löschen</button>
        </div>
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
                                <multiselect v-model="type" :options="options" label="name" :show-labels="false" :searchable="false" placeholder="Typ auswählen" />
                            </div>

                            <socialmedia-input v-if="type.value === 'socialmedia'" @new-post="fetchLivetickers" />
                            <body-input v-if="type.value === 'body'" @new-post="fetchLivetickers" />
                            <external-video-input v-if="type.value === 'external-video'" @new-post="fetchLivetickers" />
                            <image-input v-if="type.value === 'image'" @new-post="fetchLivetickers" />
                            <sport-ticker-input v-if="type.value === 'sport-ticker'" @new-post="fetchLivetickers" />
                            <comment-input v-if="type.value === 'comment'" @new-post="fetchLivetickers" />
                        </span>
                    </div>
                </div>
            </div>

            <timeline-item v-for="liveticker in livetickers" :key="liveticker.id" :liveticker="liveticker" @delete="removeLiveticker(liveticker)">

                <socialmedia-element v-if="liveticker.type === 'socialmedia'" :element="liveticker" />
                <external-video-element v-if="liveticker.type === 'externalvideo'" :element="liveticker" />
                <body-element v-if="liveticker.type === 'body'"><span v-html="liveticker.content"></span></body-element>
                <image-element v-if="liveticker.type === 'image'" :element="liveticker"></image-element>
                <comment-element v-if="liveticker.type === 'comment'" :comment="liveticker" />
                <sport-ticker-element v-if="liveticker.type === 'sportticker'" :element="liveticker" />

            </timeline-item>
        </div>
    </div>
</template>
<script>
    import TimelineItem from './components/TimelineItem'
    import BodyElement from './components/Elements/BodyElement'
    import BodyInput from './components/Inputs/BodyInput'
    import SocialmediaElement from './components/Elements/SocialmediaElement'
    import SocialmediaInput from './components/Inputs/SocialmediaInput'
    import ExternalVideoInput from './components/Inputs/ExternalVideoInput'
    import ExternalVideoElement from './components/Elements/ExternalVideoElement'
    import CommentInput from './components/Inputs/CommentInput'
    import CommentElement from './components/Elements/CommentElement'
    import SportTickerInput from './components/Inputs/SportTickerInput'
    import SportTickerElement from './components/Elements/SportTickerElement'
    import ImageInput from './components/Inputs/ImageInput'
    import ImageElement from './components/Elements/ImageElement'

    export default {
        data() {
            return {
                type: '',
                livetickers: [],
                me: {},
                content: '',
                options: [
                    {name: 'Text', value: 'body'},
                    {name: 'Bild', value: 'image'},
                    {name: 'Socialmedia', value: 'socialmedia'},
                    {name: 'Externes Video', value: 'external-video'},
                    {name: 'Kommentar', value: 'comment'},
                    {name: 'Sport Ticker', value: 'sport-ticker'},
                ]
            }
        },

        components: {
            'timeline-item': TimelineItem,
            'body-element': BodyElement,
            'body-input': BodyInput,
            'socialmedia-input': SocialmediaInput,
            'socialmedia-element': SocialmediaElement,
            'external-video-input': ExternalVideoInput,
            SportTickerInput,
            SportTickerElement,
            'external-video-element': ExternalVideoElement,
            'comment-input': CommentInput,
            'comment-element': CommentElement,
            ImageInput,
            ImageElement,
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
                this.reset();
                Api.http
                    .get(`/articles/${this.$route.params.article}/livetickers`)
                    .then(response => this.livetickers = response.data);
            },

            reset() {
                this.type = '';
            },

            deleteAll() {
                swal({
                    title: 'Sind sie sicher?',
                    text: "Die Einträge können nicht wiederhergestellt werden!",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abbrechen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, alle löschen!'
                }).then(() => {
                    this.livetickers.forEach((liveticker) => {
                        this.removeLiveticker(liveticker);
                    });
                });
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
