<template>
    <div>
        <div class="form-group">
            <button type="button" class="btn btn-primary">Bild auswählen oder hochladen</button>
            <twitteriamge-element v-if="hasImage()" :image="image"></iamge-element>
        </div>

        <div class="form-group">
            <button :disabled="this.url === ''" type="button" class="btn btn-primary" @click="post">Posten</button>
        </div>
    </div>
</template>
<script>
    import TwitterElment from 'dashboard/components/TwitterTweet';

    export default {
        data() {
            return {
                image: {},
            }
        },

        computed: {
            hasImage() {
                return !_.isEmpty(this.image);
            }
        }

        methods: {
            post() {
                Api.http
                    .post(`/images`, {
                        url: this.url,
                    }).then(response => {
                        var socialmedia = response.data;

                        Api.http
                        .put(`/livetickers/${this.$route.params.article}/socialmedia/${socialmedia.id}`)
                        .then(response => {
                            this.$emit('new-post');
                            Vue.toast('Liveticker wurde erstellt', {
                                className : ['nau_toast','et-info'],
                            });
                        });

                    });
            },
        },

        components: {
            'twitter-element': TwitterElment,
        }
    }
</script>
