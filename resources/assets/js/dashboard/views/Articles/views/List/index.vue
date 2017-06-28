<template>
    <div>
        <page-title title="Articles" />
        <div class="row">
            <div class="col-md-6">
            </div>
            <div class="col-md-6 text-right">
                <router-link
                    :to="{name: 'articles.create'}"
                    class="btn btn-primary pull-right">
                    Create
                </router-link>
            </div>
        </div>

        <div class="table-scrollable">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Lead</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="article in articles"
                    :key="article.id">
                    <td>{{ article.id }}</td>
                    <td>{{ article.title }}</td>
                    <td>{{ article.lead }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import request from 'dashboard/utils/request';

    export default {
        data() {
            return {
                articles: []
            }
        },

        created() {
            request
                .get('/articles')
                .then(response => this.articles = response.data);
        }
    }
</script>
