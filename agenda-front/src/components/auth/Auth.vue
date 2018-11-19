<template>
   <v-container flex justify-center>
       <v-layout justify-center>
           <v-flex sm4>
               <v-card>
                   <v-alert v-model="alert" dismissible type="error">
                       <p v-for="(errors, index) in errorMessage" v-bind:key="index">
                           {{ errors.message }}
                       </p>
                   </v-alert>
                   <v-card-title>
                       <span v-if="isSignIn" class="headline">Sign in</span>
                       <span v-else class="headline">Register</span>
                   </v-card-title>
                   <v-card-text>
                       <v-container grid-list-md>
                           <v-flex sm12 v-show="!isSignIn">
                               <v-text-field v-model="userData.name" label="Name"></v-text-field>
                           </v-flex>
                           <v-flex sm12>
                               <v-text-field v-model="userData.email" label="E-mail"></v-text-field>
                           </v-flex>
                           <v-flex sm12>
                               <v-text-field
                                    v-model="userData.password"
                                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                    :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="Password"
                                    hint="At least 8 characters"
                                    counter
                                    @click:append="show1 = !show1"
                                ></v-text-field>
                           </v-flex>
                            <v-flex sm12 mt-3>
                                <a href  v-if="isSignIn" class="link" @click.prevent="isSignIn= false">Clique aqui para registrar</a>
                                 <a href v-else class="link" @click.prevent="isSignIn= true">Clique aqui para logar</a>
                            </v-flex>
                       </v-container>
                   </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn v-if="isSignIn" color="blue darken-1" flat @click.native="signIn">Login</v-btn>
                        <v-btn v-else color="blue darken-1" flat @click.native="signup">Signup</v-btn>
                </v-card-actions>
               </v-card>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
import axios from 'axios'
import {BASEAPIURL, userKey } from '@/config/global'

export default {
  name: "Auth",
  data: function() {
    return {
      isSignIn: true,
      alert: false,
      show1: false,
      userData: {
          name: '',
          email: '',
          password: ''
      },
      rules:{
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
      },
      errorMessage: [],
    };
  },
  methods: {
      signup() {
          axios.post(`${BASEAPIURL}/register`, this.userData)
                .then(() => {
                    this.userData = {
                        name: '',
                        email: '',
                        password: ''
                    }
                    this.isSignIn = true
                })
                .catch(e => {
                    this.errorMessage = e.response.data.errors
                    this.alert = true
                })
      },
      signIn() {
          axios.post(`${BASEAPIURL}/signin`, {
                email: this.userData.email, 
                password: this.userData.password
            })
            .then(res => {
                this.$store.commit("SET_USER", res.data)
                localStorage.setItem(userKey, JSON.stringify(res.data))
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                this.$router.push({ path: '/contacts'})
            }).catch(e => {
                this.errorMessage = e.response.data.errors
                this.alert = true
            })
      }
  }
};
</script>

<style>
    .link {
        text-decoration: none;
    }
</style>
