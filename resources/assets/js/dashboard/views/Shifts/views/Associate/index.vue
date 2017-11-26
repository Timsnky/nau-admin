<template>
    <div>
        <page-title title="Schicht zuweisung" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="shift">Schicht</label>
                    <div class="form-control-static">{{ shift.name }}</div>
                </div>

                <div class="form-group">
                    <label for="author">Autor</label>
                    <dropdown-users :users="users" v-model="user" />
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn blue"
                    type="submit"
                    :disabled="!user">
                    Zuweisen
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
                user: null,
                shift: {
                    assignments: []
                },
                assignment: {},
            }
        },

        components: {
            DropdownUsers
        },

        async created() {
            let response = await Api.http.get(`/work-shifts/${this.$route.params.id}`);
            this.shift = response.data;

            response = await Api.http.get(`/authors`);
            this.users = response.data;

            this.user = this.users.find(user => (
                user.id === this.assignment.user_id
            ));
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
                } else {
                    this.assignment = {};
                }
            }
        },

        methods: {
            handleSubmit() {
                if (this.assignment.id) {
                    Api.http
                        .put(`/work-shift-assignments/${this.assignment.id}`, { 'user_id': this.user.id })
                        .then(response => this.$router.push({ name: 'resources.day', params: { date: this.date } }))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    Api.http
                        .post('/work-shift-assignments', {
                            user_id: this.user.id,
                            date: this.date,
                            work_shift_id: this.shift.id
                        })
                        .then(response => this.$router.push({ name: 'resources.day', params: { date: this.date } }))
                        .catch(err => console.log('Show some error message here'));
                }
            },
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
