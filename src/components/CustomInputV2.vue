<!--
  [3-4] v-model과 컴포넌트 - defineModel 사용 (Vue 3.4+)

  Vue 3.4부터 defineModel을 사용하면 더 간단하게 v-model을 구현할 수 있습니다.
-->

<script setup>
/**
 * defineModel (Vue 3.4+)
 *
 * defineProps + defineEmits를 한 번에 처리합니다.
 * modelValue prop과 update:modelValue emit이 자동으로 설정됩니다.
 */

// 기본 사용법
const model = defineModel()

// 옵션과 함께 사용
// const model = defineModel({ type: String, default: '' })

defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="custom-input">
    <label v-if="label">{{ label }}</label>
    <!--
      defineModel로 만든 model은 ref처럼 동작합니다.
      v-model로 직접 바인딩하면 양방향 바인딩이 자동으로 됩니다.
    -->
    <input
        type="text"
        v-model="model"
        :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>
.custom-input {
  margin: 10px 0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #35495e;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #35495e;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #42b883;
}
</style>
