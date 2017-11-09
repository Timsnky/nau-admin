<template>
    <div>
        <h4>Sport Ticker</h4>
        Start: {{ moment(element.start).format('DD.MM.YYYY HH:mm') }}<br>
        Matches:
        <ul>
            <li v-for="match in element.matches">
                <i>{{ match.league.name }}:</i>
                <b>{{ match.team_home }}</b> vs. <b>{{ match.team_away }}</b>
                ({{ moment(match.start).format('DD.MM.YYYY HH:mm') }})
                <router-link
                :to="{name: 'sportticker.replacements', query: {match: match.id}}"
                >
                <i class="fa fa-globe"></i> Texte Übersetzen
            </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: [
            'element'
        ],

        computed: {
            moment() {
                return moment;
            }
        },

        components: {

        },
    }
</script>
