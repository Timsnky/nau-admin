<template>
    <div>
        <page-title title="Week View" sub="sub heading"/>

        <div class="row">
            <div class="col-xs-4">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search">
                    <span class="input-group-btn"><button class="btn btn-default" type="button"><i
                        class="fa fa-calendar"></i></button></span>
                </div>
            </div>
            <div class="col-xs-4">
                <h4 class="text-center">Week view</h4>
            </div>
            <div class="col-xs-4 text-right">
                <button
                    @click="handlePrevWeek"
                    class="btn btn-default">
                    <i class="fa fa-chevron-left"></i>
                </button>
                <button
                    @click="handleNextWeek"
                    class="btn btn-default">
                    <i class="fa fa-chevron-right"></i>
                </button>
                <button
                    @click="handleCurrentWeek"
                    class="btn btn-default">
                    Current
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            handlePrevWeek() {
                console.log('prev');
            },
            handleNextWeek() {
                console.log('next');
            },
            handleCurrentWeek() {
                console.log('current');
            }
        }
    }
</script>
