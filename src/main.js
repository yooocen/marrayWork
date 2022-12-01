import { createApp, Vue } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import { createRouter, createWebHashHistory} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Painting from './components/Painting.vue'
const routes = [
    {path: '/', component: HelloWorld},
    {path : '/painting', component: Painting}
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
const app = createApp(App);
app.use(router)
app.mount('#app')

