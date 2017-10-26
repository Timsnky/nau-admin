<template>
    <div>
        <div class="row">
            <div class="col-md-2">
                <div class="form-group">
                    <label>Sportart</label>
                    <select v-model="gameType" class="form-control" @change="fetchMatches">
                        <option :value="null" disabled selected>Bitte Sportart wählen</option>
                        <option v-for="sport in sports" :value="sport.id">{{ sport.name }}</option>
                    </select>
                </div>
            </div>

            <div class="col-md-10" v-if="gameType">
                <div class="form-group">
                    <label>Matches</label>

                    <multiselect
                        v-model="selectedMatches"
                        :options="matches"
                        :close-on-select="false"
                        :show-labels="false"
                        :multiple="true"
                        placeholder="Matches auswählen"
                        :custom-label="customLabel"
                    >
                    <template slot="option" scope="props">
                        <span class="option-league">{{ props.option.league.name }}:</span>
                        <span class="option-vs">
                            <span class="team-home">{{ props.option.team_home }}</span> vs. <span class="team-away">{{ props.option.team_away }}</span>
                        </span>
                        <span class="option-time">({{ moment(props.option.start).format('DD.MM.YY HH:mm') }})</span>
                    </template>
                    </multiselect>
                </div>
            </div>
        </div>

        <div class="form-group">
            <button :disabled="this.selectedMatches.length === 0" type="button" class="btn btn-primary" @click="post">Speichern</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                gameType: null,
                selectedMatches: [],
                matches: [],
                sports: [
                    {id: 1, name: 'Fussball'},
                    {id: 4, name: 'Hockey'},
                ],
                content: '',
                editor: null,
            }
        },

        computed: {
            moment() {
                return moment;
            }
        },

        methods: {
            fetchMatches() {
                Api.http.get(`/sport-matches?type=${this.gameType}`)
                    .then((response) => this.matches = response.data);
            },

            customLabel(match) {
                return match.league.name + ': ' + match.team_home + ' vs. ' + match.team_away;
            },

            async post() {
                var response = await Api.http.post('/sport-tickers', {
                    type: this.gameType,
                    matches: this.selectedMatches.map((match) => { return match.id }),
                });

                await Api.http.put(`/livetickers/${this.$route.params.article}/sport-tickers/${response.data.id}`);

                this.$emit('new-post');
                Vue.toast('Liveticker wurde erstellt', {
                    className : ['nau_toast','et-info'],
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .option-league {
        font-style: italic;
    }

    .option-vs {
        .team-home, .team-away {
            font-weight: bold;
        }
    }
</style>
