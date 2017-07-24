<template>
    <nav v-if="this.pagesCount > 1">
        <ul class="pagination">
            <li :class="{'disabled': currentPage === 1}">
                <a
                    aria-label="Previous"
                    @click="stepDown">
                    Previous
                </a>
            </li>
            <pagination-link
                v-for="(page, index) in pagesCount"
                :page="page"
                :currentPage="currentPage"
                @navigate="navigate"
                :key="index"/>
            <li :class="{'disabled': currentPage === pagesCount}">
                <a
                    aria-label="Next"
                    @click="stepUp">
                    Next
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    import PaginationLink from './Link';

    export default {
        props: {
            items: Array,
            currentPage: Number,
            pagesCount: Number,
            itemsPerPage: Number,
        },

        components: {
            paginationLink: PaginationLink,
        },

        methods: {
            stepUp() {
                if (this.currentPage !== this.pagesCount) {
                    this.navigate(this.currentPage + 1);
                }
            },

            stepDown() {
                if (this.currentPage !== 1) {
                    this.navigate(this.currentPage - 1);
                }
            },

            navigate(page) {
                this.$emit('navigate', page);
            }
        },
    };
</script>
