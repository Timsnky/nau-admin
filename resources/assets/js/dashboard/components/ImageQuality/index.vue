<template>
    <div v-if="display" class="image_quality_section">
        <span v-bind:class="colorClass">{{ qualityString }} quality image ({{imageWidth}} px x {{imageHeight}} px)</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                colorClass: ''
            }
        },
        props: {
            display: {
              type: Number,
              default: 0
            },
            imageHeight: {
                type: Number
            },
            imageWidth: {
                type: Number
            }
        },

        computed: {
            qualityString()
            {
                if(this.imageWidth < 1000)
                {
                    this.colorClass = 'red';
                    return "Poor";
                }
                else if(this.imageWidth < 2050 && this.imageWidth >= 1000)
                {
                    this.colorClass = 'orange';
                    return "Medium";
                }
                else if(this.imageWidth >= 2050)
                {
                    this.colorClass = 'green';
                    return "Good";
                }
                else
                {
                    this.colorClass = '';
                    return "";
                }
            },
        },
    }
</script>
<style>
    .image_quality_section {
        margin-bottom: 10px;
    }

    .image_quality_section span {
        padding: 5px 10px;
        border-radius: 2px !important;
        color: white;
    }

    .red {
        background: red;
    }

    .orange {
        background: orange;
    }

    .green {
        background: green;
    }
</style>
