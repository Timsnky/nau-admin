<template>
    <!-- BEGIN SIDEBAR -->
    <div class="page-sidebar-wrapper">
        <!-- BEGIN SIDEBAR -->
        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
        <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
        <div class="page-sidebar navbar-collapse collapse">
            <!-- BEGIN SIDEBAR MENU -->
            <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
            <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
            <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
            <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
            <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
            <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
            <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true"
                data-slide-speed="200" style="padding-top: 20px">
                <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
                <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                <li class="sidebar-toggler-wrapper hide">
                    <div class="sidebar-toggler">
                        <span></span>
                    </div>
                </li>
                <!-- END SIDEBAR TOGGLER BUTTON -->

                <router-link :to="{name: 'home'}" tag="li" class="nav-item" exact>
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-home"></i>
                        <span class="title">Home</span>
                    </a>
                </router-link>

                <li class="nav-item">
                    <router-link :to="{name: 'articles.list'}" class="nav-link nav-toggle" exact>
                        <i class="fa fa-newspaper-o"></i>
                        <span class="title">Artikel</span>
                        <span class="arrow"></span>
                    </router-link>
                    <ul class="sub-menu">
                        <router-link :to="{name: 'articles.list'}" tag="li" class="nav-item" exact>
                            <a href="javascript:;" class="nav-link nav-toggle">
                                <i class="fa fa-newspaper-o"></i>
                                <span class="title">News</span>
                            </a>
                        </router-link>
                        <router-link :to="{name: 'articles.community'}" tag="li" class="nav-item" exact>
                            <a href="javascript:;" class="nav-link nav-toggle">
                                <i class="fa fa-users"></i>
                                <span class="title">Community</span>
                            </a>
                        </router-link>
                    </ul>
                </li>

                <li class="nav-item">
                    <router-link :to="{name: 'resources.week'}" class="nav-link nav-toggle" exact>
                        <i class="fa fa-calendar"></i>
                        <span class="title">Ressourcenmanagement</span>
                        <span class="arrow"></span>
                    </router-link>
                    <ul class="sub-menu">
                        <router-link :to="{name: 'resources.week' }" tag="li" exact>
                            <a>
                                <span class="title">Kalender</span>
                            </a>
                        </router-link>
                        <router-link :to="{name: 'holidays.list'}" tag="li" exact>
                            <a>
                                <span class="title">Freitage</span>
                            </a>
                        </router-link>
                    </ul>
                </li>

                <router-link :to="{name: 'ideas.list'}" tag="li" class="nav-item" exact>
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-lightbulb-o"></i>
                        <span class="title">Ideen</span>
                    </a>
                </router-link>

                <!--Images -->
                <router-link :to="{name: 'images.list'}" tag="li" class="nav-item" exact>
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-image"></i>
                        <span class="title">Bilder</span>
                    </a>
                </router-link>

                <!--Videos -->
                <router-link :to="{name: 'videos.list'}" tag="li" class="nav-item" exact>
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-video-camera"></i>
                        <span class="title">Videos</span>
                    </a>
                </router-link>

                <!--Users -->
                <router-link :to="{name: 'users.list'}" tag="li" class="nav-item" exact>
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-user"></i>
                        <span class="title">Benutzer</span>
                    </a>
                </router-link>

                <!--Comments -->
                <router-link :to="{name: 'comments.list'}" tag="li" class="nav-item" exact>
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-comments"></i>
                        <span class="title">Kommentare</span>
                    </a>
                </router-link>

                <!--Surveys -->
                <router-link :to="{name: 'surveys.list'}" tag="li" class="nav-item" exact>
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-question"></i>
                        <span class="title">Umfragen</span>
                    </a>
                </router-link>

                <!--Frontpage -->
                <li class="nav-item">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-calendar"></i>
                        <span class="title">Frontpage</span>
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <router-link :to="{name: 'frontpage.big' }" tag="li" exact>
                            <a>
                                <span class="title">Big</span>
                            </a>
                        </router-link>
                        <router-link :to="{name: 'frontpage.top'}" tag="li" exact>
                            <a>
                                <span class="title">Top Artikel</span>
                            </a>
                        </router-link>
                        <router-link :to="{name: 'frontpage.top.community'}" tag="li" exact>
                            <a>
                                <span class="title">Community Top Artikel</span>
                            </a>
                        </router-link>
                    </ul>
                </li>
            </ul>
            <!-- END SIDEBAR MENU -->
            <!-- END SIDEBAR MENU -->
        </div>
        <!-- END SIDEBAR -->
    </div>
    <!-- END SIDEBAR -->
</template>
