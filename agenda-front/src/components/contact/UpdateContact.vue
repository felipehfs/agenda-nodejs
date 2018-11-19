<template>
    <v-dialog v-model="updating" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Update Contact</span>
            </v-card-title>
            <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  v-model="value.name" :value="value.name" label="Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="value.phoneNumber" mask="(##) #####-####" :value="value.phoneNumber" label="Phone Number"></v-text-field>
                            </v-flex>
                            <v-flex x12>
                                <v-text-field v-model="value.email" :value="value.email" label="E-mail"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
            </v-card-text>
              <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import {BASEAPIURL} from '@/config/global'

export default {
    name: 'UpdateContact',
    computed:{
         ...mapState(['updating','_id'])
    },
    data:function() {
        return {
        }
    },
    props: ['value', 'isOpen'],
    methods: {
        close() {
            this.$store.commit("SET_UPDATING", false)
            this.$emit("done", null)
        },
        save(){
            this.$store.commit('SET_UPDATING', false)
            this.$emit("save")
        }
    }
}
</script>

<style>

</style>
