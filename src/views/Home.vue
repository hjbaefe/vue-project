<!--
  Home.vue - 홈 페이지

  views 폴더는 라우터에 연결되는 페이지 컴포넌트를 담습니다.
  components 폴더는 재사용 가능한 UI 컴포넌트를 담습니다.
-->

<script setup>
// 페이지 컴포넌트에서도 다른 컴포넌트를 사용할 수 있습니다
</script>

<template>
  <div class="home">
    <h1>홈 페이지</h1>
    <p>Vue Router를 사용한 SPA 예제입니다.</p>

    <section>
      <h2>Vue Router란?</h2>
      <ul>
        <li>SPA에서 페이지 전환을 관리</li>
        <li>URL에 따라 다른 컴포넌트를 렌더링</li>
        <li>브라우저 히스토리 관리</li>
        <li>페이지 새로고침 없이 화면 전환</li>
      </ul>
    </section>

    <section>
      <h2>학습 내용</h2>
      <ul>
        <li>라우터 설정 (createRouter, createWebHistory)</li>
        <li>RouterLink - 선언적 네비게이션</li>
        <li>RouterView - 라우트 컴포넌트 렌더링</li>
        <li>동적 라우트 (다음 커밋)</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home {
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

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>
