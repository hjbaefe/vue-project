<!--
  [3-2] Props

  부모에서 자식으로 데이터 전달
  단방향 데이터 흐름 (One-way Data Flow)
-->

<script setup>
import { ref } from 'vue'
import UserCard from './components/UserCard.vue'

// 사용자 데이터
const users = ref([
  { id: 1, name: '김철수', email: 'chulsoo@example.com', role: 'Admin', age: 28, active: true },
  { id: 2, name: '이영희', email: 'younghee@example.com', role: 'Developer', age: 25, active: true },
  { id: 3, name: '박민수', email: 'minsoo@example.com', role: 'Designer', age: 30, active: false },
])
</script>

<template>
  <div>
    <h1>Props - 부모에서 자식으로 데이터 전달</h1>

    <!-- 1. Props 전달 방법 -->
    <section>
      <h2>1. Props 전달 방법</h2>
      <pre class="code-block">
&lt;!-- 문자열 직접 전달 --&gt;
&lt;UserCard name="홍길동" /&gt;

&lt;!-- 변수 바인딩 (v-bind 또는 :) --&gt;
&lt;UserCard :name="userName" /&gt;

&lt;!-- 숫자는 v-bind 필요 --&gt;
&lt;UserCard :age="25" /&gt;

&lt;!-- 불리언: prop만 쓰면 true --&gt;
&lt;UserCard active /&gt;
&lt;UserCard :active="false" /&gt;
      </pre>
    </section>

    <!-- 2. 실제 사용 예시 -->
    <section>
      <h2>2. UserCard 컴포넌트에 Props 전달</h2>
      <div class="cards-container">
        <!-- 각 사용자 데이터를 props로 전달 -->
        <UserCard
            v-for="user in users"
            :key="user.id"
            :name="user.name"
            :email="user.email"
            :role="user.role"
            :age="user.age"
            :active="user.active"
        />
      </div>
    </section>

    <!-- 3. Props 정의 -->
    <section>
      <h2>3. 자식 컴포넌트에서 Props 정의</h2>
      <pre class="code-block">
// 간단한 방식 (배열)
defineProps(['name', 'email', 'role'])

// 상세한 방식 (객체) - 권장
defineProps({
  name: {
    type: String,
    required: true  // 필수 prop
  },
  email: {
    type: String,
    default: '이메일 없음'  // 기본값
  },
  age: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
})
      </pre>
    </section>

    <!-- 4. 단방향 데이터 흐름 -->
    <section>
      <h2>4. 단방향 데이터 흐름</h2>
      <ul>
        <li>Props는 부모 -> 자식으로만 전달됩니다</li>
        <li>자식 컴포넌트에서 props를 직접 수정하면 안됩니다</li>
        <li>자식이 부모에게 알리려면 emit을 사용합니다 (다음 커밋)</li>
      </ul>
      <div class="diagram">
        <div class="parent-box">
          부모 (App.vue)
          <div class="data-box">users 데이터</div>
          <div class="arrow">props로 전달</div>
        </div>
        <div class="children-box">
          <div class="child-box">자식 1</div>
          <div class="child-box">자식 2</div>
          <div class="child-box">자식 3</div>
        </div>
      </div>
    </section>

    <!-- 5. Props 타입들 -->
    <section>
      <h2>5. Props에서 사용 가능한 타입들</h2>
      <ul>
        <li>String, Number, Boolean</li>
        <li>Array, Object, Function</li>
        <li>Date, Symbol</li>
        <li>커스텀 클래스 (생성자 함수)</li>
      </ul>
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

.diagram {
  margin-top: 15px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}

.parent-box {
  display: inline-block;
  padding: 15px 30px;
  background: #42b883;
  color: white;
  border-radius: 8px;
  margin-bottom: 10px;
}

.data-box {
  margin-top: 10px;
  padding: 5px 10px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  font-size: 14px;
}

.arrow {
  margin: 15px 0;
  color: #666;
  font-size: 14px;
}

.arrow::after {
  content: ' ↓';
}

.children-box {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.child-box {
  padding: 10px 20px;
  background: #35495e;
  color: white;
  border-radius: 4px;
  font-size: 14px;
}
</style>
