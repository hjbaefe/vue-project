<script setup>
import {ref} from "vue";

const selectedTheme = ref('light');
const fontSize = ref(16);
const isHighlighted = ref(false);
const selectedColor = ref('blue');

const themes = ['light', 'dark', 'colorful'];
const colors = ['blue', 'green', 'red', 'purple']
</script>

<template>
  <div :class="['app', `theme-${selectedTheme}`]">
    <h1>Vue 스타일링</h1>

    <!-- 1. scoped vs 전역 스타일 -->
    <section>
      <h2>1. scoped vs 전역 스타일</h2>
      <ul>
        <li>scoped: 현재 컴포넌트에만 적용 (권장)</li>
        <li>전역: 모든 컴포넌트에 적용</li>
        <li>scoped는 data-v-xxxxx 속성으로 스타일 격리</li>
      </ul>
      <p class="scoped-example">이 텍스트는 scoped 스타일 적용</p>
    </section>

    <!-- 2. 동적 클래스 바인딩 -->
    <section>
      <h2>2. 동적 클래스 바인딩</h2>

      <!-- 객체 문법 -->
      <p>
        <button @click="isHighlighted = !isHighlighted">
          하이라이트 토글
        </button>
      </p>
      <p :class="{ highlighted: isHighlighted, bold: true }">
        객체 문법: :class="{ className: condition }"
      </p>

      <!-- 배열 문법 -->
      <p :class="['base-class', selectedColor]">
        배열 문법: :class="['class1', variableClass]"
      </p>
      <p>
        <select v-model="selectedColor">
          <option v-for="color in colors" :key="color" :value="color">
            {{ color }}
          </option>
        </select>
      </p>
    </section>

    <!-- 3. 동적 스타일 바인딩 -->
    <section>
      <h2>3. 동적 스타일 바인딩</h2>

      <p>
        <label>
          폰트 크기: {{ fontSize }}px
          <input type="range" v-model="fontSize" min="12" max="24" />
        </label>
      </p>

      <!-- 객체 문법 -->
      <p :style="{ fontSize: fontSize + 'px', color: selectedColor }">
        :style 객체 문법으로 인라인 스타일 적용
      </p>

      <!-- 여러 스타일 객체 바인딩 -->
      <p :style="[{ fontWeight: 'bold' }, { fontStyle: 'italic' }]">
        배열로 여러 스타일 객체 결합
      </p>
    </section>

    <!-- 4. 테마 변경 예제 -->
    <section>
      <h2>4. 테마 변경 예제</h2>
      <p>
        <select v-model="selectedTheme">
          <option v-for="theme in themes" :key="theme" :value="theme">
            {{ theme }}
          </option>
        </select>
      </p>
      <p>현재 테마: {{ selectedTheme }}</p>
    </section>

    <!-- 정리 -->
    <section class="summary">
      <h2>정리</h2>
      <ul>
        <li>scoped: 컴포넌트 스타일 격리</li>
        <li>:class - 객체: { className: boolean }</li>
        <li>:class - 배열: ['class1', variable]</li>
        <li>:style - 객체: { property: value }</li>
        <li>CSS 변수와 함께 사용하면 더 강력</li>
      </ul>
    </section>
  </div>
</template>

<!--
  scoped 스타일: 이 컴포넌트에만 적용됩니다.
  Vue가 자동으로 [data-v-xxxxx] 속성 선택자를 추가합니다.
-->
<style scoped>
.app {
  padding: 20px;
  transition: all 0.3s ease;
}

/* 테마 스타일 */
.theme-light {
  background: #fff;
  color: #333;
}

.theme-dark {
  background: #1a1a1a;
  color: #fff;
}

.theme-colorful {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

h2 {
  color: #42b883;
  margin-bottom: 10px;
}

/* 동적 클래스 예제 */
.highlighted {
  background: yellow;
  padding: 5px;
}

.bold {
  font-weight: bold;
}

/* 색상 클래스들 */
.blue { color: blue; }
.green { color: green; }
.red { color: red; }
.purple { color: purple; }

.base-class {
  padding: 10px;
  border: 2px solid currentColor;
  border-radius: 4px;
}

/* 기타 스타일 */
button, select {
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

input[type="range"] {
  margin-left: 10px;
}

.scoped-example {
  color: #42b883;
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
</style>