<template>
    <div>
        <multiselect
        v-model="selected"
        placeholder="Artikel Suchen"
        label="title"
        :max-height="500"
        :options="options"
        :loading="isLoading"
        :options-limit="20"
        :clear-on-select="true"
        :close-on-select="true"
        track-by="id"
        open-direction="bottom"
        :show-labels="false"
        :internal-search="false"
        @search-change="searchArticle">
        <template slot="option" scope="props">
            <img class="option-image" width="140" height="70" :src="(props.option.teaser ? props.option.teaser.url : props.option.image.url) + '?w=140&h70'" :alt="props.option.title">
            <div class="option-desc">
                <span class="option-title">{{ props.option.dateline }} - <b>{{ props.option.title }}</b></span>
            </div>
        </template>
        <span slot="noResult">Keine Artikel gefunden</span>
    </multiselect>
</div>
</template>

<script>
    export default {
        props: ['value'],
        data() {
            return {
                options: [],
                isLoading: false,
            }
        },

        computed: {
            selected: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        },

        methods: {
            searchArticle: _.debounce(function (query) {
                if(!query) {
                    this.options = [];
                    return;
                }

                Api.http.get(`/articles?search=${query}&status=published`)
                .then((response) => {
                    console.log(response.data);
                    this.options = response.data.data;
                    this.isLoading = false
                })
            }, 400),
        },
    }
</script>

<style lang="scss" scoped>
    .multiselect {
        .multiselect__element {
            .option-image {
                width: 140px;
                height: 70px;
            }

            .option-desc {
                display: inline-block;
                vertical-align: top;
            }
        }
    }
</style>

