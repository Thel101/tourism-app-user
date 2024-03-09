<template>
  <nav>
    <v-app-bar theme="dark" app flat>

      <v-toolbar-title>Asiavista Expeditions</v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="d-flex" v-if="!mobile">
        <v-hover v-slot="{ hover }" open-delay="100" v-for="link in links" :key="link.text">
          <router-link v-show="!mobile" :to="link.route" class="white--text links">
            <v-btn text :class="{ 'on-hover': hover }" rounded>
              {{ link.text }}
            </v-btn>
          </router-link>
        </v-hover>
        <template v-if="!authStore.user">
        <div class="d-flex">
          <router-link to="/register">
            <v-btn rounded="xl" variant="outlined" color="blue-lighten-2">Register</v-btn>
          </router-link>


          <router-link to="/login">
            <v-btn prepend-icon="mdi-account" class="ml-2" rounded="xl" variant="outlined"
              color="green-lighten-2">Login</v-btn>
          </router-link>
        </div>
      </template>

      <template v-else>
        <div class="d-flex">
          <v-avatar color="green-lighten-1">
            {{ getUserInitials }}
          </v-avatar>

          <v-btn @click="authStore.handleLogout" prepend-icon="mdi-account" class="ml-2" rounded="xl" variant="outlined"
            color="green-lighten-2">LogOut</v-btn>
        </div>


      </template>
      </div>

      <div>
        <v-btn v-show="mobile" @click="toggleMobileNav"><v-icon>mdi-menu</v-icon></v-btn>
      </div>
    </v-app-bar>
  </nav>
  <div v-if="mobileNav" class="mobile-nav">
    <ul class="d-flex" style="flex-direction: column;" v-for="link in links" :key="link.text">
      <li @click="mobileNav = !mobileNav"><router-link :to="link.route" class="links" flat>

          {{ link.text }}

        </router-link></li>
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
export default {
  setup() {
    const links = ref([
      { text: 'Home', route: '/' },
      { text: 'Destinations', route: '/destinations' },
      { text: 'Plan your trips', route: '/plans' },
      { text: 'About', route: '/about' },

    ]);
    const authStore = useAuthStore();
    const mobile = ref(window.innerWidth < 600);
    const windowWidth = ref();

    const detectWindowSize = () => {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value <= 750) {
        mobile.value = true;
        return;
      }
      mobile.value = false;
      mobileNav.value = false;
    }
    const mobileNav = ref(false);
    const toggleMobileNav = () => {
      mobileNav.value = !(mobileNav.value);
    }

    window.addEventListener('resize', detectWindowSize);
    detectWindowSize();
    return { links, authStore, mobile, mobileNav, toggleMobileNav, detectWindowSize }
  },
  computed: {
    getUserInitials() {
      const userName = this.authStore.user.name;
      const nameParts = userName.split(' ');

      const initials = nameParts.map(part => part.charAt(0));
      return initials.join('');
    }
  }
}
</script>
<style scoped>
nav {
  @media (min-width: 1140px) {
    max-width: 1140px;
  }
}

.v-btn.on-hover {
  color: rgb(233, 11, 193);
}

.links {
  text-decoration: none;
  list-style: none;
}

.links:hover {
  text-decoration: none;
}

.links:active {
  color: rgb(45, 84, 241);
}

.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  /* Adjust as needed */
  height: 100%;
  background-color: #ece3e3;
  /* Example background color */
  z-index: 1000;
  /* Ensure it's above other content */
  padding: 20px;
  margin-top: 50px;
  /* Adjust as needed */
  box-sizing: border-box;
}
.mobile-nav li{
  list-style: none;
  padding: 10px;
}
</style>