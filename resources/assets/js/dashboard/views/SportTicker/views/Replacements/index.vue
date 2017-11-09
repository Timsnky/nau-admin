<template>
    <div>
        <page-title title="Sport Ticker Übersetzungstabelle" />
        <div class="row">
            <div class="col-md-4">
                <div class="input-icon">
                    <i class="fa fa-search"></i>
                    <input
                    type="search"
                    class="form-control"
                    placeholder="Suche"
                    name="searchTerm"
                    v-model.trim="searchTerm">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Original</th>
                            <th>Übersetzt</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.original }}</td>
                            <td>{{ item.replace }}</td>
                            <td class="text-right">
                                <router-link
                                    :to="{name: 'sportticker.replacements.edit', params: {id: item.id}}"
                                    class="btn btn-warning btn-sm">
                                    <i class="fa fa-edit"></i> Bearbeiten
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="clearfix">
                    <pagination
                    class="pull-right"
                    :items="items"
                    :currentPage="currentPage"
                    :pagesCount="pagesCount"
                    :itemsPerPage="itemsPerPage"
                    @navigate="navigate"/>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'match'
        ],

        data() {
            return {
                items: [],
                currentPage: 1,
                pagesCount: 0,
                itemsPerPage: 15,
                searchTerm: '',
            }
        },

        watch: {
            searchTerm: _.debounce(function () {
                this.navigate(1);
            }, 400),
        },

        methods: {
            navigate(page) {
                this.getPaginatedData(page)
                .then(response => {
                    const { data, current_page, last_page } = response.data;

                    this.items = data;
                    this.currentPage = current_page;
                    this.pagesCount = last_page;
                })
                .catch(err => Vue.toast('Ein Fehler ist aufgetreten', {
                    className : ['nau_toast','nau_warning'],
                }));
            },

            getPaginatedData(page) {
                var params = {
                    page: page,
                };

                if (this.searchTerm !== '') {
                    params.search = this.searchTerm;
                }

                if (this.match) {
                    if(!Array.isArray(this.match)) {
                        var match = [this.match];
                    } else {
                        var match = [this.match];
                    }
                    params.match = match;
                }

                return Api.http.get(`/sport-ticker-replacements?${$.param(params)}`);
            }
        },

        mounted() {
            this.navigate(1);
        }
    }
</script>
