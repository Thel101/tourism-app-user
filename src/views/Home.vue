<template>
  <div class="home">
    
    <Hero></Hero>
    <transition name="title" appear>
      <h1 class="text-center mt-5">Welcome to <span class="text-green">Asiavisa Expeditions</span></h1>
    </transition>
   
    <!--- Content 1-->
    <transition name="greeting" appear>
      <div v-if="pageContent && pageContent[0]" class="pa-10 teal lighten-5" v-bind="pageContent[0]">
      <v-row class="fill-height text-center align-center" style="height: 30vh;">
        <v-col class="col-sm-12 col-md-12 text-md-center">
          <span class="headline">{{ pageContent[0].description }}</span>
        </v-col>
      </v-row>
    </div>
    </transition>
    

    <!--- Content 2-->
    <div>

      <v-card v-if="pageContent && pageContent[1]" flat>
        <v-row class="fill-height align-center">
          <v-col class="col-sm-12 col-md-4" style="margin: 0; padding: 0;">
            <div class="blue lighten-2 elevation-10" style="height: 40vh;">
              <img :src="pageContent[1].background" alt="" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </v-col>
          <v-col class="col-sm-12 col-md-6 text-md-left">
            <h3 class="font-weight-regular mx-10 text-center">{{ pageContent[1].description }}</h3>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <!--- Content 3-->
    <div class="mt-10">

      <v-card v-if="pageContent && pageContent[2]" flat>
        <v-row class="fill-height align-center px-10 bg-amber-accent-2">
          <v-col class="col-sm-12 col-md-3" style="margin: 0; padding: 0;">
            <div class="blue lighten-2 elevation-10" style="height: 30vh;">
              <img :src="pageContent[2].background" alt="" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </v-col>
          <transition name="content-2" appear>
            <v-col class="col-sm-12 col-md-6 text-md-center">
              <h3 class="headline">{{ pageContent[2].title }}</h3>
 
          </v-col>
          </transition>
          <transition name="content-2-body" appear>
            <v-col class="col-sm-12 col-md-3 mt-5" style="margin: 0; padding: 0;">
            <div class="d-flex blue lighten-2 text-center align-center" style="height: 30vh;">
              <h3 class="font-weight-regular">{{ pageContent[2].description }}</h3>
            </div>
          </v-col>
          </transition>
          
          
        </v-row>
      </v-card>
    </div>
    <!--- Content 4-->
    <div class="mt-10">

      <v-card v-if="pageContent && pageContent[3]" flat>
        <v-row class="fill-height align-center">
          <v-col class="col-sm-12 col-md-6 text-md-center">
            <h3 class="headline mx-10 font-weight-regular">{{ pageContent[3].description }}</h3>
          </v-col>
          <v-col class="col-sm-12 col-md-6" style="margin: 0; padding: 0;">
            <div class="blue lighten-2 elevation-10" style="height: 50vh;">
              <img :src="pageContent[3].background" alt="" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </v-col>

        </v-row>
      </v-card>
    </div>
    <!--- Content 4-->

    <!--- Content 5-->
    <div>
      
    </div>
    <!--- Content 5-->
    
  </div>
</template>

<script>
// @ is an alias to /src

import Hero from '../components/Hero.vue';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Hero
  },
  data() {
    return {
      page : "Home",
      pageContent: []
    }
  },
  methods: {
    getPageContent(){
      axios.get(`http://tourism-app-backend.test/api/contents/${this.page}`)
      .then(response=>{
        this.pageContent = response.data
        let results = this.pageContent.map(item=>{
          return{
            ...item,
            background : `http://tourism-app-backend.test/api/contents/image/${item.background}`
          }
        })
        this.pageContent = results;
      })
      .catch(error=>console.log(error));
    }
  },

  mounted() {
    this.getPageContent();
  }

}
</script>
<style>

.greeting-enter-from,
.title-enter-from {
    opacity: 0;
    transform: translateX(-60px);
  }
  .greeting-enter-active,
  .title-enter-active {
    transition: all 0.8s ease;
  }
.content-2-enter-from{
  opacity: 0;
  transform: translateX(-80px);
}
.content-2-enter-active{
  transition: all 2s ease;
}
.content-2-body-enter-from{
  opacity: 0;
  transform: translateX(-40px);
}
.content-2-body-enter-active{
  transition: all 3.5s ease;
}

</style>

