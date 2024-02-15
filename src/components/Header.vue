<template>
  <nav>
      <v-app-bar theme="dark" app flat>

          <v-toolbar-title >Asiavista Expeditions</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-hover v-slot="{ hover }" open-delay="100" v-for="link in links" :key="link.text">
            <router-link :to="link.route" class="white--text links"> 
            <v-btn text :class="{ 'on-hover': hover }" rounded>
                      {{ link.text }}
              </v-btn>
            </router-link>
          </v-hover>

      </v-app-bar>
  </nav>
</template>
<script>
export default {
  data() {
      return {
          links: [
              { text: 'Home', route: '/' },
              { text: 'Destinations', route: '/destinations' },
              { text: 'Plan your trips', route: '/plan-trips' },
              { text: 'About', route: '/about' },
              { text: 'Contact Us', route: '/contact' },
          ]
      }
  }
}
</script>
<style scoped>
.v-btn.on-hover {
  color: rgb(233, 11, 193);
}
.links{
  text-decoration: none;
}
.links:hover{
  text-decoration: none;
}
.links:active{
  color: rgb(45, 84, 241);
}
</style>