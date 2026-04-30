<!--
<script>
// options api
export default {
  name: 'App', //
  data(){
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {
  },
  unmounted() {
  },

}
</script>
-->

<script setup>
import {ref} from "vue";

const count = ref(0);
const message = ref('안녕하세요');
const isVisible = ref(true);
let normalCount = 0;
const reactiveCount = ref(0);

function incrementNormal(){
  normalCount++;
  console.log('normalCount' , normalCount)
}
function incrementReactive(){
  reactiveCount.value++;
  console.log('reactiveCount', reactiveCount.value)
}
function increment(){
  count.value++;
  console.log('현재 count: ' , count.value)
}
function decrement(){
  count.value--;
}
function changeMessage(){
  message.value = '메시지가 변경되었습니다'
}
function toggleVisibility(){
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div>
    <h1>반응형 데이터 - ref</h1>

    <!-- let vs ref 비교 (핵심!) -->
    <section class="highlight">
      <h2>let vs ref 비교</h2>
      <div class="comparison">
        <div class="box">
          <h3>일반 변수 (let)</h3>
          <p>normalCount: {{ normalCount }}</p>
          <button @click="incrementNormal">+1 (반응 없음)</button>
          <p class="note">버튼을 눌러도 화면이 안 바뀜!</p>
          <p class="note">콘솔을 확인해보세요.</p>
        </div>
        <div class="box">
          <h3>반응형 변수 (ref)</h3>
          <p>reactiveCount: {{ reactiveCount }}</p>
          <button @click="incrementReactive">+1 (반응함)</button>
          <p class="note">버튼을 누르면 화면이 바뀜!</p>
          <p class="note">그리고 normalCount도 갱신됨!</p>
        </div>
      </div>
      <p class="explanation">
        ref 버튼을 누르면 리렌더링이 발생해서,
        그때 normalCount의 현재 값도 화면에 반영됩니다.
      </p>
    </section>

    <!-- Vue vs React 비교 -->
    <section class="vs-react">
      <h2>Vue vs React 리렌더링 차이</h2>

      <div class="comparison">
        <div class="box vue-box">
          <h3>Vue</h3>
          <pre class="code">
// script setup은 한 번만 실행됨
let count = 0      // 유지됨!
const ref = ref(0) // 반응형

// 리렌더링 시에도 count는 리셋 안됨
// (단지 화면에 반영이 안 될 뿐)</pre>
          <p class="analogy">
            <strong>비유:</strong> 무대 위의 배우들<br/>
            배우(변수)들은 계속 무대에 있고,<br/>
            ref 표시가 붙은 배우만 카메라가 추적함
          </p>
        </div>

        <div class="box react-box">
          <h3>React</h3>
          <pre class="code">
function Component() {
  let count = 0      // 매번 0으로 리셋!
  const [state] = useState(0) // 유지됨

  // 리렌더링 = 함수 전체 다시 호출
  return &lt;div&gt;...&lt;/div&gt;
}</pre>
          <p class="analogy">
            <strong>비유:</strong> 영화 다시 틀기<br/>
            리렌더링할 때마다 영화를 처음부터 재생<br/>
            useState만 "어디까지 봤는지" 기억함
          </p>
        </div>
      </div>

      <div class="key-difference">
        <h3>핵심 차이</h3>
        <ul>
          <li><strong>React:</strong> 리렌더링 = 함수 다시 호출 → let 변수 리셋됨</li>
          <li><strong>Vue:</strong> 리렌더링 = 템플릿만 다시 그림 → let 변수 유지됨</li>
        </ul>
      </div>
    </section>

    <!-- 카운터 예제 -->
    <section>
      <h2>카운터</h2>
      <!-- template에서는 .value 없이 바로 사용 -->
      <p>현재 값: {{ count }}</p>
      <button @click="decrement">-1</button>
      <button @click="increment">+1</button>
    </section>

    <!-- 메시지 예제 -->
    <section>
      <h2>메시지</h2>
      <p>{{ message }}</p>
      <button @click="changeMessage">메시지 변경</button>
    </section>

    <!-- 토글 예제 -->
    <section>
      <h2>토글</h2>
      <p>isVisible: {{ isVisible }}</p>
      <button @click="toggleVisibility">토글</button>
    </section>

    <!-- 정리 -->
    <section class="summary">
      <h2>정리</h2>
      <ul>
        <li>ref()로 반응형 변수 생성</li>
        <li>script 내부: .value로 접근/수정</li>
        <li>template 내부: .value 없이 직접 사용</li>
        <li>값이 변경되면 화면이 자동 업데이트</li>
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

button {
  margin: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #42b883;
  background: white;
  border-radius: 4px;
}

button:hover {
  background: #42b883;
  color: white;
}

.summary {
  background: #f8f9fa;
}

.highlight {
  background: #fff8e6;
  border-color: #ffc107;
}

.comparison {
  display: flex;
  gap: 20px;
}

.box {
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.box h3 {
  margin: 0 0 10px;
  font-size: 16px;
}

.note {
  font-size: 13px;
  color: #666;
  margin: 5px 0;
}

.explanation {
  margin-top: 15px;
  padding: 10px;
  background: #fff3cd;
  border-radius: 4px;
  font-size: 14px;
}

.vs-react {
  background: #f0f4ff;
  border-color: #667eea;
}

.vue-box {
  border-color: #42b883;
  background: #f0fff4;
}

.react-box {
  border-color: #61dafb;
  background: #f0faff;
}

.code {
  background: #1a1a1a;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  margin: 10px 0;
}

.analogy {
  font-size: 13px;
  padding: 10px;
  background: rgba(255,255,255,0.7);
  border-radius: 4px;
  line-height: 1.6;
}

.key-difference {
  margin-top: 15px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.key-difference h3 {
  margin: 0 0 10px;
  color: #667eea;
}

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>