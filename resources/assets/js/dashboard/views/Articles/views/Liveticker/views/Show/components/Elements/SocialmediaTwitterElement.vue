<template>
    <div class="tweet"></div>
</template>
<script>
    export default {
        props: {
            url: String
        },

        mounted() {
            this.$el.innerHTML = '';
            var parts = this.url.split('/');
            var tweetId = parts.pop() || parts.pop();  // handle potential trailing slash

            twttr.widgets.createTweet(
                tweetId,
                this.$el
                );
        }
    }
</script>
