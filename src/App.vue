<script setup>
import {ref} from "vue";

const isLoggedIn = ref(false);
const userRole = ref('guest');
const showDetails = ref(false);
const toggleCount = ref(0);

const roles = ['guest', 'user', 'admin']

function toggleLogin(){
  isLoggedIn.value = !isLoggedIn.value
}
function toggleDetails(){
  showDetails.value = !showDetails.value;
  toggleCount.value++;
}

</script>

<template>
  <div>
    <h1>조건부 렌더링</h1>
    <section>
      <h2>1. v-if / v-else</h2>
      <button @click="toggleLogin">
        {{ isLoggedIn ? '로그아웃' : '로그인' }}
      </button>
      <div v-if="isLoggedIn" class="box success">
        환영합니다! 로그인 상태입니다.
      </div>
      <div v-else class="box warning">
        로그인이 필요합니다.
      </div>
      <p class="note">
        v-if 는 조건이 false 일 때 DOM 에서 요소를 완전히 제거합니다.
      </p>
    </section>
    <section>
      <h2>2. v-if / v-else-if / v-else</h2>
      <p>
        <label for="">역할 선택 : </label>
        <select v-model="userRole">
          <option v-for="role in roles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </p>
      <div v-if="userRole === 'admin'" class="box admin" >
        관리자 권한 : 모든 기능 사용 가능
      </div>
      <div v-else-if="userRole === 'user'" class="box user">
        일반 사용자 : 기본 기능 사용 가능
      </div>
      <div v-else class="box guest">
        게스트 : 읽기만 가능
      </div>
    </section>

    <section>
      <h2>3. v-show</h2>
      <button @click="toggleDetails">
        상세정보 {{ showDetails ? '숨기기' : '보기'}}
      </button>
      <span class="counter">(토글 횟수: {{ toggleCount }} )</span>
      <div v-show="showDetails" class="box info">
        v-show 로 표시된 상세 정보입니다.
        이 요소는 항상 DOM에 존재하며, display 속성만 토글입니다.
      </div>
      <p class="note">
        v-show 는 display: none 으로 숨기므로 DOM 에 요소가 남아 있습니다.
      </p>
    </section>

    <!-- 4. v-if vs v-show 비교 -->
    <section>
      <h2>4. v-if vs v-show 비교</h2>
      <table>
        <thead>
        <tr>
          <th></th>
          <th>v-if</th>
          <th>v-show</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>렌더링</td>
          <td>조건부 렌더링 (DOM 추가/제거)</td>
          <td>항상 렌더링 (display 토글)</td>
        </tr>
        <tr>
          <td>초기 비용</td>
          <td>낮음 (false면 렌더링 안함)</td>
          <td>높음 (항상 렌더링)</td>
        </tr>
        <tr>
          <td>토글 비용</td>
          <td>높음 (DOM 조작)</td>
          <td>낮음 (CSS만 변경)</td>
        </tr>
        <tr>
          <td>사용 시점</td>
          <td>조건이 자주 안 바뀔 때</td>
          <td>자주 토글될 때</td>
        </tr>
        </tbody>
      </table>
    </section>

    <!-- 5. template에서 v-if 사용 -->
    <section>
      <h2>5. template 태그와 v-if</h2>
      <p>여러 요소를 조건부 렌더링할 때 template 태그를 사용합니다.</p>

      <template v-if="isLoggedIn">
        <p>로그인된 사용자 정보:</p>
        <ul>
          <li>이름: Vue 학습자</li>
          <li>역할: {{ userRole }}</li>
        </ul>
      </template>

      <p class="note">
        template 태그는 실제 DOM에 렌더링되지 않는 래퍼입니다.
      </p>
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

.box {
  margin: 10px 0;
  padding: 15px;
  border-radius: 4px;
}

.success {
  background: #d4edda;
  color: #155724;
}

.warning {
  background: #fff3cd;
  color: #856404;
}

.admin {
  background: #f8d7da;
  color: #721c24;
}

.user {
  background: #d1ecf1;
  color: #0c5460;
}

.guest {
  background: #e2e3e5;
  color: #383d41;
}

.info {
  background: #cce5ff;
  color: #004085;
}

.note {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.counter {
  margin-left: 10px;
  color: #666;
}

button, select {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #42b883;
  background: white;
  border-radius: 4px;
}

button:hover {
  background: #42b883;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #f5f5f5;
}

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>