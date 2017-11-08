<template>
    <div>
        <page-title
            title="Topics"
            sub="Create"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label>Datum</label>
                    <date-time v-model="topic.date" format="DD.MM.YYYY" />
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
                    class="btn blue"
                    type="submit"
                    :disabled="!topic.name || !topic.date">
                    Erstellen
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
                    date: moment(this.$route.query.date),
                    channel: null,
                }
            }
        },

        components: {
            dateTime: DateTime,
        },

        created() {
            Api.http.get('/channels')
                .then(response => {
                    this.channels = response.data;
                    this.topic.channel = this.channels[0].id;
                })
        },

        methods: {
            async handleSubmit() {
                const { name, date, channel } = this.topic;

                if (name && date && channel) {
                    var response = await Api.http.post('/topics', { name, date: date.format('YYYY-MM-DD'), channel_id: channel })
                    this.$router.push({name: 'resources.day', params: { date: date.format('YYYY-MM-DD') }});
                } else {
                    console.log('Show some error message here');
                }
            },
        }
    }
</script>
