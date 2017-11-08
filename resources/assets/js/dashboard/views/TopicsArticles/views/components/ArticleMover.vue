<template>
    <div class="form-group">
        <label>Artikel in folgendes Thema verschieben</label>
        <multiselect
            v-model="selected"
            placeholder="Thema suchen"
            label="Thema"
            :options="options"
            :max-height="500"
            :options-limit="20"
            :clear-on-select="true"
            :close-on-select="true"
            track-by="id"
            open-direction="bottom"
            :show-labels="false"
            :internal-search="false"
            :customLabel="customLabel"
        />
    </div>
</template>

<script>
    export default {
        props: [
            'article-id',
            'current-topic-id',
            'value',
        ],

        data() {
            return {
                options: [],
                selected: null,
            };
        },

        watch: {
            selected() {
                this.$emit('input', this.selected);
            }
        },

        async created() {
            let params = {
                start: moment().subtract(3, 'days').format('YYYY-MM-DD'),
            };
            let response = await Api.http.get(`/topics?${$.param(params)}`);

            this.options = response.data.filter((topic) => {
                return topic.id != this.currentTopicId;
            });

            if(this.value) {
                this.selected = this.value;
            }
        },

        methods: {
            customLabel(topic) {
                return moment(topic.date).format('DD.MM.YYYY') + ' ' + topic.name
            }
        }
    }
</script>
