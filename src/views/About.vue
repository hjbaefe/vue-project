<!--
  About.vue - 소개 페이지
-->

<script setup>
</script>

<template>
  <div class="about">
    <h1>소개 페이지</h1>
    <p>이 페이지는 /about 경로에서 렌더링됩니다.</p>

    <section>
      <h2>라우터 설정 예시</h2>
      <pre class="code-block">
// router/index.js
const routes = [
  {
    path: '/about',
    name: 'about',
    component: About
  }
]
      </pre>
    </section>

    <section>
      <h2>파일 구조</h2>
      <pre class="code-block">
src/
  router/
    index.js      # 라우터 설정
  views/
    Home.vue      # / 경로
    About.vue     # /about 경로
    Contact.vue   # /contact 경로
  components/
    ...           # 재사용 컴포넌트
  App.vue         # RouterView 포함
      </pre>
    </section>
  </div>
</template>

<style scoped>
.about {
  padding: 20px;
}

h1 {
  color: #42b883;
  margin-bottom: 10px;
}

section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  color: #35495e;
  margin-bottom: 10px;
}

.code-block {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}
</style>
