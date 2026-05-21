/**
 * main.js - Vue 앱의 진입점
 *
 * [5-1] Vue Router 추가
 */

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 라우터 import
import router from './router'

// 앱 생성 및 라우터 등록
// use()로 플러그인(라우터, 상태관리 등)을 등록합니다
createApp(App)
    .use(router)  // 라우터 플러그인 등록
    .mount('#app')

