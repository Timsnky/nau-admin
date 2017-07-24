<template>
    <div id="tweet"></div>
</template>
<script>
    export default {
        props: {
            url: String
        },

        mounted() {
            document.getElementById('tweet').innerHTML = '';
            var parts = this.url.split('/');
            var tweetId = parts.pop() || parts.pop();  // handle potential trailing slash

            twttr.widgets.createTweet(
                tweetId,
                document.getElementById('tweet'),
                );
        }
    }
</script>
