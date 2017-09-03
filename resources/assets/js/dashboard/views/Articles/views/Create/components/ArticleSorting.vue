<template>
    <div class="form-body">
        <div class="form-body panel">
            <div class="panel_heading">
                <span class="panel_title">Page Heading</span>
                <button type="button" class="btn btn-sm panel_toggle" @click="togglePreview()"><i class="fa fa-plus"></i></button>
            </div>
            <div class="panel_body">
                <div class="panel_preview" v-if="showPreview">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non hendrerit lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis accumsan quam in velit feugiat scelerisque. Duis non varius ipsum, convallis vestibulum augue. Vivamus vel malesuada odio. </p>
                </div>
                <div class="panel_content" v-if="! showPreview">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non hendrerit lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis accumsan quam in velit feugiat scelerisque. Duis non varius ipsum, convallis vestibulum augue. Vivamus vel malesuada odio. Morbi sit amet leo ornare metus ultrices dapibus. Nam porta ante ex, quis maximus nibh fermentum a. Donec quis rutrum turpis. Aenean convallis felis in orci interdum interdum. Sed tristique purus id nisi elementum rutrum.</p>
                    <p>Nulla a mauris molestie, sodales sapien eget, sollicitudin enim. Donec rhoncus urna nibh, non malesuada velit euismod non. Praesent ut felis a libero semper congue eu ac arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pharetra orci non leo dictum, nec vestibulum nisl aliquam. Sed vel eleifend sem. Vestibulum semper magna et lobortis sollicitudin. Proin non arcu vel elit pellentesque commodo euismod sed leo. Duis finibus volutpat ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                showPreview: true
            }
        },

        props: {
            articleId : {
                type: Number,
            }
        },

        mounted()
        {
        },

        created()
        {

        },


        watch: {

        },

        methods: {
            togglePreview()
            {
                this.showPreview = ! this.showPreview;
            }
        },

        beforeDestroy: function ()
        {

        }
    }
</script>

<style>
    .panel {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px !important;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
    }

    .panel_heading {
        padding: 10px 15px;
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
        border-bottom: 0;
        display: flex;
    }

    .panel_title {
        font-size: 15px;
    }

    .panel_toggle {
        margin-right: 0px;
        margin-left: auto;
        padding: 3px 8px !important;
        background: #c5c4c4;
        border-radius: 2px !important;
    }

    .panel_toggle:hover {
        background: #dedcdc;
    }

    .panel_body {
        padding: 0px 15px;
        border-top: 1px solid #ddd;
    }

    .padding_top_15 {
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>
