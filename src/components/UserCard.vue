<!--
  [3-3] Emits

  자식 컴포넌트에서 부모 컴포넌트로 이벤트를 전달합니다.
  props는 부모 -> 자식, emit은 자식 -> 부모
-->

<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: '이메일 없음'
  },
  role: {
    type: String,
    default: 'User'
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

/**
 * defineEmits: 이벤트 정의
 *
 * 배열 방식:
 * const emit = defineEmits(['delete', 'toggle-active', 'update'])
 *
 * 객체 방식 (유효성 검사 포함):
 * const emit = defineEmits({
 *   'delete': (id) => typeof id === 'number',
 *   'toggle-active': null  // 검사 없음
 * })
 */
const emit = defineEmits(['delete', 'toggle-active', 'edit'])

const isExpanded = ref(false)

// 삭제 버튼 클릭 시 부모에게 이벤트 전달
function handleDelete() {
  // emit('이벤트명', 페이로드)
  emit('delete', props.name)
}

// 활성/비활성 토글
function handleToggleActive() {
  emit('toggle-active', props.name)
}

// 편집 버튼 클릭
function handleEdit() {
  emit('edit', {
    name: props.name,
    email: props.email,
    role: props.role
  })
}
</script>

<template>
  <div class="user-card" :class="{ inactive: !active }">
    <div class="user-header">
      <div class="avatar" :class="{ 'avatar-inactive': !active }">
        {{ name.charAt(0) }}
      </div>
      <div class="user-info">
        <h3>{{ name }}</h3>
        <p>{{ role }}</p>
        <span v-if="!active" class="status-badge">비활성</span>
      </div>
    </div>

    <!-- 액션 버튼들 -->
    <div class="action-buttons">
      <button @click="handleToggleActive" class="btn btn-toggle">
        {{ active ? '비활성화' : '활성화' }}
      </button>
      <button @click="handleEdit" class="btn btn-edit">
        편집
      </button>
      <button @click="handleDelete" class="btn btn-delete">
        삭제
      </button>
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

.action-buttons {
  display: flex;
  gap: 5px;
  margin-top: 15px;
}

.btn {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-toggle {
  border-color: #17a2b8;
  color: #17a2b8;
  background: white;
}

.btn-toggle:hover {
  background: #17a2b8;
  color: white;
}

.btn-edit {
  border-color: #ffc107;
  color: #856404;
  background: white;
}

.btn-edit:hover {
  background: #ffc107;
}

.btn-delete {
  border-color: #dc3545;
  color: #dc3545;
  background: white;
}

.btn-delete:hover {
  background: #dc3545;
  color: white;
}

.toggle-btn {
  margin-top: 10px;
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
