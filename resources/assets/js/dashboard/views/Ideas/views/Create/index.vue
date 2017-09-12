<template>
    <div>
        <page-title title="Ideas" sub="Create" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        v-model.trim="idea.title"
                        placeholder="Add title"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="body">Idea</label>
                    <textarea
                        id="body"
                        name="body"
                        v-model.trim="idea.body"
                        placeholder="Add idea"
                        class="form-control"
                        rows="5"></textarea>
                </div>

                <div class="form-group">
                    <label>Channel</label>
                    <select class="form-control" v-model="idea.channel">
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
                    :disabled="!idea.title || !idea.body">
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
    export default {
        data() {
            return {
                idea: {
                    title: '',
                    body: '',
                    channel: 0
                },
                channels: []
            }
        },

        methods: {
            handleSubmit() {
                const { title, body } = this.idea;

                if (title && body) {
                    Api.http
                        .post('/ideas', { title, body })
                        .then(response => {
                            Vue.toast('Idea created successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                            this.$router.push('/ideas')
                        })
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.idea = {
                    title: '',
                    body: '',
                    channel_id: 0
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
                            this.idea.channel = this.channels[0].id;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the channels. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });

            },
        },
        mounted: function ()
        {
            this.initializeChannels();
        }
    }
</script>
