<template>
    <div class="tweet"></div>
</template>
<script>
    export default {
        props: {
            url: String
        },

        watch: {
            url(newUrl) {
                this.debounce(this);
            }
        },

        methods: {
            debounce: _.debounce((vm) => {
                vm.createTweet();
            }, 400),

            createTweet() {
                let vm = this;
                this.$el.innerHTML = '';
                let parts = this.url.split('/');
                let tweetId = parts.pop() || parts.pop();  // handle potential trailing slash

                twttr.ready(
                    function(evt) {
                        twttr.widgets.createTweet(tweetId, vm.$el)
                    }
                );
            }
        },

        mounted()
        {
            this.createTweet();
        }
    }
</script>
