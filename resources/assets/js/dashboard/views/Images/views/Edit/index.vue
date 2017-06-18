<template>
    <div>
        <page-title title="Images" sub="Edit" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="newImageDetails.name"
                        placeholder="Name"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="lead">Lead</label>
                    <textarea
                        id="lead"
                        name="lead"
                        v-model.trim="newImageDetails.lead"
                        placeholder="Lead"
                        class="form-control"
                        rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="name">Source</label>
                    <input
                            id="source"
                            type="text"
                            name="source"
                            v-model.trim="newImageDetails.source"
                            placeholder="Source"
                            class="form-control">
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newImageDetails.name || !newImageDetails.lead || !newImageDetails.source">
                    Submit
                </button>
                <button
                    class="btn btn-default"
                    type="button"
                    @click="reset">
                    Reset
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';
    import request from 'dashboard/utils/request';

    export default {
        data() {
            return {
                oldImageDetails: {},
                newImageDetails: {}
            }
        },

        mounted() {
            request
                .get(`/images/${this.$route.params.id}`)
                .then(response => {
                    this.oldImageDetails = response.data;
                    this.newImageDetails = _pick(this.oldImageDetails, ['name', 'lead', 'source']);
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                const { name, lead, source } = this.newImageDetails;

                if (name && lead && source) {
                    request
                        .put(`/images/${this.oldImageDetails.id}`, { name, lead, source })
                        .then(response => this.$router.push('/images'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newImageDetails = _pick(this.oldImageDetails, ['name', 'lead' , 'source']);
            }
        }
    }
</script>