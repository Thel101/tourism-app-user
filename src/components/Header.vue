<template>

  <nav>
    <v-app-bar theme="dark" app flat>

      <v-toolbar-title>Asiavista Expeditions</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-hover open-delay="100" v-for="link in links" :key="link.text">
        <router-link :to="link.route" class="white--text links">
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
      <!-- <div class="d-flex">
        <router-link to="/login">
        <v-btn prepend-icon="mdi-account" class="ml-2" rounded="xl" variant="outlined"
          color="green-lighten-2">LogOut</v-btn>
      </router-link>
      </div> -->




    </v-app-bar>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
  setup() {
    const hover = ref(false)
    const links = ref([
      { text: 'Home', route: '/' },
      { text: 'Destinations', route: '/destinations' },
      { text: 'Plan your trips', route: '/plans' },
      { text: 'About', route: '/about' },
    ]);
    const authStore = useAuthStore();
    const router = useRouter();
    const authenticatePlansRoute = (to, from, next) => {

      if (!authStore.user) {
        next({ path: '/login', query: { redirectMessage: 'Please login to access this page.' } });
      } else {
        next();
      }
    };

    router.beforeEach((to, from, next) => {
      if (to.path === '/plans') {
        authenticatePlansRoute(to, from, next);
      } else {

        next();
      }
    });

    return { links, router, hover, authStore }
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
.v-btn.on-hover {
  color: rgb(233, 11, 193);
}

.links {
  text-decoration: none;
}

.links:hover {
  text-decoration: none;
}

.links:active {
  color: rgb(45, 84, 241);
}
</style>