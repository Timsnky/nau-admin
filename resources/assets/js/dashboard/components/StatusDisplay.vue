<template>
    <span>
        <span v-if="status === 'published'" class="label label-sm label-success"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> Publiziert</span>
        <span v-if="status === 'draft'" class="label label-sm label-default"><i class="fa fa-pencil" aria-hidden="true"></i> Entwurf</span>
        <span v-if="status === 'review'" class="label label-sm label-info"><i class="fa fa-search" aria-hidden="true"></i> Review</span>
        <span v-if="status === 'declined'" class="label label-sm label-danger"><i class="fa fa-times" aria-hidden="true"></i> Abgelehnt</span>
        <span v-if="status === 'queued'" class="label label-sm label-info"><i class="fa fa-clock-o" aria-hidden="true"></i> Geplant</span>
    </span>
</template>

<script>
    export default {
        props: {
            status
        }
    }
</script>
