<!--
  [4-1] Computed - 계산된 속성

  반응형 데이터를 기반으로 파생된 값을 계산합니다.
  의존성이 변경될 때만 재계산됩니다 (캐싱).
-->

<script setup>
import { ref, computed } from 'vue'

// 원본 데이터
const firstName = ref('길동')
const lastName = ref('홍')
const items = ref([
  { name: '사과', price: 1000, quantity: 3 },
  { name: '바나나', price: 1500, quantity: 2 },
  { name: '오렌지', price: 2000, quantity: 1 },
])
const searchQuery = ref('')
const users = ref([
  { name: '김철수', age: 25, active: true },
  { name: '이영희', age: 30, active: false },
  { name: '박민수', age: 28, active: true },
  { name: '최지현', age: 22, active: true },
])

/**
 * computed: 반응형 데이터에서 파생된 값
 *
 * 특징:
 * 1. 의존성 기반 캐싱 - 의존하는 값이 변경될 때만 재계산
 * 2. 읽기 전용 (기본) - setter를 추가하면 쓰기 가능
 * 3. 동기적 - 비동기 작업은 watch 사용
 */

// 기본 computed (getter만)
const fullName = computed(() => {
  console.log('fullName 계산됨')  // 캐싱 확인용
  return `${lastName.value}${firstName.value}`
})

// 총 금액 계산
const totalPrice = computed(() => {
  return items.value.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
})

// 검색 필터링
const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value
  }
  return users.value.filter(user =>
      user.name.includes(searchQuery.value)
  )
})

// 활성 사용자만
const activeUsers = computed(() => {
  return users.value.filter(user => user.active)
})

// 통계
const userStats = computed(() => ({
  total: users.value.length,
  active: activeUsers.value.length,
  averageAge: Math.round(
      users.value.reduce((sum, u) => sum + u.age, 0) / users.value.length
  )
}))

// getter와 setter를 가진 computed
const fullNameWritable = computed({
  get() {
    return `${lastName.value}${firstName.value}`
  },
  set(newValue) {
    // 성과 이름 분리 (첫 글자가 성)
    lastName.value = newValue.charAt(0)
    firstName.value = newValue.slice(1)
  }
})

// 아이템 추가
function addItem() {
  items.value.push({
    name: '포도',
    price: 3000,
    quantity: 1
  })
}

// 수량 변경
function increaseQuantity(index) {
  items.value[index].quantity++
}
</script>

<template>
  <div>
    <h1>Computed - 계산된 속성</h1>

    <!-- 1. 기본 computed -->
    <section>
      <h2>1. 기본 사용법</h2>
      <div class="input-group">
        <label>
          성: <input v-model="lastName" />
        </label>
        <label>
          이름: <input v-model="firstName" />
        </label>
      </div>
      <p>전체 이름: <strong>{{ fullName }}</strong></p>
      <p class="note">
        computed는 의존하는 값(lastName, firstName)이 변경될 때만 재계산됩니다.
      </p>
    </section>

    <!-- 2. 장바구니 예제 -->
    <section>
      <h2>2. 장바구니 총 금액</h2>
      <table>
        <thead>
        <tr>
          <th>상품</th>
          <th>가격</th>
          <th>수량</th>
          <th>소계</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.price.toLocaleString() }}원</td>
          <td>
            <button @click="increaseQuantity(index)">+</button>
            {{ item.quantity }}
          </td>
          <td>{{ (item.price * item.quantity).toLocaleString() }}원</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="3"><strong>총 금액</strong></td>
          <td><strong>{{ totalPrice.toLocaleString() }}원</strong></td>
        </tr>
        </tfoot>
      </table>
      <button @click="addItem">상품 추가</button>
    </section>

    <!-- 3. 필터링 -->
    <section>
      <h2>3. 검색 필터링</h2>
      <input v-model="searchQuery" placeholder="이름 검색..." />
      <ul>
        <li v-for="user in filteredUsers" :key="user.name">
          {{ user.name }} ({{ user.age }}세)
          <span v-if="!user.active" class="inactive">[비활성]</span>
        </li>
      </ul>
      <p>검색 결과: {{ filteredUsers.length }}명</p>
    </section>

    <!-- 4. 통계 -->
    <section>
      <h2>4. 통계 computed</h2>
      <ul>
        <li>전체 사용자: {{ userStats.total }}명</li>
        <li>활성 사용자: {{ userStats.active }}명</li>
        <li>평균 나이: {{ userStats.averageAge }}세</li>
      </ul>
    </section>

    <!-- 5. getter + setter -->
    <section>
      <h2>5. Writable Computed (getter + setter)</h2>
      <p>
        <input v-model="fullNameWritable" placeholder="전체 이름 입력" />
      </p>
      <p>성: {{ lastName }}, 이름: {{ firstName }}</p>
      <pre class="code-block">
const fullNameWritable = computed({
  get() {
    return lastName.value + firstName.value
  },
  set(newValue) {
    lastName.value = newValue.charAt(0)
    firstName.value = newValue.slice(1)
  }
})
      </pre>
    </section>

    <!-- 6. computed vs method -->
    <section>
      <h2>6. Computed vs Method</h2>
      <table class="comparison">
        <thead>
        <tr>
          <th></th>
          <th>computed</th>
          <th>method</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>캐싱</td>
          <td>의존성 기반 캐싱</td>
          <td>캐싱 없음 (매번 실행)</td>
        </tr>
        <tr>
          <td>호출</td>
          <td>{{  fullName }}</td>
          <td></td>
        </tr>
        <tr>
          <td>용도</td>
          <td>파생 데이터</td>
          <td>액션, 이벤트 핸들러</td>
        </tr>
        </tbody>
      </table>
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

.input-group {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.input-group label {
  display: flex;
  align-items: center;
  gap: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

tfoot td {
  background: #f0f9f4;
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

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}

.inactive {
  color: #999;
  font-size: 12px;
}

.note {
  font-size: 14px;
  color: #666;
  font-style: italic;
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

.comparison th, .comparison td {
  text-align: center;
}
</style>
