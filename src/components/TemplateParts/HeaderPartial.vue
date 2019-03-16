<template lang="html">
    <section class="header-partial">

        <div v-if="fullPageLoader" class="full-page-loader">
            <div class="full-page-loader-center">
                <div class="full-page-loader-center-inner">
                    <v-progress-circular indeterminate color="custom-theme-color"></v-progress-circular> Loading...
                </div>
            </div>
        </div>

        <div class="custom-theme-color">
            <div class="header-nav-logo">
                <router-link :to="{ name: 'tasks' }">Vue RH Todo App<br /></router-link>
            </div>

            <div v-if="authenticated">
                <div class="text-center dont-underline-it">
                    <router-link :to="{ name: 'logout' }">
                        <v-btn color="primary" class="white" flat>
                            <v-icon left>exit_to_app</v-icon> Logout
                        </v-btn>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>


<script lang="js">
    export default  {
        computed: {
            fullPageLoader () {
                return this.$store.state.loader.fullPageLoader
            },
            authenticated () {
                return this.$store.state.authentication.authenticated
            }
        },
        data() {
            return {

            }
        }
    }
</script>