<!--
  컴포넌트 분리

  UserCard.vue - 재사용 가능한 사용자 카드 컴포넌트

  컴포넌트를 분리하는 이유:
  1. 재사용성: 같은 UI를 여러 곳에서 사용
  2. 유지보수성: 관련 코드를 한 곳에서 관리
  3. 가독성: 복잡한 UI를 작은 단위로 분리
-->

<script setup>
/**
 * 현재는 하드코딩된 데이터를 사용합니다.
 * 다음 커밋에서 props를 통해 데이터를 받도록 개선합니다.
 */
import { ref } from 'vue'

const user = ref({
  name: 'Vue 학습자',
  email: 'vue@example.com',
  role: 'Developer'
})

const isExpanded = ref(false)
</script>

<template>
  <div class="user-card">
    <div class="user-header">
      <div class="avatar">{{ user.name.charAt(0) }}</div>
      <div class="user-info">
        <h3>{{ user.name }}</h3>
        <p>{{ user.role }}</p>
      </div>
    </div>

    <button @click="isExpanded = !isExpanded" class="toggle-btn">
      {{ isExpanded ? '접기' : '상세보기' }}
    </button>

    <div v-show="isExpanded" class="user-details">
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  max-width: 300px;
  background: white;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}

.user-info h3 {
  margin: 0;
  color: #333;
}

.user-info p {
  margin: 5px 0 0;
  color: #666;
  font-size: 14px;
}

.toggle-btn {
  margin-top: 15px;
  width: 100%;
  padding: 8px;
  border: 1px solid #42b883;
  background: white;
  color: #42b883;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn:hover {
  background: #42b883;
  color: white;
}

.user-details {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.user-details p {
  margin: 5px 0;
  color: #666;
}
</style>
