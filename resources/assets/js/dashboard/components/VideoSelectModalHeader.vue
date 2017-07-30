<template>
    <div class="modal_title_bar">
        <h4 class="modal-title" id="myModalLabel">Videos</h4>
        <router-link
                :to="{name: 'videos.create'}"
                class="btn btn-primary btn-sm add_btn"
                data-dismiss="modal">
            <i class="fa fa-plus"></i>
        </router-link>
        <button type="button" class="btn btn-danger btn-sm close_btn" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
    </div>
</template>
<script>
    export default {

    }
</script>

<style>
    .modal_title_bar {
        display: inline-flex;
        width: 100%;
    }

    .modal_title_bar .add_btn {
        margin-right: 0px;
        margin-left: auto;
    }

    .modal_title_bar .close_btn {
        margin-right: 0px;
        margin-left: 10px;
    }
</style>