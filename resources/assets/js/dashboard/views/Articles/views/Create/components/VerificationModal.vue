<template>
    <div class="modal fade" tabindex="-1" role="dialog" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">User für Verifizierung</h4>
                </div>
                <div class="modal-body">
                    <p>Bitte wählen Sie einen User, welcher Ihren Artikel verifizieren soll.</p>

                    <multiselect
                        id="authorsMultiSelect"
                        v-model="user"
                        :options="users"
                        placeholder="Type to search author"
                        label="name"
                        :allow-empty="false"
                        :max-height="500"
                        :options-limit="10"
                        track-by="id"
                        open-direction="bottom"
                        :internal-search="false"
                        @search-change="searchAuthor"
                    />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Abbrechen</button>
                    <button type="button" class="btn btn-primary" :disabled="!selectedUser == null" @click="choose(user)">Speichern & Ready</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
        data() {
            return {
                user: null,
                users: [],
                selectedUser: null,
            }
        },

        components: {
            Multiselect,
        },

        methods: {
            getUserForVerification() {
                this.user = null;
                this.selectedUser = null;
                return new Promise((resolve, reject) => {
                    $(this.$refs.modal).modal()
                        .on('hide.bs.modal', (e) => {
                            if(this.selectedUser) {
                                resolve(this.selectedUser);
                            } else {
                                reject(Error('Modal closed'))
                            }
                        });
                });
            },

            choose(user) {
                this.selectedUser = user;
                $(this.$refs.modal).modal('hide');
            },

            searchAuthor: _.debounce(function(query) {
                Api.http
                    .get(`/authors?search=${query}`)
                    .then(response => {
                        this.users = response.data;
                    });
            }, 400)
        }
    }
</script>

<style>

</style>
