<!--
  [3-4] v-model과 컴포넌트

  커스텀 컴포넌트에서 v-model 지원하기
-->

<script setup>
import { ref } from 'vue'
import CustomInput from './components/CustomInput.vue'
import CustomInputV2 from './components/CustomInputV2.vue'

const name = ref('')
const email = ref('')
const message = ref('')
</script>

<template>
  <div>
    <h1>v-model과 컴포넌트</h1>

    <!-- 1. v-model 동작 원리 -->
    <section>
      <h2>1. v-model 동작 원리</h2>
      <p>v-model은 props와 emit의 조합입니다:</p>
      <pre class="code-block">
&lt;!-- 이 코드는 --&gt;
&lt;CustomInput v-model="name" /&gt;

&lt;!-- 아래와 동일합니다 --&gt;
&lt;CustomInput
  :modelValue="name"
  @update:modelValue="name = $event"
/&gt;
      </pre>
    </section>

    <!-- 2. 방법 1: props + emit -->
    <section>
      <h2>2. 방법 1: defineProps + defineEmits</h2>
      <pre class="code-block">
// 자식 컴포넌트
const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
      </pre>

      <CustomInput
          v-model="name"
          label="이름"
          placeholder="이름을 입력하세요"
      />
      <p>입력된 이름: {{ name }}</p>
    </section>

    <!-- 3. 방법 2: defineModel (Vue 3.4+) -->
    <section>
      <h2>3. 방법 2: defineModel (Vue 3.4+, 권장)</h2>
      <pre class="code-block">
// 자식 컴포넌트 - 훨씬 간단!
const model = defineModel()

// template에서
&lt;input v-model="model" /&gt;
      </pre>

      <CustomInputV2
          v-model="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
      />
      <p>입력된 이메일: {{ email }}</p>
    </section>

    <!-- 4. 여러 v-model 사용 -->
    <section>
      <h2>4. 여러 v-model (Named v-model)</h2>
      <pre class="code-block">
&lt;!-- 부모 컴포넌트 --&gt;
&lt;UserForm
  v-model:firstName="first"
  v-model:lastName="last"
/&gt;

&lt;!-- 자식 컴포넌트 --&gt;
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
      </pre>
    </section>

    <!-- 5. v-model 수정자 -->
    <section>
      <h2>5. v-model 수정자 (Modifiers)</h2>
      <pre class="code-block">
&lt;!-- 내장 수정자 --&gt;
&lt;input v-model.trim="text" /&gt;      &lt;!-- 앞뒤 공백 제거 --&gt;
&lt;input v-model.number="age" /&gt;     &lt;!-- 숫자로 변환 --&gt;
&lt;input v-model.lazy="text" /&gt;      &lt;!-- change 이벤트에서 동기화 --&gt;

&lt;!-- 커스텀 수정자 --&gt;
&lt;CustomInput v-model.capitalize="text" /&gt;
      </pre>
    </section>

    <!-- 6. 실습 -->
    <section>
      <h2>6. 실시간 미리보기</h2>
      <CustomInput
          v-model="message"
          label="메시지"
          placeholder="메시지를 입력하세요"
      />
      <div class="preview">
        <h3>미리보기:</h3>
        <p v-if="message">{{ message }}</p>
        <p v-else class="placeholder">메시지를 입력하면 여기에 표시됩니다.</p>
      </div>
    </section>

    <!-- 7. 요약 -->
    <section class="summary">
      <h2>7. 정리</h2>
      <ul>
        <li>v-model = :modelValue + @update:modelValue</li>
        <li>방법 1: defineProps + defineEmits (모든 Vue 3 버전)</li>
        <li>방법 2: defineModel (Vue 3.4+, 더 간단)</li>
        <li>여러 v-model: v-model:propName</li>
        <li>수정자: v-model.trim, v-model.number 등</li>
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

.code-block {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.preview {
  margin-top: 15px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  border-left: 4px solid #42b883;
}

.preview h3 {
  margin: 0 0 10px;
  color: #333;
}

.preview .placeholder {
  color: #999;
  font-style: italic;
}

.summary {
  background: rgba(66, 184, 131, 0.1);
}

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}

p {
  margin: 10px 0;
}
</style>
