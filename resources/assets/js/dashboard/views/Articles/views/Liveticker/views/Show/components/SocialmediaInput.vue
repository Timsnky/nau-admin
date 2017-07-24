<template>
    <div>
        <div class="form-group">
            <label for="socialmedia">Link</label>
            <input @focusout="rerender" type="text" v-model="url" id="socialmedia" class="form-control"></input>

            <twitter-element v-if="show" :url="url"></twitter-element>
        </div>

        <div class="form-group">
            <button :disabled="this.url === ''" type="button" class="btn btn-primary" @click="create">Posten</button>
        </div>
    </div>
</template>
<script>
    import TwitterElment from './SocialmediaTwitterElement'

    export default {
        data() {
            return {
                url: '',
                show: false,
            }
        },

        methods: {
            rerender() {
                this.show = false;
                setTimeout(() => this.show = true, 100);
            }
        },

        components: {
            'twitter-element': TwitterElment,
        }
    }
</script>
