<template>
    <div>
        <page-title
            title="Edit Shift"
            sub="sub heading"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="shift">Shift</label>
                    <div id="shift">
                        <div class="form-control-static">{{ shift.name }}</div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="author">Author</label>
                    <dropdown-users
                        :users="users"
                        :assignments="shift.assignments"
                        @selectAuthor="selectAuthor"/>
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newShift.author">
                    Associate
                </button>
                <button
                    class="btn btn-default"
                    type="button"
                    @click="reset">
                    Reset
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';
    import request from 'dashboard/utils/request';
    import DropdownUsers from './components/DropdownUsers';

    export default {
        data() {
            return {
                users: [],
                shift: {},
                newShift: {}
            }
        },

        components: {
            DropdownUsers
        },

        created() {
            request
                .get(`/work-shifts/${this.$route.params.id}`)
                .then(response => {
                    this.shift = response.data;
                    this.newShift = _pick(this.shift, ['author']);

                    return request.get(`/work-types/${response.data.work_type_id}/users`)
                })
                .then(response => this.users = response.data)
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                const { author } = this.newShift;

                if (author) {
                    request
                        .put(`/work-shifts/${this.shift.id}`, { author })
                        .then(response => console.log(response))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newShift = _pick(this.shift, ['author']);
            },

            selectAuthor(author) {
                this.newShift.author = author;
                console.log(this.newShift);
            }
        }
    }
</script>

<style scoped>
    label {
        font-weight: 700;
    }

    .form-control-static {
        display: block;
        white-space: pre-line;
    }
</style>
