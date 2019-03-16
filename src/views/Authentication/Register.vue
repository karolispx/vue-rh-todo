<template lang="html">
    <section class="register-page">
        <div class="auth-page static-content-page">
            <v-alert v-if="registerForm.alert.display" transition="scale-transition" :value="true" :type="registerForm.alert.type" class="app-alert-dialog">
                <strong>{{ registerForm.alert.message }}</strong>
            </v-alert>

            <v-container>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-card class="elevation-12">
                            <v-toolbar dark fluid class="auth-page-title">
                                <h1>Register for a new account!</h1>
                            </v-toolbar>

                            <v-form @submit.prevent="submitRegisterForm" id="register-form" v-model="registerForm.valid">
                                <v-card-text>
                                    <p class="auth-page-subtitle">
                                        Register below to get started!
                                    </p>

                                    <v-text-field :disabled="registerForm.formLoading" prepend-icon="person" :rules="registerForm.emailRules" v-model="registerForm.email" name="email" label="Enter Your Email Address" type="email" required></v-text-field>

                                    <v-text-field :disabled="registerForm.formLoading" prepend-icon="lock" :rules="registerForm.passwordRules" v-model="registerForm.password" name="password" label="Enter Your Password" type="password"></v-text-field>

                                    <v-text-field :disabled="registerForm.formLoading" prepend-icon="lock" :rules="registerForm.passwordRules" v-model="registerForm.password2" name="password2" label="Repeat Your Password" type="password"></v-text-field>
                                </v-card-text>

                                <v-card-actions class="justify-center">
                                    <v-btn :loading="registerForm.formLoading" large rounded class="auth-submit-area" type="submit" form="register-form" :disabled="! registerForm.valid || registerForm.formLoading">
                                        Register <v-icon right small>person_add</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>

                        <v-card-actions class="auth-page-sublink">
                            <router-link :to="{ name: 'login' }">
                                <strong>Already have an account?</strong>
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
                registerForm: {
                    alert: {
                        display: false,
                        message: null,
                        type: null
                    },
                    formLoading: false,
                    email: '',
                    password: '',
                    password2: '',
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
            submitRegisterForm () {
                const email = this.registerForm.email;
                const password = this.registerForm.password;
                const password2 = this.registerForm.password2;

                if ( email && password && password2 && this.registerForm.valid && ! this.registerForm.formLoading ) {
                    this.$store.dispatch('loader/page', 'on');

                    this.registerForm.formLoading = true;

                    this.registerForm.alert.display = false;

                    this.$store.dispatch( 'authentication/register', { email, password, password2 } ).then( response => {
                        this.registerForm.formLoading = false;
                        this.$store.dispatch('loader/page', 'off');
                        window.scrollTo(0, 0);

                        this.registerForm.alert.message = response;
                        this.registerForm.alert.type = "success";
                        this.registerForm.alert.display = true;

                        setTimeout( () => {
                            this.$router.push('/tasks');
                        }, 3000 );
                    }, error => {
                        this.registerForm.formLoading = false;
                        this.$store.dispatch('loader/page', 'off');
                        window.scrollTo(0, 0);

                        this.registerForm.alert.message = error;
                        this.registerForm.alert.type = "error";
                        this.registerForm.alert.display = true;
                    });
                } else {
                    this.registerForm.formLoading = false;
                    this.$store.dispatch('loader/page', 'off');
                    window.scrollTo(0, 0);

                    this.registerForm.alert.message = 'Please provide all information.';
                    this.registerForm.alert.type = "warning";
                    this.registerForm.alert.display = true;
                }
            }
        }
    }
</script>