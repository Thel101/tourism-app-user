<template>
    <v-footer theme="dark" padless class="mt-10 white--text pa-10" flat>
      <v-row justify="center" no-gutters>
        <v-col class="transparent" cols="12" md="4" sm="12">
          <div v-for="link in links" :key="link" flat>
            <router-link :to="link.route" class="text-white links my-5">
          <v-btn text :class="{ 'on-hover': hover }" rounded>
            {{ link.text }}
          </v-btn>
        </router-link>
          </div>
  
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <span class="d-flex headline ma-10 text-sm-center">Reach Out To Us</span>
          <div class="ma-10">
          <v-icon class="white--text mr-5 display-2">mdi-facebook </v-icon>
          <v-icon class="white--text mr-5 display-2">mdi-instagram </v-icon>
          <v-icon class="white--text mr-5 display-2">mdi-whatsapp </v-icon>
          <v-icon class="white--text display-2">mdi-gmail </v-icon>
          </div>
          
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <p class="text-center headline">About Us</p>
          <span class="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus voluptate a quidem maiores quisquam earum iusto nam et dolorum mollitia?</span>
          <v-list-item :style="{ cursor : isHovered ? 'pointer' : 'default'}" @mouseover="isHovered = true" @mouseout="isHovered = false" ><v-icon class="white--text mr-5" cursor="pointer">mdi-phone</v-icon> 09400626347</v-list-item>
          <v-list-item :style="{ cursor : isHovered ? 'pointer' : 'default'}" @mouseover="isHovered = true" @mouseout="isHovered = false"><v-icon class="white--text mr-5">mdi-gmail</v-icon> asiavist@gmail.com</v-list-item>
          <v-list-item :style="{ cursor : isHovered ? 'pointer' : 'default'}" @mouseover="isHovered = true" @mouseout="isHovered = false"><v-icon class="white--text mr-5">mdi-map-marker</v-icon> Yangon, Myanmar</v-list-item>
        </v-col>
  
        <v-col class="py-4 text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>AsiaVista Expeditions</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  <script>
  export default {
    data: () => ({
      hover : false,
      isHovered :false,
      links:[
    { text: 'Home', route: '/' },
        { text: 'Destinations', route: '/destinations' },
        { text: 'Plan your trips', route: '/plans' },
        { text: 'About', route: '/about' },
    ],
    }),
  
  }
  </script>
  
  <style></style>