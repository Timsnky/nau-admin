<template>
    <span>
        <span v-if="status === 'published'" class="label bg-font-blue-dark bg-blue-dark"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> Publiziert</span>
        <span v-if="status === 'draft'" class="label bg-font-default bg-default"><i class="fa fa-pencil" aria-hidden="true"></i> Entwurf</span>
        <span v-if="status === 'review'" class="label bg-font-blue bg-blue"><i class="fa fa-search" aria-hidden="true"></i> Review</span>
        <span v-if="status === 'ready'" class="label bg-font-blue bg-blue"><i class="fa fa-calendar-o" aria-hidden="true"></i> Bereit</span>
        <span v-if="status === 'verified'" class="label bg-font-green bg-green"><i class="fa fa-check" aria-hidden="true"></i> Verifiziert</span>
        <span v-if="status === 'declined'" class="label bg-font-red bg-red"><i class="fa fa-times" aria-hidden="true"></i> Abgelehnt</span>
        <span v-if="status === 'queued'" class="label bg-font-blue bg-blue"><i class="fa fa-clock-o" aria-hidden="true"></i> Geplant</span>
    </span>
</template>

<script>
    export default {
        props: {
            status
        }
    }
</script>
