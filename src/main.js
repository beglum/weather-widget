import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false
Vue.config.devtools = true;

export const eventBus = new Vue()

Vue.use(vueCustomElement)

App.vuetify = vuetify
Vue.customElement('weather-widget', App)
