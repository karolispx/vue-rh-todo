<template>
    <v-app>
        <header-partial></header-partial>

        <v-content>
            <router-view/>
        </v-content>

        <footer-partial></footer-partial>
    </v-app>
</template>


<script>
    import HeaderPartial from '@/components/TemplateParts/HeaderPartial';
    import FooterPartial from '@/components/TemplateParts/FooterPartial';

    export default {
        name: 'App',
        components: {
            HeaderPartial,
            FooterPartial
        }
    }
</script>


<style>
    @import 'https://fonts.googleapis.com/css?family=Material+Icons';
</style>


<style lang="scss">
    @import '../assets/scss/app';
</style>