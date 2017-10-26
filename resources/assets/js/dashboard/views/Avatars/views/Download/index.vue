<template>
    <div>
        <page-title title="Avatars" sub="Download" />

        <div class="form-group">
            <multiselect
                v-model="selected"
                :options="users"
                placeholder="Benutzer Suchen"
                label="name"
                :max-height="500"
                :close-on-select="true"
                track-by="id"
                open-direction="bottom"
                :internal-search="false"
                @search-change="searchAuthors"
            />
        </div>

        <div class="form-group">
            <button @click="download" :disabled="selected === null" class="btn btn-primary">Download</button>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'dashboard/components/DateTime';

    export default {
        data() {
            return {
                selected: null,
                users: [],
            }
        },

        methods: {
            download() {
                window.open(env.API_DOMAIN + `/avatars/${this.selected.id}/download`, '_blank');
            },

            searchAuthors: _.debounce(function (query) {
                if(!query) {
                    return false;
                }

                Api.http
                    .get(`/users?search=${query}`)
                    .then(response => {
                        this.users = response.data;
                    });
            }, 500),
        }
    }
</script>
