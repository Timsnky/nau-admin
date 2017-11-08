    <template>
    <!-- BEGIN HEADER -->
    <div class="page-header navbar navbar-fixed-top">
        <!-- BEGIN HEADER INNER -->
        <div class="page-header-inner ">
            <!-- BEGIN LOGO -->
            <div class="page-logo">

                <router-link :to="{name: 'home'}">
                    <img src="/assets/images/logo.png" alt="logo" class="logo-default"/>
                </router-link>

                <div class="menu-toggler sidebar-toggler">
                    <span></span>
                </div>
            </div>
            <!-- END LOGO -->
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse"
               data-target=".navbar-collapse">
                <span></span>
            </a>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <!-- BEGIN TOP NAVIGATION MENU -->
            <div class="hor-menu">
                <ul class="nav navbar-nav">
                    <li>
                        <span v-if="$store.state.foldermaster" class="navbar-text hidden-xs"><i class="fa fa-files-o"></i> <b>Foldermaster:</b> {{ $store.state.foldermaster.name }}</span>
                    </li>
                    <li>
                        <span v-if="$store.state.liveDirector" class="navbar-text hidden-xs"><i class="fa fa-bolt"></i> <b>Live Director:</b> {{ $store.state.liveDirector.name }}</span>
                    </li>
                    <li>
                        <span v-if="$store.state.chameleon" class="navbar-text hidden-xs"><i class="fa fa-user"></i> <b>Chamäleon:</b> {{ $store.state.chameleon.name }}</span>
                    </li>
                </ul>
            </div>
            <div class="top-menu">
                <ul class="nav navbar-nav pull-right">
                    <notifications />
                    <li class="dropdown dropdown-user">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                           data-close-others="true">
                            <img alt="" class="img-circle" :src="user.avatar"/>
                            <span class="username username-hide-on-mobile">{{ user.email }} - {{ user.name }}</span>
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-default">
                            <li>
                                <a @click.prevent="logout">
                                    <i class="icon-key"></i> Logout </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- END TOP NAVIGATION MENU -->
        </div>
        <!-- END HEADER INNER -->
    </div>
    <!-- END HEADER -->
</template>

<script>
    import Notifications from './Notifications/Notifications';

    export default {
        computed: {
            user() {
                return this.$store.state.user
            },
        },

        components: {
            Notifications
        },

        methods: {
            logout() {
                Api.invalidateToken().then((response) => {
                    location.href = '/login';
                }, (error) => {
                    location.href = '/login';
                });
            }
        }
    }
</script>

<style>
    .navbar-text {
        color: #c6cfda;
    }
</style>
