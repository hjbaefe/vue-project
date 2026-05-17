<!--
  [4-2] Watch - 감시자

  반응형 데이터의 변화를 감시하고 부수 효과(side effect)를 실행합니다.
  API 호출, 로깅, 외부 상태 동기화 등에 사용합니다.
-->

<script setup>
import { ref, watch, watchEffect } from 'vue'

// 감시할 데이터
const searchQuery = ref('')
const count = ref(0)
const user = ref({ name: '홍길동', age: 25 })
const isOnline = ref(true)

// 로그
const logs = ref([])

function addLog(message) {
  logs.value.unshift({
    time: new Date().toLocaleTimeString(),
    message
  })
  if (logs.value.length > 10) logs.value.pop()
}

/**
 * 1. 기본 watch
 * watch(source, callback)
 */
watch(searchQuery, (newValue, oldValue) => {
  addLog(`검색어 변경: "${oldValue}" -> "${newValue}"`)
})

/**
 * 2. immediate 옵션
 * 컴포넌트 마운트 시 즉시 실행
 */
watch(count, (newValue) => {
  addLog(`카운트: ${newValue}`)
}, { immediate: true })

/**
 * 3. deep 옵션
 * 객체 내부 속성 변화도 감시
 */
watch(user, (newValue) => {
  addLog(`사용자 변경: ${JSON.stringify(newValue)}`)
}, { deep: true })

/**
 * 4. 특정 속성만 감시
 * getter 함수 사용
 */
watch(
    () => user.value.age,
    (newAge, oldAge) => {
      addLog(`나이 변경: ${oldAge} -> ${newAge}`)
    }
)

/**
 * 5. 여러 소스 감시
 */
watch(
    [searchQuery, count],
    ([newQuery, newCount], [oldQuery, oldCount]) => {
      // 둘 중 하나라도 변경되면 실행
      console.log('multiple watch:', { newQuery, newCount })
    }
)

/**
 * 6. watchEffect
 * 콜백 내에서 사용된 모든 반응형 데이터를 자동으로 추적
 */
watchEffect(() => {
  // isOnline이 변경될 때마다 실행
  if (!isOnline.value) {
    console.log('오프라인 상태입니다')
  }
})

// 검색 시뮬레이션 (디바운스 예제)
const searchResults = ref([])
const isSearching = ref(false)
let searchTimeout = null

watch(searchQuery, (query) => {
  // 이전 타이머 취소
  if (searchTimeout) clearTimeout(searchTimeout)

  if (!query) {
    searchResults.value = []
    return
  }

  isSearching.value = true

  // 디바운스: 300ms 후에 검색
  searchTimeout = setTimeout(() => {
    // 실제로는 API 호출
    searchResults.value = [
      `${query} 관련 결과 1`,
      `${query} 관련 결과 2`,
      `${query} 관련 결과 3`,
    ]
    isSearching.value = false
    addLog(`검색 완료: "${query}"`)
  }, 300)
})
</script>

<template>
  <div>
    <h1>Watch - 감시자</h1>

    <!-- 1. 기본 watch -->
    <section>
      <h2>1. 검색어 감시</h2>
      <input v-model="searchQuery" placeholder="검색어 입력..." />
      <p v-if="isSearching">검색 중...</p>
      <ul v-else-if="searchResults.length">
        <li v-for="result in searchResults" :key="result">{{ result }}</li>
      </ul>
      <p class="note">
        입력 후 300ms 디바운스 적용 (타이핑이 멈추면 검색)
      </p>
    </section>

    <!-- 2. 카운터 (immediate) -->
    <section>
      <h2>2. 카운터 감시 (immediate)</h2>
      <p>카운트: {{ count }}</p>
      <button @click="count++">+1</button>
      <button @click="count--">-1</button>
      <pre class="code-block">
watch(count, (newValue) => {
  console.log('카운트:', newValue)
}, { immediate: true })  // 초기값도 실행
      </pre>
    </section>

    <!-- 3. 객체 감시 (deep) -->
    <section>
      <h2>3. 객체 감시 (deep)</h2>
      <div class="input-group">
        <label>
          이름: <input v-model="user.name" />
        </label>
        <label>
          나이: <input v-model.number="user.age" type="number" />
        </label>
      </div>
      <p>사용자: {{ user.name }} ({{ user.age }}세)</p>
      <pre class="code-block">
watch(user, (newValue) => {
  console.log('변경됨:', newValue)
}, { deep: true })  // 내부 속성 변화도 감시
      </pre>
    </section>

    <!-- 4. 특정 속성 감시 -->
    <section>
      <h2>4. 특정 속성만 감시</h2>
      <pre class="code-block">
// getter 함수 사용
watch(
  () => user.value.age,
  (newAge, oldAge) => {
    console.log(`나이: ${oldAge} -> ${newAge}`)
  }
)
      </pre>
    </section>

    <!-- 5. watchEffect -->
    <section>
      <h2>5. watchEffect</h2>
      <label>
        <input type="checkbox" v-model="isOnline" />
        온라인 상태: {{ isOnline ? '온라인' : '오프라인' }}
      </label>
      <pre class="code-block">
// 콜백 내 사용된 반응형 데이터 자동 추적
watchEffect(() => {
  if (!isOnline.value) {
    console.log('오프라인 상태')
  }
})
      </pre>
    </section>

    <!-- 6. watch vs watchEffect -->
    <section>
      <h2>6. watch vs watchEffect 비교</h2>
      <table>
        <thead>
        <tr>
          <th></th>
          <th>watch</th>
          <th>watchEffect</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>추적</td>
          <td>명시적으로 지정</td>
          <td>자동 추적</td>
        </tr>
        <tr>
          <td>이전 값</td>
          <td>접근 가능</td>
          <td>접근 불가</td>
        </tr>
        <tr>
          <td>초기 실행</td>
          <td>immediate 필요</td>
          <td>즉시 실행</td>
        </tr>
        <tr>
          <td>용도</td>
          <td>특정 값 변화 반응</td>
          <td>여러 값 동기화</td>
        </tr>
        </tbody>
      </table>
    </section>

    <!-- 7. 로그 -->
    <section>
      <h2>7. 실행 로그</h2>
      <div class="log-container">
        <div v-for="(log, i) in logs" :key="i" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
        <p v-if="logs.length === 0" class="no-logs">
          위의 값들을 변경해보세요.
        </p>
      </div>
    </section>

    <!-- 8. 정리 -->
    <section class="summary">
      <h2>8. 정리</h2>
      <ul>
        <li>watch: 특정 값의 변화를 감시</li>
        <li>immediate: 컴포넌트 마운트 시 즉시 실행</li>
        <li>deep: 객체 내부 속성 변화도 감시</li>
        <li>getter 함수로 특정 속성만 감시 가능</li>
        <li>watchEffect: 자동 의존성 추적</li>
        <li>부수 효과(API 호출, 로깅 등)에 사용</li>
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

input[type="text"],
input[type="number"],
input:not([type]) {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}

.code-block {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
  margin-top: 10px;
}

.note {
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.log-container {
  background: #1a1a1a;
  color: #00ff00;
  padding: 15px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  margin: 5px 0;
}

.log-time {
  color: #888;
  margin-right: 10px;
}

.no-logs {
  color: #666;
}

.summary {
  background: rgba(66, 184, 131, 0.1);
}
</style>
