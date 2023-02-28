import { createApp } from 'vue'
import './style.css'
import "@/mock/mockServer"
import router from '@/router/index'
import {pinia} from '@/store/index'
import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app')


import axios from 'axios'










