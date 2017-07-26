<template>
    <div>
        <div class="video">
            <iframe width="560" height="315" :src="'https://www.youtube.com/embed/' + this.youtubeId" frameborder="0" allowfullscreen></iframe>
        </div>
        <p>{{ element.lead }}</p>
    </div>

</template>
<script>
    export default {
        props: [
            'element',
        ],

        data() {
            return {
                youtubeId: null,
            }
        },

        methods: {
            getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
        },

        mounted() {
            switch(this.element.provider) {
                case 'streamable':
                    axios.get('https://api.streamable.com/oembed.json?url=' + this.element.url)
                        .then((response) => {
                            $(this.$el).find('.video').html(response.data.html);
                        });
                    break;

                case 'youtube':
                    this.youtubeId = this.getParameterByName('v', this.element.url);
                    break;
            }

        }
    }
</script>
<style lang="scss" scoped>
    .video {
        width: 40%;
    }
</style>
