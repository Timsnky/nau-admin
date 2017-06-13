<template>
    <li :class="{'active': page === currentPage}">
        <a @click="navigate">{{page}}</a>
    </li>
</template>

<script>
    export default {
        props: {
            page: Number,
            currentPage: Number,
        },

        methods: {
            navigate() {
                this.$emit('navigate', this.page);
            },
        },
    };
</script>
