<template>
    <div>
        <page-title title="Live Artikel" />

        <div class="row" v-if="articles.length === 0">
            <div class="col-md-6">

                <div class="form-group">
                    <multiselect
                        v-model="selectedArticle"
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
                        <template slot="clear" slot-scope="props">
                            <div class="multiselect__clear" v-if="options.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
                        </template><span slot="noResult">Keine Artikel gefunden</span>
                    </multiselect>
                </div>

                <div class="form-group">
                    <button type="button" class="btn btn-success" @click="nowLive(selectedArticle)">Hinzufügen</button>
                </div>
            </div>
        </div>

        <table class="table table-hover" v-else>
            <thead>
            <tr>
                <th>Titel</th>
                <th>Autor</th>
                <th><!-- Status --></th>
                <th>Publikationsdatum</th>
                <th>Optionen</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="article in articles"
                :key="article.id">
                <td>{{ article.title }}</td>
                <td>{{ article.authors[0] ? article.authors[0].name : '' }}</td>
                <td>
                    <span v-if="article.published" class="label label-sm label-success">Publiziert</span>
                </td>
                <td>{{ publicationDate(article) }}</td>
                <td>
                    <button type="button" class="btn btn-danger" @click="removeLive(article)">Entfernen</button>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                articles: [],
                options: [],
                selectedArticle: {},
                isLoading: false,
            }
        },

        created() {
            Api.http
                .get(`/live-articles`)
                .then(response => {
                    this.articles = response.data;
                });
        },

        methods: {
            publicationDate(article)
            {
                return moment(article.published_at).format('HH:mm DD.MM.YY');
            },

            searchArticle: _.debounce(function (query) {
                if(!query) {
                    this.options = [];
                    return;
                }

                Api.http.get(`/articles?search=${query}`)
                    .then((response) => {
                        this.options = response.data.data;
                        this.isLoading = false
                    })
            }, 400),

            removeLive(article) {
                Api.http.delete(`/articles/${article.id}/live`);
                this.articles.splice(
                    this.articles.indexOf(article),
                    1
                );
            },

            nowLive(article) {
                Api.http.put(`/articles/${article.id}/live`);
                this.articles.push(article);
            },
        }
    }
</script>
