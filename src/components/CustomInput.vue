<!--
  [3-4] v-model과 컴포넌트

  커스텀 컴포넌트에서 v-model을 지원하는 방법
-->

<script setup>
/**
 * v-model 동작 원리:
 *
 * <CustomInput v-model="text" />
 *
 * 위 코드는 아래와 동일합니다:
 * <CustomInput
 *   :modelValue="text"
 *   @update:modelValue="text = $event"
 * />
 *
 * 따라서 컴포넌트에서는:
 * 1. modelValue prop을 받고
 * 2. update:modelValue 이벤트를 emit하면 됩니다
 */

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="custom-input">
    <label v-if="label">{{ label }}</label>
    <input
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="handleInput"
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
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #42b883;
}
</style>
