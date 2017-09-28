<template>
    <nav v-if="this.pagesCount > 1">
        <ul class="pagination">
            <li :class="{'disabled': currentPage === 1}">
                <a
                aria-label="Zurück"
                @click="stepDown">
                Zurück
            </a>
        </li>

        <pagination-link
        v-for="(page, index) in pages"
        :page="page"
        :currentPage="currentPage"
        @navigate="navigate"
        :key="index"/>

        <li :class="{'disabled': currentPage === pagesCount}">
            <a
            aria-label="Weiter"
            @click="stepUp">
            Weiter
        </a>
    </li>
</ul>
</nav>
</template>

<script>
    import PaginationLink from './Link';

    export default {
        props: {
            currentPage: Number,
            pagesCount: Number,
            pageRange: {
              type: Number,
              default: 8
          },
          itemsPerPage: Number,
      },

      components: {
        paginationLink: PaginationLink,
    },

    computed: {
        pages() {
            if(this.pagesCount <= this.pageRange) {
                return this.range(1, this.pagesCount);
            }

            let low = this.currentPage - this.pageRange / 2;
            let high = this.currentPage + this.pageRange / 2;

            if(high > this.pagesCount) {
                high = this.pagesCount;
            }

            if(low < 1) {
                low = 1;
            }

            return this.range(low, high);
        }
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
        },

        range(start, stop, step = 1) {
            if (typeof stop == 'undefined') {
                stop = start;
                start = 0;
            }

            if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
                return [];
            }

            var result = [];
            for (var i = start; step > 0 ? i <= stop : i > stop; i += step) {
                result.push(i);
            }

            return result;
        }
    },
};
</script>
