<template>
    <span>
        <i
            v-if="dooh.should_include_video"
            :class="{fa: true, 'fa-film': true, 'font-red': dooh.video_id === null, 'font-green-jungle': dooh.video_id !== null}"
            :title="dooh.video_id === null ? 'Dooh Video fehlt' : 'Dooh Video ist vorhanden'"
        ></i>
    </span>
</template>

<script>
    export default {
        props: {
            dooh: {
                required: true
            }
        }
    }
</script>
