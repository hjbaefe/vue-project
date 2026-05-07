<!--
  [3-2] Props

  부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달합니다.
  Props는 단방향 데이터 흐름을 따릅니다 (부모 -> 자식).
-->

<script setup>
import { ref } from 'vue'

/**
 * defineProps: props 정의
 *
 * 타입만 지정하는 방식:
 * const props = defineProps(['name', 'email', 'role'])
 *
 * 타입과 옵션을 지정하는 방식 (권장):
 */
const props = defineProps({
  // 필수 prop (required: true)
  name: {
    type: String,
    required: true
  },
  // 선택적 prop + 기본값
  email: {
    type: String,
    default: '이메일 없음'
  },
  role: {
    type: String,
    default: 'User'
  },
  // 숫자 타입
  age: {
    type: Number,
    default: 0
  },
  // 불리언 타입
  active: {
    type: Boolean,
    default: true
  }
})

const isExpanded = ref(false)
</script>

<template>
  <div class="user-card" :class="{ inactive: !active }">
    <div class="user-header">
      <!-- props는 template에서 직접 사용 가능 -->
      <div class="avatar" :class="{ 'avatar-inactive': !active }">
        {{ name.charAt(0) }}
      </div>
      <div class="user-info">
        <h3>{{ name }}</h3>
        <p>{{ role }}</p>
        <span v-if="!active" class="status-badge">비활성</span>
      </div>
    </div>

    <button @click="isExpanded = !isExpanded" class="toggle-btn">
      {{ isExpanded ? '접기' : '상세보기' }}
    </button>

    <div v-show="isExpanded" class="user-details">
      <p>Email: {{ email }}</p>
      <p v-if="age > 0">Age: {{ age }}</p>
      <p>Status: {{ active ? '활성' : '비활성' }}</p>
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
  transition: opacity 0.3s;
}

.user-card.inactive {
  opacity: 0.7;
  background: #f9f9f9;
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

.avatar-inactive {
  background: #999;
}

.user-info {
  position: relative;
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

.status-badge {
  display: inline-block;
  margin-top: 5px;
  padding: 2px 8px;
  background: #ffc107;
  color: #333;
  font-size: 12px;
  border-radius: 10px;
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
