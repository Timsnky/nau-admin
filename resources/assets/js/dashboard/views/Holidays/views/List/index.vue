<template>
    <div>
        <page-title title="Holidays" sub="List" />

        <div class="row">
            <div class="col-xs-12 text-right">
                <router-link
                    :to="{name: 'holidays.create'}"
                    class="btn btn-primary pull-right">
                    Create
                </router-link>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="holidays.length > 0">
            <div class="table-scrollable">
                <table class="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    <item
                        v-for="holiday in holidays"
                        :key="holiday.id"
                        :holiday="holiday"
                        @deleteHoliday="deleteHoliday"/>
                    </tbody>
                </table>
            </div>
        </div>

        <h2 v-else class="text-center">No holidays found</h2>
    </div>
</template>
<script>
    import Item from './components/Item';

    export default {
        data() {
            return {
                holidays: [],
                isLoaded: false
            }
        },

        created() {
            Api.http
                .get('/holidays')
                .then(response => {
                    this.holidays = response.data;
                    this.isLoaded = true;
                })
                .catch(err => {
                    console.log('Show some error message here');
                    this.isLoaded = true;
                });
        },

        components: {
            item: Item,
        },

        methods: {
            deleteHoliday(holiday) {
                Api.http
                    .delete(`/holidays/${holiday.id}`)
                    .then(response => this.holidays = this.holidays.filter(item => item.id !== holiday.id))
                    .catch(err => console.log('Show some error message here'));
            },
        }
    }
</script>
