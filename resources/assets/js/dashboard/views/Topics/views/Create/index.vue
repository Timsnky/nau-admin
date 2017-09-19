<template>
    <div>
        <page-title
            title="Topics"
            sub="Create"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label>Datum</label>
                    <date-time
                        @changeDate="changeDate"
                        :date="date" />
                </div>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="topic.name"
                        placeholder="Name"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="name">Channel</label>
                    <select v-model="topic.channel" class="form-control">
                        <option v-for="channel in channels" :value="channel.id">{{ channel.display_name }}</option>
                    </select>
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!topic.name || !topic.date">
                    Erstellen
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
    import DateTime from 'dashboard/components/DateTime';

    export default {
        data() {
            return {
                channels: [],
                topic: {
                    name: '',
                    date: this.$route.query.date,
                    channel: null,
                }
            }
        },

        components: {
            dateTime: DateTime,
        },

        computed: {
            date() {
                return moment(this.topic.date).format('YYYY-MM-DD');
            },
        },

        created() {
            Api.http.get('/channels')
                .then(response => {
                    this.channels = response.data;
                    this.topic.channel = this.channels[0].id;
                })
        },

        methods: {
            handleSubmit() {
                const { name, date, channel } = this.topic;

                if (name && date) {
                    Api.http
                        .post('/topics', { name, date: this.date, channel_id: channel })
                        .then(response => this.$router.push({name: 'resources.day', params: { date }}))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.topic = {
                    name: '',
                    date: this.$route.query.date
                }
            },

            changeDate(date) {
                this.topic.date = date;
            }
        }
    }
</script>
