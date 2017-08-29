<template>
    <div>
        <page-title title="Images" sub="Edit" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="edit_image_section">
                    <img class="media-object" :src="oldImageDetails.url" alt="...">
                </div>
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
                    <div class="source_div">
                        <input
                                id="source"
                                type="text"
                                name="source"
                                v-model.trim="newImageDetails.source"
                                placeholder="Source"
                                class="form-control source_input">
                        <select class="form-control helper_input" @change="imageSourceSelected()" v-model="selectedSource">
                            <option v-bind:value="source.name" v-for="source in sources">
                                {{ source.displayName}}
                            </option>
                        </select>
                    </div>
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

    export default {
        data() {
            return {
                oldImageDetails: {},
                newImageDetails: {},
                selectedSource: '',
                sources: [
                    {
                        name: '',
                        displayName: 'Select source (optional)'
                    },
                    {
                        name: 'dpa',
                        displayName: 'Dpa'
                    },
                    {
                        name: 'getty',
                        displayName: 'Getty'
                    },
                    {
                        name: 'dukas',
                        displayName: 'Dukas'
                    },
                    {
                        name: 'reuters',
                        displayName: 'Reuters'
                    },
                    {
                        name: 'zvg',
                        displayName: 'Zvg'
                    }
                ]
            }
        },

        mounted() {
            Api.http
                .get(`/images/${this.$route.params.id}`)
                .then(response => {
                    this.oldImageDetails = response.data;
                    this.newImageDetails = _pick(this.oldImageDetails, ['name', 'lead', 'source']);
                })
                .catch(err => Vue.toast('Error in retrieving the image. Please refresh the page', {
                    className : ['nau_toast','nau_warning'],
                }));
        },

        methods: {
            handleSubmit() {
                const { name, lead, source } = this.newImageDetails;

                if (name && lead && source) {
                    Api.http
                        .put(`/images/${this.oldImageDetails.id}`, { name, lead, source })
                        .then(response => this.$router.push('/images'))
                        .catch(err => Vue.toast('Error in updating the Image. Please retry again', {
                            className : ['nau_toast','nau_warning'],
                        }));
                } else {
                    Vue.toast('Please provide the name, lead and source for the image', {
                        className : ['nau_toast','nau_warning'],
                    });
                }
            },

            reset() {
                this.newImageDetails = _pick(this.oldImageDetails, ['name', 'lead' , 'source']);
            },

            //Save selected source of article image
            imageSourceSelected()
            {
                this.newImageDetails.source = this.selectedSource;
            },
        }
    }
</script>

<style lang="scss">
    .edit_image_section {
        height: 400px;
        margin-bottom: 20px;
    }

    .edit_image_section img {
        height: 100%;
        display: block;
        margin: auto;
    }
</style>
