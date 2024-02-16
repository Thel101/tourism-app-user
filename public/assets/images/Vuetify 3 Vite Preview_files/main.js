import { createApp } from '/node_modules/.vite/deps/vue.js?v=a6f38003'
import App from '/src/App.vue?t=1707993242562'
import router from '/src/router/index.js?t=1707994147143'
import vuetify from '/src/plugins/vuetify.js'
import { loadFonts } from '/src/plugins/webfontloader.js'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
