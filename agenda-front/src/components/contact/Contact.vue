<template>
    <v-layout row wrap id="inspire">
        <v-flex sm12>
           <create-contact  />
        </v-flex>
        <v-flex sm8>
            <v-data-table
            :headers="headers"
            :items="contacts"
            hide-actions
            class="elevation-1"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.email }}</td>
                <td class="text-xs-right">{{ props.item.phoneNumber }}</td>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                        <v-icon color="black">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </td>
            </template>
            </v-data-table>
            <update-contact :value="contact" v-on:done="reset" v-on:save="saveItem"/>
        </v-flex>
  </v-layout >
</template>

<script>
import UpdateContact from './UpdateContact'
import CreateContact from './CreateContact'
import {BASEAPIURL} from '@/config/global'
import {mapState, mapActions} from 'vuex'
import axios from 'axios'

export default {
    components: {
        CreateContact,
        UpdateContact
    },
    computed: {
        ...mapState(['contacts' ]),
    },
    methods: {
        ...mapActions(['loadContacts']),
        editItem(item) {
            this.contact = item
            this.$store.commit('SET_ID', item._id)
            this.$store.commit('SET_UPDATING', true)
        },
        deleteItem(item) {
            axios.delete(`${BASEAPIURL}/contacts/${item._id}`)
                .then(() => this.loadContacts())
        },
       reset(){
           this.contact = {
                name: '',
                email: '',
                phoneNumber: '',
                _id: null
            }
            this.$store.commit('SET_ID')
            console.log('reset')
       },
       saveItem(){
           axios.put(`${BASEAPIURL}/contacts/${this.contact._id}`, this.contact)
                .then(() => this.loadContacts())
       }
    },
    data: function() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'Phone Number', value: 'phoneNumber' },
            ],
            dialog: false,
            contact: {
                _id: null,
                name: '',
                email: '',
                phoneNumber: ''
            }
        }
    },
    mounted() {
        this.loadContacts()
    }
}
</script>

<style>

</style>
