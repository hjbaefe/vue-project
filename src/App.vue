<!--
  [3-1] 컴포넌트 분리

  컴포넌트를 분리하면:
  1. 코드 재사용성 향상
  2. 유지보수 용이
  3. 복잡한 UI를 작은 단위로 관리
-->

<script setup>
/**
 * script setup에서는 import한 컴포넌트가 자동으로 등록됩니다.
 * 별도의 components: { UserCard } 옵션이 필요 없습니다.
 */
import UserCard from './components/UserCard.vue'
</script>

<template>
  <div>
    <h1>컴포넌트 분리</h1>

    <!-- 1. 컴포넌트 사용 이유 -->
    <section>
      <h2>1. 왜 컴포넌트를 분리하나요?</h2>
      <ul>
        <li>재사용: 같은 UI를 여러 곳에서 사용</li>
        <li>유지보수: 관련 코드를 한 파일에서 관리</li>
        <li>가독성: App.vue가 너무 커지는 것을 방지</li>
        <li>협업: 여러 개발자가 다른 컴포넌트 작업 가능</li>
      </ul>
    </section>

    <!-- 2. 컴포넌트 사용 예시 -->
    <section>
      <h2>2. UserCard 컴포넌트 사용</h2>
      <p>아래는 별도 파일로 분리한 UserCard 컴포넌트입니다:</p>

      <div class="cards-container">
        <!-- 같은 컴포넌트를 여러 번 사용 -->
        <UserCard />
        <UserCard />
        <UserCard />
      </div>

      <p class="note">
        현재는 모든 카드가 같은 데이터를 보여줍니다.
        다음 커밋에서 props를 사용해 각각 다른 데이터를 전달합니다.
      </p>
    </section>

    <!-- 3. 파일 구조 -->
    <section>
      <h2>3. 권장 파일 구조</h2>
      <pre class="code-block">
src/
  components/
    UserCard.vue      # 재사용 가능한 UI 컴포넌트
    Button.vue
    Modal.vue
  views/              # 페이지 컴포넌트 (라우터 사용 시)
    Home.vue
    About.vue
  App.vue             # 루트 컴포넌트
  main.js             # 진입점
      </pre>
    </section>

    <!-- 4. script setup에서의 컴포넌트 등록 -->
    <section>
      <h2>4. 컴포넌트 등록 방법</h2>

      <h3>script setup (Vue 3 권장)</h3>
      <pre class="code-block">
&lt;script setup&gt;
import UserCard from './components/UserCard.vue'
// 자동으로 template에서 사용 가능!
&lt;/script&gt;
      </pre>

      <h3>Options API (Vue 2 스타일)</h3>
      <pre class="code-block">
&lt;script&gt;
import UserCard from './components/UserCard.vue'

export default {
  components: {
    UserCard  // 명시적 등록 필요
  }
}
&lt;/script&gt;
      </pre>
    </section>
  </div>
</template>

<style scoped>
section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  color: #42b883;
  margin-bottom: 10px;
}

h3 {
  margin: 15px 0 10px;
  color: #333;
}

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}

.cards-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.code-block {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
}

.note {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
  font-style: italic;
}
</style>
