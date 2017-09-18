<template>
    <div>
        <page-title title="Topics" sub="Edit" />

        <form @submit.prevent="handleSubmit" v-if="topic.id">
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
                        placeholder="Add name"
                        class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="name">Channel</label>
                <select v-model="topic.channel_id" class="form-control">
                    <option v-for="channel in channels" :value="channel.id">{{ channel.display_name }}</option>
                </select>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!topic.name || !topic.date">
                    Bearbeiten
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';
    import DateTime from 'dashboard/components/DateTime';
    import DateAndTime from 'dashboard/components/DateAndTime';

    export default {
        data() {
            return {
                channels: [],
                topic: {},
            }
        },

        components: {
            dateTime: DateTime,
            dateAndTime: DateAndTime,
        },

        computed: {
            date() {
                return moment(this.topic.date).format('YYYY-MM-DD');
            },
        },

        created() {
            Api.http
                .get(`/topics/${this.$route.params.id}`)
                .then(response => {
                    this.topic = {
                        id: response.data.id,
                        name: response.data.name,
                        date: moment(response.data.date).format('YYYY-MM-DD'),
                        channel_id: response.data.channel_id,
                    };
                })
                .catch(err => console.log('Show some error message here'));

            Api.http.get('/channels')
                .then(response => {
                    this.channels = response.data;
                })
        },

        methods: {
            handleSubmit() {
                const { name, date, channel_id } = this.topic;

                if (name && date) {
                    Api.http
                        .put(`/topics/${this.topic.id}`, { name, date: moment(date).format('YYYY-MM-DD'), channel_id })
                        .then(response => this.$router.push({name: 'resources.day', params: {date: moment(this.topic.date).format('YYYY-MM-DD')}}))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            changeDate(date) {
                this.topic.date = date;
            }
        }
    }
</script>
