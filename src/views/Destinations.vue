<template>
  <Hero></Hero>
  <transition name="title" appear>
    <h1 class="text-center my-5 text-green">Destinations</h1>
  </transition>

  <v-data-iterator :items="destinations">
    <v-container class="pa-2" fluid>
      <v-row>
        <v-col v-for="destination in destinations" :key="destination.id" cols="auto" md="4">
            <v-card  class="pb-3" elevated>
              <v-img :src="destination.country_image"></v-img>

              <v-list-item class="h3" :subtitle="destination.description">
                <template v-slot:title>
                  <strong class="text-h6 mb-2">{{ destination.country }}</strong>
                </template>
              </v-list-item>

              <v-card-actions>
                
                <router-link :to="{name: 'DestinationDetail', params:{id: destination.id}}">
                  <v-btn color="blue-lighten-2" variant="text"> Explore</v-btn>
                </router-link>
              

              </v-card-actions>

              <v-expand-transition>
                <div v-show="show && this.id == destination.id">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ destination.body }}
                  </v-card-text>
                </div>
              </v-expand-transition>

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
  components: {
    Hero
  },
  data() {
    return {
      destinations: [],
      show: false,
      id: null
    }
  },
  methods: {
    showBody(id) {
      this.id = id;
      this.show = !this.show
    },
  
    getDestination() {
      axios.get('http://tourism-app-backend.test/api/destinations/all')
        .then(response => {
          let results = response.data;
          let allResults = results.map(item => {
            return {
              ...item,
              country_image: `http://tourism-app-backend.test/api/destinations/image/${item.country_image}`
            }
          })
          this.destinations = allResults;
          console.log(this.destinations)
        })
        .catch(error => console.log(error))
    }
  },
  mounted() {
    this.getDestination();
  }
}
</script>

<style>
.title-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}

.title-enter-active {
  transition: all 0.9s ease;
}
</style>