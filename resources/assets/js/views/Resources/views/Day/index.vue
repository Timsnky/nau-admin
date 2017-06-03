<template>
    <div>
        <page-title title="Day View" sub="sub heading"/>

        <div class="row">
            <div class="col-md-6">
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <span class="caption-subject bold uppercase">Shifts</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <ul class="list-group">
                            <li class="list-group-item">item</li>
                            <li class="list-group-item">item</li>
                            <li class="list-group-item">item</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <span class="caption-subject bold uppercase">Topics</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Some Title</h3>
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item">item</li>
                                <li class="list-group-item">item</li>
                                <li class="list-group-item">item</li>
                            </ul>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Some Title</h3>
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item">item</li>
                                <li class="list-group-item">item</li>
                                <li class="list-group-item">item</li>
                            </ul>
                        </div>

                        <router-link
                            :to="{name: 'topics.create'}"
                            class="btn btn-primary">
                            Add Topic
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>
