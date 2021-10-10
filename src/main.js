/*import App from './App.vue'
import { defineCustomElement } from "vue";

const WeatherWidget = defineCustomElement(App);

customElements.define('weather-widget', WeatherWidget);*/

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueDraggable from 'vue-draggable'

// TODO: Проверить необходимость custom element
import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false
Vue.config.devtools = true;

export const eventBus = new Vue()

Vue.use(vueCustomElement)
Vue.use(VueDraggable)

App.vuetify = vuetify
Vue.customElement('weather-widget', App)

/*new Vue({
  vuetify,
  render: h => h(App)
}).$mount('weather-widget')*/
