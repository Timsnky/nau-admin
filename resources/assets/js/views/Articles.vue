<template>
    <div>
    	<page-title title="All Articles" sub="sub heading"></page-title>
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
                    <tr v-for="article in articles" :key="article.id">
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
export default {
    data() {
            return {
                articles: []
            }
        },

        mounted() {
            axios
                .get('https://api-naut.livesystems.ch/articles')
                .then(response => this.articles = response.data);
        }
}
</script>
