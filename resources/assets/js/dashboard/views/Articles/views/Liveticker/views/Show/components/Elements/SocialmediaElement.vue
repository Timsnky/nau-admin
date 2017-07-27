<template>
    <div>
        <twitter v-if="element.provider === 'twitter'" :url="element.url"></twitter>
    </div>
</template>
<script>
    import Twitter from 'dashboard/components/TwitterTweet';

    export default {
        props: [
            'element'
        ],

        components: {
            'twitter': Twitter
        },
    }
</script>
