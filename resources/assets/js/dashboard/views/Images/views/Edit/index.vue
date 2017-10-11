<template>
    <div>
        <page-title title="Bild" sub="Edit" />

        <form @submit.prevent="handleSubmit">
            <div class="row">
                <div class="col-md-6">
                    <div class="edit_image_section">
                        <img v-if="oldImageDetails.type_id == 2 || oldImageDetails.type_id == 3" class="media-object" :src="oldImageDetails.url + '?w=1024&h=512'" :alt="oldImageDetails.name">
                        <img v-if="oldImageDetails.type_id == 1 || oldImageDetails.type_id == 4" class="media-object" :src="oldImageDetails.url + '?size=large'" :alt="oldImageDetails.name">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">Name *</label>
                        <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="newImageDetails.name"
                        placeholder="Name"
                        class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="lead">SEO - Beschrieb</label>
                        <textarea
                        id="lead"
                        name="lead"
                        v-model.trim="newImageDetails.lead"
                        placeholder="SEO - Beschrieb"
                        class="form-control"
                        rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="name">Quelle *</label>
                        <div class="source_div">
                            <input
                            id="source"
                            type="text"
                            name="source"
                            v-model.trim="newImageDetails.source"
                            placeholder="Quelle"
                            class="form-control source_input">
                            <select class="form-control helper_input" @change="imageSourceSelected()" v-model="selectedSource">
                                <option v-bind:value="source.name" v-for="source in sources">
                                    {{ source.displayName}}
                                </option>
                            </select>
                        </div>
                    </div>

                    <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newImageDetails.name || !newImageDetails.lead || !newImageDetails.source"
                    >Speichern</button>
                </div>
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
                    displayName: 'Quelle  auswählen'
                },
                {
                    name: 'Dpa',
                    displayName: 'Dpa'
                },
                {
                    name: 'Getty',
                    displayName: 'Getty'
                },
                {
                    name: 'Dukas',
                    displayName: 'Dukas'
                },
                {
                    name: 'Reuters',
                    displayName: 'Reuters'
                },
                {
                    name: 'Zvg',
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

            //Save selected source of article image
            imageSourceSelected()
            {
                this.newImageDetails.source = this.selectedSource;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .edit_image_section {
        width: 100%;

        img {
            width: 100%;
        }
    }
</style>
