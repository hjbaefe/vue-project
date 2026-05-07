<script setup>
import {ref} from "vue";

const fruits = ref(['사과', '바나나', '오렌지', '포도']);

const users = ref([
  {id: 1, name: '김철수', age: 25, active: true},
  {id: 2, name: '이영희', age: 30, active: false},
  {id: 3, name: '박민수', age: 28, active: true},

])

const userProfile = ref({
  name: 'Vue 학습자',
  email: 'vue@example.com',
  role: 'developer',
  level: 'beginner'
})

const newFruit = ref('');
const newUser = ref({name: '', age: ''});
let nextUserId = 4

function addFruit() {
  if (newFruit.value.trim()) {
    fruits.value.push(newFruit.value.trim())
    newFruit.value = ''
  }
}

function removeFruit(index) {
  fruits.value.splice(index, 1)
}

function addUser() {
  if (newUser.value.name && newUser.value.age) {
    users.value.push({
      id: nextUserId++,
      name: newUser.value.name,
      age: Number(newUser.value.age),
      active: true
    })
    newUser.value = {name: '', age: ''}
  }
}

function removeUser(id) {
  const index = users.value.findIndex(u => u.id === id)
  if (index !== -1) {
    users.value.splice(index, 1)
  }
}

function toggleActive(id) {
  const user = users.value.find(u => u.id === id)
  if (user) {
    user.active = !user.active
  }
}
</script>

<template>
  <div>
    <h1>리스트 렌더링</h1>

    <!-- 1. 기본 v-for -->
    <section>
      <h2>1. 기본 배열 순회</h2>
      <ul>
        <!-- item in items 형식 -->
        <li v-for="fruit in fruits" :key="fruit">
          {{ fruit }}
        </li>
      </ul>
      <p class="note">
        :key는 Vue가 각 항목을 추적하는 데 사용합니다. 고유한 값을 사용하세요.
      </p>
    </section>

    <!-- 2. 인덱스 사용 -->
    <section>
      <h2>2. 인덱스와 함께 순회</h2>
      <ul>
        <!-- (item, index) in items 형식 -->
        <li v-for="(fruit, index) in fruits" :key="index">
          {{ index + 1 }}. {{ fruit }}
          <button @click="removeFruit(index)" class="btn-small">삭제</button>
        </li>
      </ul>

      <div class="add-form">
        <input v-model="newFruit" placeholder="새 과일" @keyup.enter="addFruit" />
        <button @click="addFruit">추가</button>
      </div>

      <p class="note">
        인덱스를 key로 사용하는 것은 비권장입니다 (아이템 순서가 바뀔 수 있을 때).
      </p>
    </section>

    <!-- 3. 객체 배열 순회 -->
    <section>
      <h2>3. 객체 배열 순회</h2>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>나이</th>
          <th>상태</th>
          <th>액션</th>
        </tr>
        </thead>
        <tbody>
        <!-- 고유 id를 key로 사용 (권장) -->
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>
              <span :class="user.active ? 'active' : 'inactive'">
                {{ user.active ? '활성' : '비활성' }}
              </span>
          </td>
          <td>
            <button @click="toggleActive(user.id)" class="btn-small">토글</button>
            <button @click="removeUser(user.id)" class="btn-small btn-danger">삭제</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="add-form">
        <input v-model="newUser.name" placeholder="이름" />
        <input v-model="newUser.age" type="number" placeholder="나이" />
        <button @click="addUser">사용자 추가</button>
      </div>
    </section>

    <!-- 4. 객체 속성 순회 -->
    <section>
      <h2>4. 객체 속성 순회</h2>
      <ul>
        <!-- (value, key, index) in object 형식 -->
        <li v-for="(value, key, index) in userProfile" :key="key">
          {{ index + 1 }}. {{ key }}: {{ value }}
        </li>
      </ul>
    </section>

    <!-- 5. 범위 v-for -->
    <section>
      <h2>5. 숫자 범위 순회</h2>
      <p>
        <!-- n in 숫자: 1부터 해당 숫자까지 -->
        <span v-for="n in 5" :key="n" class="number-box">
          {{ n }}
        </span>
      </p>
    </section>

    <!-- 6. v-for와 v-if 함께 사용 -->
    <section>
      <h2>6. 필터링 (v-for + 조건)</h2>
      <p>활성 사용자만 표시:</p>
      <ul>
        <!--
          v-for와 v-if를 같은 요소에 쓰지 마세요!
          대신 computed나 필터링된 배열을 사용하세요.
          여기서는 template 래퍼를 사용합니다.
        -->
        <template v-for="user in users" :key="user.id">
          <li v-if="user.active">
            {{ user.name }} ({{ user.age }}세)
          </li>
        </template>
      </ul>
      <p class="note">
        v-for와 v-if를 같은 요소에 쓰지 않는 것이 좋습니다.
        computed로 필터링하거나 template 래퍼를 사용하세요.
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

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #f5f5f5;
}

.active {
  color: green;
  font-weight: bold;
}

.inactive {
  color: #999;
}

button {
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

.btn-small {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-danger:hover {
  background: #dc3545;
  color: white;
}

.add-form {
  margin-top: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}

.add-form input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.number-box {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 5px;
  background: #42b883;
  color: white;
  border-radius: 4px;
}

.note {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  font-style: italic;
}
</style>