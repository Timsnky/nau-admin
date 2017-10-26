<template>
    <div>
        <page-title title="Shift Association" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="shift">Shift</label>
                    <div id="shift">
                        <div class="form-control-static">{{ shift.name }}</div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="author">Autor</label>
                    <dropdown-users
                        :users="users"
                        :newAssignment="newAssignment"
                        @selectAuthor="selectAuthor"/>
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newAssignment.user_id">
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
    import DropdownUsers from './components/DropdownUsers';

    export default {
        data() {
            return {
                date: this.$route.params.date,
                users: [],
                shift: {
                    assignments: []
                },
                assignment: {},
                newAssignment: {}
            }
        },

        components: {
            DropdownUsers
        },

        created() {
            Api.http
                .get(`/work-shifts/${this.$route.params.id}`)
                .then(response => {
                    this.shift = response.data;

                    return Api.http.get(`/work-types/${response.data.work_type_id}/users`)
                })
                .then(response => this.users = response.data)
                .catch(err => console.log('Show some error message here'));
        },

        computed: {
            assignments() {
                return this.shift.assignments;
            }
        },

        watch: {
            assignments(newVal) {
                const assignment = newVal.find(assignment => (
                    moment(assignment.date).format('YYYY-MM-DD') === this.date
                ));

                if (assignment) {
                    const { id, user_id } = assignment;

                    this.assignment = { id, user_id };
                    this.newAssignment = { id, user_id };
                } else {
                    this.assignment = {};
                    this.newAssignment = {};
                }
            }
        },

        methods: {
            handleSubmit() {
                const { user_id } = this.newAssignment;

                if (user_id) {
                    if (this.assignment.id) {
                        const { id } = this.newAssignment;

                        Api.http
                            .put(`/work-shift-assignments/${id}`, { user_id })
                            .then(response => this.$router.push({ name: 'resources.day', params: { date: this.date } }))
                            .catch(err => console.log('Show some error message here'));
                    } else {
                        Api.http
                            .post('/work-shift-assignments', {
                                user_id,
                                date: this.date,
                                work_shift_id: this.shift.id
                            })
                            .then(response => this.$router.push({ name: 'resources.day', params: { date: this.date } }))
                            .catch(err => console.log('Show some error message here'));
                    }
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newAssignment = this.assignment;
            },

            selectAuthor(user) {
                this.newAssignment = {
                    ...this.newAssignment,
                    user_id: user.id
                };
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
