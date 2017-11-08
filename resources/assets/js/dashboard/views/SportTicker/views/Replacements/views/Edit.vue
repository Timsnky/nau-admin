<template>
    <div>
        <page-title title="Sport Ticker Übersetzung anpassen" />

        <form @submit.prevent="save">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Original</label>
                        <input type="text" class="form-control" v-model="item.original"></input>
                    </div>

                    <div class="form-group">
                        <label>Übersetzung</label>
                        <input type="text" class="form-control" v-model="item.replace"></input>
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Speichern</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                item: {},
            }
        },

        async mounted() {
            var {data} = await Api.http.get(`/sport-ticker-replacements/${this.$route.params.id}`);
            this.item = data;
        },

        methods: {
            async save() {
                await Api.http.put(`/sport-ticker-replacements/${this.item.id}`, this.item);

                Vue.toast('Eintrag wurde gespeichert.', {
                    className : ['nau_toast','nau_success'],
                });

                this.$router.push({name: 'sportticker.replacements'})
            },
        }
    }
</script>
