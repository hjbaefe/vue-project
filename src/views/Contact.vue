<!--
  Contact.vue - 연락처 페이지
-->

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

function handleSubmit() {
  alert(`전송됨:\n${JSON.stringify(formData.value, null, 2)}`)
}
</script>

<template>
  <div class="contact">
    <h1>연락처 페이지</h1>
    <p>이 페이지는 /contact 경로에서 렌더링됩니다.</p>

    <section>
      <h2>연락하기</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>이름</label>
          <input v-model="formData.name" required />
        </div>
        <div class="form-group">
          <label>이메일</label>
          <input v-model="formData.email" type="email" required />
        </div>
        <div class="form-group">
          <label>메시지</label>
          <textarea v-model="formData.message" rows="4" required></textarea>
        </div>
        <button type="submit">전송</button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.contact {
  padding: 20px;
}

h1 {
  color: #42b883;
  margin-bottom: 10px;
}

section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 500px;
}

h2 {
  color: #35495e;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #42b883;
}

button {
  width: 100%;
  padding: 12px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}
</style>
