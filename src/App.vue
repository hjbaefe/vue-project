<script setup>
import {ref} from "vue";

const inputValue = ref('');
const linkUrl = ref('https//vuejs.org');
const isActive = ref(false);
const buttonText = ref('클릭하세요');
const counter = ref(0);

</script>

<template>
  <div>

    <h1>템플릿 문법 기초</h1>

    <section>
      <h2>1. 이중 중괄호 {{ }}</h2>
      <p>javascript 표현식을 텍스트로 출력합니다.</p>
      <ul>
        <li>카운터: {{ counter }}</li>
        <li>연산: {{ counter + 10 }}</li>
        <li>메서드 호출: {{ buttonText.toUpperCase() }}</li>
        <li>삼항 연산자: {{ counter > 5 ? '5보다 큼' : '5 이하' }}</li>
      </ul>
    </section>

    <section>
      <h2>2. v-bind (축약: :)</h2>
      <p>HTML 속성에 javascript 값을 바인딩 합니다.</p>
      <p>
        <a v-bind:href="linkURL" target="_blank">v-bind:href 사용</a>
      </p>
      <p>
        <button :disabled="counter >= 10">
          {{ counter >= 10 ? '최대값 도달' : '클릭 가능' }}
        </button>
      </p>
    </section>

    <section>
      <h2>3. v-on (축약 : @)</h2>
      <p>DOM 이벤트를 javascript 함수에 연결합니다.</p>
      <p>
        <button v-on:click="counter++">v-on:click {{ counter }}</button>
      </p>
      <p>
        <button @click="counter++">@click 축약형 (권장)</button>
      </p>
      <p>
        <button @click="counter = 0">리셋</button>
      </p>
      <p>
        <input
            type="text"
            :value="inputValue"
            @input="inputValue = $event.target.value"
            placeholder="입력하세요"
        >
        <span>
          입력값 : {{ inputValue }}
        </span>
      </p>
    </section>

    <section>
      <h2>4. v-model (양방향 바인딩)</h2>
      <p>v-bind + v-on 을 합친 편의 문법입니다</p>
      <p>
        <input v-model="inputValue" placeholder="v-model 사용">
        <span>입력값 : {{ inputValue }}</span>
      </p>
    </section>
    <section>
      <h2>5. 클래스와 스타일 바인딩</h2>
      <p><button @click="isActive = !isActive">
        토글 (현재 : {{ isActive }})
      </button></p>
      <p :class="{active : isActive, highlight: counter > 5}">
        클래스 바인딩 예시 (active : {{ isActive }}
      </p>
      <p :style="{ color: isActive ? 'green' : 'red', fontWeight: 'bold'}">
       스타일 바인딩 예시
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

button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #42b883;
  background: white;
  border-radius: 4px;
}

button:hover:not(:disabled) {
  background: #42b883;
  color: white;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

a {
  color: #42b883;
}

.active {
  background: #42b883;
  color: white;
  padding: 10px;
  border-radius: 4px;
}

.highlight {
  border: 2px solid orange;
}

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>