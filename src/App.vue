<template>
  <v-app>
    <Header></Header>
    <v-main>
      <router-view>
       
      </router-view>


    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data: () => ({
    return (){
      user = {}
    }
  }),

 
}
</script>
<style>
/* .route-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 1 ease-out;
}
.route-leave-to{
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 1 ease-in;
} */
</style>