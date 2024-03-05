import { createApp, markRaw } from 'vue'
import { createPinia} from 'pinia';
import './axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

const pinia = createPinia();
pinia.use (({store})=>{
  store.router = markRaw(router)
}
  )
loadFonts()

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
