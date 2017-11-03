<template>
    <article :class="layout.class">
        <div class="overlay" v-if="layout.editable">
            <div class="content text-center">
                <div class="btn-group">
                    <button @click="$emit('add')" class="btn blue btn-outline"><i class="fa fa-plus"></i> Hinzufügen</button>
                    <button @click="$emit('replace')" class="btn blue btn-outline"><i class="fa fa-files-o"></i> Ersetzen</button>
                </div>
            </div>
        </div>
        <img class="article-image" :src="layout.teaser ? article.teaser.url : article.image.url">
        <div class="article-card">
            <span class="article-dateline">{{ article.dateline }}</span>
            <span class="article-title">{{ article.title }}</span>
        </div>
    </article>
</template>

<script>
    export default {
        props: [
            'layout',
            'article',
        ]
    }
</script>

<style lang="scss" scoped>
    article {
        margin-bottom: 16px;
        position: relative;

        .overlay {
            padding-top: calc(50% - 15px);
            width: calc(100% - 30px);
            transition: visibility .5s, opacity .5s, opacity .5s;
            background-color: rgba(47, 53, 59, .9);
            position: absolute;
            visibility: hidden;
            opacity: 0;

            .content {
                width: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        &:hover {
            .overlay {
                opacity: 1;
                visibility: visible;
                transition: visibility .5s, visibility .0s, opacity .5s;

            }
        }

        &.teaser {
            .article-card {
                display: none;
            }
        }

        img.article-image {
            width: 100%;
        }

        .article-card {
            font-family: Lato;
            font-weight: 100;
            font-size: 1.25em;
            line-height: normal;
            font-weight: bold;
            margin-top: .5em;

            .article-dateline {
                color: #da374c;
            }

            .article-title {
                &:before {
                    content: ' – ';
                }
            }
        }
    }
</style>
