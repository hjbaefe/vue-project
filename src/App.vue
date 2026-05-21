<!--
  [5-1] Vue Router 기초 설정

  App.vue에서 RouterLink와 RouterView를 사용합니다.
-->

<script setup>
/**
 * RouterLink: 선언적 네비게이션 (a 태그 대신 사용)
 * RouterView: 현재 라우트에 맞는 컴포넌트가 렌더링되는 위치
 *
 * 두 컴포넌트는 vue-router에서 자동으로 등록됩니다.
 */
</script>

<template>
  <div id="app">
    <!-- 네비게이션 -->
    <nav class="navbar">
      <div class="nav-brand">Vue Router</div>
      <div class="nav-links">
        <!--
          RouterLink: a 태그처럼 동작하지만
          페이지 새로고침 없이 URL을 변경합니다.

          to: 이동할 경로 (문자열 또는 객체)
        -->
        <RouterLink to="/">홈</RouterLink>
        <RouterLink to="/about">소개</RouterLink>
        <RouterLink to="/contact">연락처</RouterLink>

        <!--
          name을 사용한 네비게이션 (권장)
          경로가 변경되어도 코드 수정 불필요
        -->
        <!-- <RouterLink :to="{ name: 'home' }">홈</RouterLink> -->
      </div>
    </nav>

    <!-- 라우트 정보 표시 -->
    <div class="route-info">
      현재 경로: <code>{{ $route.path }}</code>
    </div>

    <!-- 메인 컨텐츠 영역 -->
    <main class="content">
      <!--
        RouterView: 라우트에 매칭된 컴포넌트가 여기에 렌더링됩니다.

        / -> Home.vue
        /about -> About.vue
        /contact -> Contact.vue
      -->
      <RouterView />
    </main>

    <!-- 라우터 설명 -->
    <aside class="sidebar">
      <h3>Vue Router 구성요소</h3>

      <div class="info-box">
        <h4>RouterLink</h4>
        <ul>
          <li>선언적 네비게이션</li>
          <li>페이지 새로고침 없음</li>
          <li>active 클래스 자동 추가</li>
        </ul>
        <pre class="code-block">
&lt;RouterLink to="/about"&gt;
  소개
&lt;/RouterLink&gt;
        </pre>
      </div>

      <div class="info-box">
        <h4>RouterView</h4>
        <ul>
          <li>라우트 컴포넌트 렌더링 위치</li>
          <li>URL에 따라 다른 컴포넌트 표시</li>
        </ul>
        <pre class="code-block">
&lt;RouterView /&gt;
        </pre>
      </div>

      <div class="info-box">
        <h4>router/index.js</h4>
        <pre class="code-block">
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]
        </pre>
      </div>
    </aside>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr 300px;
}

.navbar {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: #35495e;
  color: white;
}

.nav-brand {
  font-size: 20px;
  font-weight: bold;
  margin-right: 30px;
  color: #42b883;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* RouterLink의 활성 상태 스타일 */
.nav-links a.router-link-active {
  background: #42b883;
}

.route-info {
  grid-column: 1 / -1;
  padding: 10px 20px;
  background: #f5f5f5;
  font-size: 14px;
}

.route-info code {
  background: #e0e0e0;
  padding: 2px 8px;
  border-radius: 3px;
}

.content {
  padding: 20px;
  overflow-y: auto;
}

.sidebar {
  background: #f9f9f9;
  padding: 20px;
  border-left: 1px solid #ddd;
  overflow-y: auto;
}

.sidebar h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.info-box {
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.info-box h4 {
  color: #35495e;
  margin-bottom: 10px;
}

.info-box ul {
  padding-left: 20px;
  margin-bottom: 10px;
}

.info-box li {
  font-size: 14px;
  margin: 3px 0;
}

.code-block {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.4;
  overflow-x: auto;
  margin: 0;
}
</style>
