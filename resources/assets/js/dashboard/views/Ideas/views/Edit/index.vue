<template>
    <div id="ideaCreateSection">
        <page-title title="Ideas" sub="Edit" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        v-model.trim="newIdea.title"
                        placeholder="Add title"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="body">Idea</label>
                    <textarea
                        id="body"
                        name="body"
                        v-model.trim="newIdea.body"
                        placeholder="Edit idea"
                        class="form-control"
                        rows="5"></textarea>
                </div>
                <div class="form-group">
                    <label>Channel</label>
                    <select class="form-control" v-model="newIdea.channel_id">
                        <option v-bind:value="channel.id" v-for="channel in channels">
                            {{ channel.display_name }}
                        </option>
                    </select>
                </div>
                <div>
                    <h4>Images</h4>
                    <div class="row media_overflow">
                        <div class="media_images">
                            <div class="col-md-3 media_image image_section_height" v-for="(image, index) in ideaImages">
                                <img :src="image.url" alt="">
                                <div class="form-group">
                                    <button
                                            class="btn btn-danger btn-sm remove_btn"
                                            type="button"
                                            @click="confirmIdeaImageDelete(index)">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions selection_sections">
                    <div class="form-group">
                        <button type="button" class="btn btn-primary image_selection_btn"
                                @click="showImageSelectionModal()">
                            Bilder Hochladen
                        </button>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newIdea.title || !newIdea.body || !newIdea.channel_id">
                    Submit
                </button>
                <button
                    class="btn btn-default"
                    type="button"
                    @click="reset">
                    Reset
                </button>
            </div>
            <image-select-modal></image-select-modal>
        </form>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';
    import ImageSelectModal from 'dashboard/components/ImageSelectModal';

    export default {
        data() {
            return {
                idea: {},
                channels: [],
                newIdea: {},
                ideaImages: [],
                imageSelectorId: 6
            }
        },

        computed: {
            //Get the selected image id from the modal
            selectedImageId()
            {
                return Api.getImage();
            },
        },

        watch: {
            selectedImageId(newId, oldId)
            {
                if(newId && Api.getImageSelector() === this.imageSelectorId)
                {
                    Api.resetImage();
                    Api.resetImageSelector();
                    this.getImage(newId);
                }
            },
        },

        components: {
            'image-select-modal': ImageSelectModal
        },

        mounted()
        {
            this.initializeChannels();
            Api.http
                .get(`/ideas/${this.$route.params.id}`)
                .then(response => {
                    this.idea = response.data;
                    this.newIdea = _pick(this.idea, ['title', 'body', 'channel_id']);
                    this.ideaImages = response.data.images;
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                Api.http
                    .put(`/ideas/${this.idea.id}`, {
                        'title': this.newIdea.title,
                        'body': this.newIdea.body,
                        'channel': this.newIdea.channel_id
                    })
                    .then(response =>
                    {
                        this.idea = response.data;
                        this.uploadIdeaImages();
                        Vue.toast('Idea updated successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                        this.$router.push('/ideas')
                    }).catch(err => console.log('Show some error message here'));
            },

            reset() {
                this.newIdea = _pick(this.idea, ['title', 'body', 'channel_id']);
            },

            //Show the image selection modal
            showImageSelectionModal()
            {
                Api.setImageSelector(this.imageSelectorId);

                $('#imageSelectionModal').modal('show');
            },

            //Get an image based on its id
            getImage(id)
            {
                Api.http
                    .get(`/images/${id}`)
                    .then(response =>
                    {
                        if(response.status === 200)
                        {
                            this.ideaImages.push(response.data);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the selected Image. Please retry again', {
                                className : ['nau_toast','nau_warning'],
                            });
                        }
                    });
            },

            //Upload idea images and link them to idea
            uploadIdeaImages()
            {
                let vm = this;

                this.ideaImages.forEach(function (value, key)
                {
                    if(! (value.pivot && value.pivot.idea_id === vm.idea.id))
                    {
                        vm.linkImageToIdea(key, vm.idea.id);
                    }
                });
            },

            //Link an image to an idea
            linkImageToIdea(key, ideaId)
            {
                Api.http
                    .put(`/ideas/${ideaId}/images/${this.ideaImages[key].id}`)
                    .then(response => {
                        if (response.status === 204)
                        {
                            Vue.toast('Image linked to idea successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in linking the image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Confirm the delete of an idea
            confirmIdeaImageDelete(key)
            {
                swal({
                    title: 'Bist du sicher?',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Verwerfen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, löschen'
                }).then(() => {
                    this.deleteIdeaImage(key)
                }).catch(swal.noop);
            },

            //Delete an image from an idea
            deleteIdeaImage(key)
            {
                let vm = this;

                if(vm.ideaImages[key].pivot)
                {
                    Api.http
                        .delete(`/ideas/${vm.idea.id}/images/${vm.ideaImages[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.ideaImages.splice(key, 1);
                                Vue.toast('Idea image detached successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.ideaImages.splice(key, 1);

                    Vue.toast('Idea image detached successfully', {
                        className: ['nau_toast', 'nau_success'],
                    });
                }
            },

            //Get the channels for the dropdown
            initializeChannels()
            {
                Api.http
                    .get(`/channels`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.channels = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the channels. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });

            },
        }
    }
</script>
