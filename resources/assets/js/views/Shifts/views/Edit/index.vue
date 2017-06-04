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
                    <input
                        id="author"
                        type="text"
                        name="author"
                        v-model.trim="newShift.author"
                        placeholder="Edit author"
                        class="form-control">
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
    import request from 'utils/request';

    export default {
        data() {
            return {
                shift: {},
                newShift: {}
            }
        },

        created() {
            request
                .get(`/shifts/${this.$route.params.id}`)
                .then(response => {
                    this.shift = response.data;
                    this.newShift = _pick(this.shift, ['author']);
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                const { author } = this.newShift;

                if (author) {
                    request
                        .put(`/shifts/${this.shift.id}`, { author })
                        .then(response => console.log(response))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newShift = _pick(this.shift, ['author']);
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
