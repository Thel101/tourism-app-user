<template>
  <v-container fluid style="margin: 0; padding: 0;">
    <div class="parallax-container">
      <v-parallax :src="image" />
    </div>
    <h1 class="text-center my-5 text-amber">{{ country }}</h1>
   
      <v-row class="mx-lg-15" justify="center">
        <v-col v-for="(image, index) in images" :key="index" class="d-flex child-flex" cols="3">
          <v-img :src="image.destination_image" :lazy-src="`https://picsum.photos/id/11/100/60`" aspect-ratio="1" cover
            class="bg-grey-lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
 
  </v-container>

  <div class="text-h4 font-weight-regular text-center text-capitalize my-5">{{ description }}</div>
  <div class="text-body-1 text-center">{{ body }}</div>
  <div class="text-body-1 text-center my-5">Interested? Plan your trip here <router-link :to="{ name: 'Plans' }"
      class="text-blue">Plan your trip here</router-link></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import gsap from 'gsap';
export default {
  props: ['id'],
  setup(props) {
    const images = ref([]);
    const getDestinationImage = (id) => {
      axios.get(`http://tourism-app-backend.test/api/destination/images/${id}`)
        .then(response => {
          const results = response.data;
          const updatedResults = results.map(item => {
            return {
              destination_id: id,
              destination_image: `http://tourism-app-backend.test/api/destinations/image/${item}`
            }
          })
          images.value = updatedResults;
          console.log(images.value);
        })
        .catch(error => console.log(error));
    }
    const country = ref('');
    const description = ref('');
    const body = ref('');
    const image = ref([]);
    const getDestination = (id) => {
      axios.get(`/api/destination/${id}`)
        .then(response => {
          country.value = response.data.country;
          description.value = response.data.description;
          body.value = response.data.body;
          image.value = `/api/destinations/image/${response.data.country_image}`;
        })
        .catch(error => console.log(error))
    }

    onMounted(() => {
      getDestinationImage(props.id);
      getDestination(props.id);
    })

    return { getDestinationImage, images, getDestination, country, description, body, image}
  }

}
</script>

<style>
.parallax-container {
  max-height: 100vh;
  /* Define the desired height */
  overflow: hidden;
  /* Ensure the image doesn't overflow its container */
}

.v-parallax img {
  width: 100%;
  height: auto;
  object-fit: contain;
  /* Maintain the aspect ratio of the image */
}</style>