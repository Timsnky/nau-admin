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
                console.log(newUrl);
                this.debounce(this);
            }
        },

        methods: {
            debounce: _.debounce((vm) => {
                debugger;
                vm.createTweet();
            }, 400),

            createTweet() {
                this.$el.innerHTML = '';
                var parts = this.url.split('/');
                var tweetId = parts.pop() || parts.pop();  // handle potential trailing slash

                twttr.widgets.createTweet(tweetId, this.$el);
            }
        },

        mounted() {
            this.createTweet();
        }
    }
</script>
