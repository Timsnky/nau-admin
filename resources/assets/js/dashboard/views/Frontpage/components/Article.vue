<template>
    <div class="article">
        <img :src="article.image">
        <h3>{{ article.title }}</h3>
        <h4>{{ article.dateline }} - {{ article.lead }}</h4>
    </div>
</template>

<script>
    export default {
        props: {
            article: Object
        },

        mounted() {

        },
    }
</script>

<style lang="scss" scoped>
    .article {
        width: 100%;

        img {
            width: 100%;
        }
    }
</style>
