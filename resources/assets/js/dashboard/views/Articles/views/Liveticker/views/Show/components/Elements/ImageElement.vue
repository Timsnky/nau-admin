<template>
    <div class="row">
        <div class="col-md-6 col-lg-4">
            <img :src="element.url" class="img-responsive">
            <p>{{ element.lead }} - {{ element.source }}</p>
        </div>

    </div>
</template>
<script>
    export default {
        props: [
            'element',
        ],
    }
</script>
