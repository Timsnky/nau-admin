<template>
    <div>
        <page-title
            title="Day View"
            sub="sub heading"/>

        <h2
            v-if="!isLoaded"
            class="text-center">
            Loading...
        </h2>

        <div v-else class="row">
            <div class="col-md-6">
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <span class="caption-subject bold uppercase">Shifts</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <ul
                            class="list-group"
                            v-if="day.shifts.length > 0">
                            <li
                                class="list-group-item clearfix"
                                v-for="(shift, index) in day.shifts"
                                v-if="shift.assigned"
                                :key="index">
                                {{ shift.name }} : {{ shift.assigned.name }}
                                <router-link
                                    :to="{name: 'shifts.associate', params: { id: shift.id }}"
                                    class="btn btn-xs btn-warning pull-right">
                                    Edit
                                </router-link>
                            </li>
                            <li
                                class="list-group-item clearfix"
                                v-for="(shift, index) in day.shifts"
                                v-if="!shift.assigned"
                                :key="index">
                                {{ shift.name }}
                                <router-link
                                    :to="{name: 'shifts.associate', params: { date, id: shift.id }}"
                                    class="btn btn-xs btn-info pull-right">
                                    Assign
                                </router-link>
                            </li>
                        </ul>
                        <h4
                            v-else
                            class="text-center">
                            No shifts found
                        </h4>
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
                        <div
                            v-if="day.topics.length > 0"
                            v-for="(topic, index) in day.topics"
                            class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">{{ topic.name }}</h3>
                            </div>
                            <div class="panel-body">
                                <div v-if="topic.articles.length > 0">
                                    <div
                                        class="panel panel-default"
                                        v-for="(article, index) in topic.articles">
                                        <div class="panel-body">
                                            <h5 class="clearfix">{{ article.title }}
                                                <router-link
                                                    :to="{name: 'topics.articles.edit', params: { topicID: topic.id, articleID: article.id }, query: { date }}"
                                                    class="btn btn-xs btn-warning pull-right">
                                                    Edit
                                                </router-link>
                                            </h5>

                                            <ul
                                                class="list-group"
                                                v-if="article.authors.length > 0">
                                                <li
                                                    class="list-group-item"
                                                    v-for="author in article.authors">
                                                    {{ author.name }}
                                                </li>
                                            </ul>

                                            <h5
                                                v-else
                                                class="text-center">
                                                No authors found
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                                <h4
                                    v-else
                                    class="text-center">
                                    No stories found
                                </h4>

                                <router-link
                                    :to="{name: 'topics.articles.create', params: { topicID: topic.id }, query: { date }}"
                                    class="btn btn-primary">
                                    Add Story
                                </router-link>
                            </div>
                        </div>

                        <h4
                            v-else
                            class="text-center">
                            No topics found
                        </h4>

                        <router-link
                            :to="{name: 'topics.create', query: { date }}"
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
    import request from 'dashboard/utils/request';

    export default {
        data() {
            return {
                date: this.$route.params.date,
                day: {
                    shifts: [],
                    topics: [],
                },
                isLoaded: false,
            };
        },

        created() {
            request
                .get(`/resources/overview/${this.date}`)
                .then(response => {
                    this.day = response.data;
                    this.isLoaded = true;
                })
                .catch(err => {
                    this.isLoaded = true;
                    console.log('Show some error message here');
                });
        }
    }
</script>
