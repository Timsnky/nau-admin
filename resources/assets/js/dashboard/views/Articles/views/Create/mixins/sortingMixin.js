let sortingMixin = {
    methods: {
        /**
         * SORTING
         */
        //Set the displayed panel
        setDisplayedPanel(id)
        {
            this.displayedPanel = this.displayedPanel === id ? null : id;
        },

        //Trim content received from back end
        trimContent(content)
        {
            content = content.replace(/<.+?>/g, '');

            return content.substring(0, 100);
        },

        //Get the id for the slider carousel
        getSliderIdName(elementId)
        {
            return "slider_" + elementId;
        },

        //Get the slider name string with the #
        getSliderIdNameHashed(elementId)
        {
            return "#slider_" + elementId;
        },

        //Get the images linked to a given slider
        getSliderImages(id)
        {
            for (let [key, value] of this.articleSliders.entries())
            {
                if(value.id === id)
                {
                    return value.images;
                }
            }

            return [];
        },

        //Submit order elements
        saveSortedElements(articleId)
        {
            let orderArray = {};

            this.articleElements.forEach(function (value, key)
            {
                orderArray[value.element_id] = key;
            });

            Api.http
                .put(`/articles/${articleId}/elements`, orderArray)
                .then(response => {
                });
        },

        //Reload the sorting page data
        refreshSortingData()
        {
            if(this.article.id)
            {
                this.initializeArticleElements(this.article.id);
            }
        },
    }
};

export default sortingMixin;