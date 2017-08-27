<template>
    <span class="character_counter">{{remainingCount}} von {{limit}} Zeichen übrig</span>
</template>

<script>
    export default {
        props: {
            limit: {
                type: Number
            },
            itemString: {
                type: String
            }
        },

        computed: {
            remainingCount()
            {
                return this.limit - this.itemString.length > 0 ? this.limit - this.itemString.length : 0;
            }
        },
    }
</script>
<style>
    .character_counter {
        float: right;
        font-size: 11px;
        font-style: italic;
        color: gray;
    }
</style>
