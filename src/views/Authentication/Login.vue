<template lang="html">
    <section class="login-page">
        <div class="auth-page static-content-page">
            <v-alert v-if="loginForm.alert.display" transition="scale-transition" :value="true" :type="loginForm.alert.type" class="app-alert-dialog">
                <strong>{{ loginForm.alert.message }}</strong>
            </v-alert>

            <v-container>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-card class="elevation-12">
                            <v-toolbar dark fluid class="auth-page-title">
                                <h1>Log into your account!</h1>
                            </v-toolbar>

                            <v-form @submit.prevent="submitLoginForm" id="login-form" v-model="loginForm.valid">
                                <v-card-text>
                                    <p class="auth-page-subtitle">Login below using you email address and password to access your portfolio!</p>

                                    <v-text-field :disabled="loginForm.formLoading" prepend-icon="person" :rules="loginForm.emailRules" v-model="loginForm.email" name="email" label="Enter Your Email Address" type="email" required></v-text-field>

                                    <v-text-field :disabled="loginForm.formLoading" prepend-icon="lock" :rules="loginForm.passwordRules" v-model="loginForm.password" name="password" label="Enter Your Password" type="password"></v-text-field>
                                </v-card-text>

                                <v-card-actions class="justify-center">
                                    <v-btn :loading="loginForm.formLoading" large rounded class="auth-submit-area" type="submit" form="login-form" :disabled="! loginForm.valid || loginForm.formLoading">
                                        Login <v-icon right small>person</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>

                        <v-card-actions class="auth-page-sublink">
                            <router-link :to="{ name: 'register' }">
                                <strong>Don't have an account yet?</strong>
                            </router-link>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </section>
</template>


<script lang="js">
    export default {
        data() {
            return {
                loginForm: {
                    alert: {
                        display: false,
                        message: null,
                        type: null
                    },
                    formLoading: false,
                    email: '',
                    password: '',
                    valid: false,
                    emailRules: [
                        v => !!v || 'Email Address is required.',
                        v => /.+@.+/.test(v) || 'E-mail must be valid'
                    ],
                    passwordRules: [
                        v => !!v || 'Password is required.'
                    ]
                }
            }
        },
        computed: {

        },
        methods: {
            submitLoginForm() {
                const email = this.loginForm.email;
                const password = this.loginForm.password;

                if ( email && password && this.loginForm.valid && ! this.loginForm.formLoading) {
                    this.loginForm.formLoading = true;
                    this.$store.dispatch('loader/page', 'on');

                    this.loginForm.alert.display = false;

                    this.$store.dispatch( 'authentication/login', { email, password } ).then( response => {
                        this.loginForm.formLoading = false;
                        this.$store.dispatch('loader/page', 'off');
                        window.scrollTo(0, 0);

                        this.loginForm.alert.message = response;
                        this.loginForm.alert.type = "success";
                        this.loginForm.alert.display = true;

                        setTimeout( () => {
                            this.$router.push('/tasks');
                        }, 3000 );
                    }, error => {
                        this.loginForm.formLoading = false;
                        this.$store.dispatch('loader/page', 'off');
                        window.scrollTo(0, 0);

                        this.loginForm.alert.message = error;
                        this.loginForm.alert.type = "error";
                        this.loginForm.alert.display = true;
                    });
                } else {
                    this.loginForm.formLoading = false;
                    this.$store.dispatch('loader/page', 'off');
                    window.scrollTo(0, 0);

                    this.loginForm.alert.message = 'Please provide all information.';
                    this.loginForm.alert.type = "warning";
                    this.loginForm.alert.display = true;
                }
            }
        }
    }
</script>