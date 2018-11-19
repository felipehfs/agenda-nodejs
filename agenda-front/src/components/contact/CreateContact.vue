<template>
    <v-dialog v-model="dialog" max-width="600px">
            <v-btn slot="activator" color="primary">New contact</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">New contact</span>
                </v-card-title>   
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  v-model="contact.name" label="Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="contact.phoneNumber" mask="(##) #####-####" label="Phone Number"></v-text-field>
                            </v-flex>
                            <v-flex x12>
                                <v-text-field v-model="contact.email" label="E-mail"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="saveContact">Save</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>

<script>
import {mapActions} from 'vuex'
import axios from 'axios'
import {BASEAPIURL} from '@/config/global'

export default {
    name: 'CreateContact',
    data: function() {
        return {
            dialog: false,
            contact: {
                name: '',
                email: '',
                phoneNumber: ''
            }
        }
    },
    methods: {
        ...mapActions(['loadContacts']),
        saveContact() {
            axios.post(`${BASEAPIURL}/contacts`, this.contact)
                .then(resp => {
                    this.contact = { name: '', email: '', phoneNumber: ''}
                    this.loadContacts()
                    this.dialog = false
                })
        }
    }
}
</script>

<style>

</style>
