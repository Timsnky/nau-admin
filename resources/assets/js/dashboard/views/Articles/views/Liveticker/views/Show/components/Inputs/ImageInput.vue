<template>
    <div>
        <div class="form-group">
            <button type="button" @click="showImageSelectionModal" class="btn blue">Bild auswählen oder hochladen</button>
        </div>

        <div class="row" v-if="hasImage">
            <div class="col-md-6 col-lg-4">
                <img :src="image.url" class="img-responsive">
            </div>

            <div class="col-md-6 col-lg-8">
                <div class="form-group">
                    <label>Lead</label>
                    <input type="text" v-model="image.lead" class="form-control">
                </div>

                <div class="form-group">
                    <label>Quelle</label>
                    <input type="text" v-model="image.source" class="form-control">
                </div>

                <div class="form-group">
                    <button :disabled="!hasImage" type="button" class="btn blue" @click="post">Posten</button>
                </div>
            </div>
        </div>

        <image-select-modal></image-select-modal>
    </div>
</template>
<script>
    import ImageSelectModal from 'dashboard/components/ImageSelectModal';

    export default {
        data() {
            return {
                image: {},
            }
        },

        computed: {
            selectedImageId()
            {
                return Api.getImage();
            },

            hasImage() {
                return !_.isEmpty(this.image);
            }
        },

        watch: {
            selectedImageId(image) {
                if(image === null) {
                    return;
                }

                this.getImage(image).then(({data}) => {
                    this.image = data;
                });
            }
        },

        methods: {
            async post() {
                await Api.http.put(`/images/${this.image.id}`, {
                    lead: this.image.lead,
                    source: this.image.source,
                });
                await Api.http.put(`/livetickers/${this.$route.params.article}/images/${this.image.id}`);
                this.$emit('new-post');
                Vue.toast('Liveticker wurde erstellt', {
                    className : ['nau_toast','et-info'],
                });
            },

            getImage(id) {
                return Api.http.get(`/images/${id}`);
            },

            showImageSelectionModal()
            {
                Api.resetImage();
                Api.setImageType(0);
                this.$emit('imageTypeChange');
                $('#imageSelectionModal').modal('show');
            },
        },

        components: {
            ImageSelectModal
        }
    }
</script>
