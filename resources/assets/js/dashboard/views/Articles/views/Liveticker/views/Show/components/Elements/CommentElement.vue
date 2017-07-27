<template>
    <div>
        <img class="avatar" :src="comment.author.avatar"></img>
        <p class="name">{{ comment.author.name }}</p>
        <span class="font-grey-cascade linebreaks">{{ comment.content }}</span>
    </div>
</template>
<script>
    export default {
        props: [
            'comment',
        ]
    }
</script>

<style scoped>
    .avatar {
        float: left;
        border-radius: 50% !important;
        width: 60px;
        height: 60px;
        margin-right: 1em;
    }

    p.name {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .linebreaks {
        white-space: pre-line;
    }
</style>
