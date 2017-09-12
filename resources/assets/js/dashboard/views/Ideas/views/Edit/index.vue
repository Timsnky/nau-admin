<template>
    <div>
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
        </form>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';

    export default {
        data() {
            return {
                idea: {},
                channels: [],
                newIdea: {}
            }
        },

        mounted() {
            Api.http
                .get(`/ideas/${this.$route.params.id}`)
                .then(response => {
                    this.idea = response.data;
                    this.newIdea = _pick(this.idea, ['title', 'body', 'channel_id']);
                })
                .catch(err => console.log('Show some error message here'));
            this.initializeChannels();
        },

        methods: {
            handleSubmit() {
                Api.http
                    .put(`/ideas/${this.idea.id}`, {
                        'title': this.newIdea.title,
                        'body': this.newIdea.body,
                        'channel': this.newIdea.channel_id
                    })
                    .then(response => {
                        Vue.toast('Idea updated successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                        this.$router.push('/ideas')
                    }).catch(err => console.log('Show some error message here'));
            },

            reset() {
                this.newIdea = _pick(this.idea, ['title', 'body', 'channel_id']);
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
