<template>
    <div>
        <div class="form-group">
            <label for="socialmedia">Link</label>
            <input @focusout="rerender" type="text" v-model="url" placeholder="https://twitter.com/elonmusk/status/576140759281238017" id="socialmedia" class="form-control"></input>

            <twitter-element v-if="show" :url="url"></twitter-element>
        </div>

        <div class="form-group">
            <button :disabled="this.url === ''" type="button" class="btn btn-primary" @click="post">Posten</button>
        </div>
    </div>
</template>
<script>
    import TwitterElment from '../Elements/SocialmediaTwitterElement'

    export default {
        data() {
            return {
                url: '',
                show: false,
            }
        },

        methods: {
            rerender() {
                this.show = false;
                setTimeout(() => this.show = true, 100);
            },

            post() {
                Api.http
                    .post(`/socialmedia`, {
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
