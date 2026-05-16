<!--
  [3-3] Emits

  자식에서 부모로 이벤트 전달
  단방향 데이터 흐름을 유지하면서 자식이 부모에게 알림
-->

<script setup>
import { ref } from 'vue'
import UserCard from './components/UserCard.vue'

const users = ref([
  { id: 1, name: '김철수', email: 'chulsoo@example.com', role: 'Admin', age: 28, active: true },
  { id: 2, name: '이영희', email: 'younghee@example.com', role: 'Developer', age: 25, active: true },
  { id: 3, name: '박민수', email: 'minsoo@example.com', role: 'Designer', age: 30, active: false },
])

// 이벤트 로그
const eventLog = ref([])

function addLog(message) {
  eventLog.value.unshift({
    time: new Date().toLocaleTimeString(),
    message
  })
  // 최대 5개만 유지
  if (eventLog.value.length > 5) {
    eventLog.value.pop()
  }
}

// 자식 컴포넌트에서 emit된 이벤트 처리
function handleDelete(name) {
  const index = users.value.findIndex(u => u.name === name)
  if (index !== -1) {
    users.value.splice(index, 1)
    addLog(`삭제됨: ${name}`)
  }
}

function handleToggleActive(name) {
  const user = users.value.find(u => u.name === name)
  if (user) {
    user.active = !user.active
    addLog(`${name} 상태 변경: ${user.active ? '활성' : '비활성'}`)
  }
}

function handleEdit(userData) {
  addLog(`편집 요청: ${userData.name} (${userData.role})`)
  // 실제로는 모달을 열거나 편집 폼을 표시
  alert(`편집: ${JSON.stringify(userData, null, 2)}`)
}
</script>

<template>
  <div>
    <h1>Emits - 자식에서 부모로 이벤트 전달</h1>

    <!-- 1. 이벤트 리스닝 -->
    <section>
      <h2>1. 부모에서 이벤트 리스닝</h2>
      <pre class="code-block">
&lt;!-- @이벤트명="핸들러" 형식 --&gt;
&lt;UserCard
  :name="user.name"
  @delete="handleDelete"
  @toggle-active="handleToggleActive"
  @edit="handleEdit"
/&gt;

&lt;script setup&gt;
function handleDelete(name) {
  // name은 자식이 emit할 때 전달한 페이로드
  console.log('삭제:', name)
}
&lt;/script&gt;
      </pre>
    </section>

    <!-- 2. 이벤트 로그 -->
    <section>
      <h2>2. 이벤트 로그</h2>
      <div class="event-log">
        <div v-if="eventLog.length === 0" class="no-events">
          아직 이벤트가 없습니다. 카드의 버튼을 클릭해보세요.
        </div>
        <div v-for="(log, index) in eventLog" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </section>

    <!-- 3. UserCard 컴포넌트들 -->
    <section>
      <h2>3. UserCard 컴포넌트</h2>
      <div class="cards-container">
        <UserCard
            v-for="user in users"
            :key="user.id"
            :name="user.name"
            :email="user.email"
            :role="user.role"
            :age="user.age"
            :active="user.active"
            @delete="handleDelete"
            @toggle-active="handleToggleActive"
            @edit="handleEdit"
        />
      </div>
      <p v-if="users.length === 0" class="no-users">
        모든 사용자가 삭제되었습니다.
      </p>
    </section>

    <!-- 4. defineEmits 설명 -->
    <section>
      <h2>4. 자식 컴포넌트에서 Emit 정의</h2>
      <pre class="code-block">
// 배열 방식
const emit = defineEmits(['delete', 'toggle-active', 'edit'])

// 사용
function handleDelete() {
  emit('delete', props.name)  // 이벤트명, 페이로드
}

// 여러 값 전달
function handleEdit() {
  emit('edit', {
    name: props.name,
    email: props.email,
    role: props.role
  })
}
      </pre>
    </section>

    <!-- 5. 데이터 흐름 다이어그램 -->
    <section>
      <h2>5. 데이터 흐름</h2>
      <div class="diagram">
        <div class="flow-container">
          <div class="flow-item parent">
            <strong>부모 (App.vue)</strong>
            <div>users 데이터 관리</div>
          </div>
          <div class="arrows">
            <div class="arrow-down">props (데이터)</div>
            <div class="arrow-up">emit (이벤트)</div>
          </div>
          <div class="flow-item child">
            <strong>자식 (UserCard.vue)</strong>
            <div>UI 표시 + 버튼 클릭</div>
          </div>
        </div>
      </div>
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

.event-log {
  background: #1a1a1a;
  color: #00ff00;
  padding: 15px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  min-height: 100px;
}

.no-events {
  color: #666;
}

.log-item {
  margin: 5px 0;
}

.log-time {
  color: #888;
  margin-right: 10px;
}

.log-message {
  color: #00ff00;
}

.no-users {
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.diagram {
  margin-top: 15px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.flow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.flow-item {
  padding: 15px 30px;
  border-radius: 8px;
  text-align: center;
}

.parent {
  background: #42b883;
  color: white;
}

.child {
  background: #35495e;
  color: white;
}

.arrows {
  display: flex;
  gap: 50px;
}

.arrow-down, .arrow-up {
  padding: 5px 15px;
  font-size: 14px;
  color: #666;
}

.arrow-down::after {
  content: ' ↓';
}

.arrow-up::before {
  content: '↑ ';
}
</style>
