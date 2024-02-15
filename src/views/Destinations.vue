<template>
  <Hero></Hero>

    <v-data-iterator :items="destinations">

    <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col
              v-for="destination in destinations"
              :key="destination.id"
              cols="auto"
              md="4"
            >
              <v-card class="pb-3" border flat>
                <v-img :src="destination.country_image"></v-img>

                <v-list-item class="mb-2" :subtitle="destination.description">
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{ destination.country }}</strong>
                  </template>
                </v-list-item>

                <div class="d-flex justify-end px-4">
                 
                  <v-btn
                    border
                    flat
                    size="small"
                    class="text-none"
                    text="Read"
                    color="primary"
                  >
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container> 
</v-data-iterator>

</template>

<script>
import Hero from '../components/Hero.vue';
import axios from 'axios';
import { ref } from 'vue';
  export default {
    components:{
        Hero
    },
    data(){
        return{
            destinations : []
        }
    },
    methods:{
        getDestination(){
            axios.get('http://tourism-app-backend.test/api/destinations')
            .then(response=>{
                let results = response.data.data;
                let allResults = results.map(item=>{
                    return{
                        ...item,
                        country_image : `http://tourism-app-backend.test/api/destinations/image/${item.country_image}`
                    }
                })
                this.destinations = allResults;
                console.log(this.destinations)
            })
            .catch(error=>console.log(error))
        }
    },
    mounted(){
        this.getDestination();
    }
  }
</script>

<style>

</style>