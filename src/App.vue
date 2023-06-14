<script>
import { fieldFactory, randomizeField, copyField } from "./gameLogic/Field.js";
import { Load } from "./requests/Load.js";
import { Save } from "./requests/Save.js";
import GameField from "./components/GameField.vue";
import Login from "./components/Login.vue";

export default {
  components: { GameField, Login },
  data() {
    return {
      field: [],
      running: false,
      started: false,
      
      time: 0,
      interval: null,

      login: "",
      password: "",
      validLogin: null,
      validPassword: null,
    };
  },
  methods: {
    startGame() {
      this.time = 0;
      clearInterval(this.interval);
      randomizeField(this.field);
      this.started = true;
      this.running = true;
      this.interval = setInterval(this.incrementTimer, 10);
    },
    pauseHandler() {
      if (this.running) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.incrementTimer, 10);
      }
      this.running = !this.running;
    },
    incrementTimer() {
      this.time++;
    },

    onSubmit(event) {
      if (event.submitter.__vnode.children === "Load")
        this.handleLoad();
      if (event.submitter.__vnode.children === "Save")
        this.handleSave();
    },

    async handleLoad() {
      if (this.running)
        this.pauseHandler();
      const res = await Load(this.login, this.password)
      if (res === undefined) {
        alert("non-existed save");
        return;
      }

      this.time = res.time;
      copyField(this.field, res.field)
      this.field.slidesNumber = res.slides;
      
      if (!this.running) {
        this.started = true;
        this.pauseHandler();
      }
    },
    handleSave() {
      if (this.running)
        this.pauseHandler();
      Save(this.login, this.password, this.time, this.field);
    },
    handleWin() {
      alert("You Win");
      this.started = false;
      this.running = false;

      clearInterval(this.interval);
    },
    formatTime() {
        if (this.time / 100 >= 60) 
          return Math.floor(this.time / 6000) + ":" + this.time % 6000 / 100;
        return this.time / 100 % 60;
    }
  },
  mounted() {
    this.field = fieldFactory(4);
  },
};
</script>


<template>
  <header>
    <div>
      Puzzle 15
    </div> 
  </header>
  <main class="main">
    <div class="login-data">
      <form @submit.prevent="onSubmit">
        <input v-model="login" placeholder="Login.." required/>
        <input v-model="password" type="password" placeholder="Password.." required/>
        <div class="menu">
          <button v-if="started" class="btn">Save</button>
          <button class="btn">Load</button>
        </div>
      </form>
    </div>
    <div class="game-data">
      <span>Time: {{ formatTime() }}</span>
      <span>Slides: {{ field.slidesNumber }}</span>
    </div>
    <div class="game">
      <GameField @win="handleWin" :field="field" :running="running" />
      <div class="menu">
        <button @click="startGame" class="btn">New Game</button>
        <button v-if="started" @click="pauseHandler" class="btn">
          <span v-if="running">Pause</span>
          <span v-else>Resume</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style>
header {
  padding-top: 20px;
  font-size: 36px;
  text-align: center;
}
main {
  background-color: #F8F8FF;
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-data {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
input {
  width: 100%;
  margin: 5px;
  font-size: 20px;
}
.game-data {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 80vw;
}
.menu {
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.btn {
  border: 0.1rem solid;
  border-radius: 4px;
  transition: 0.4s ease;
  flex-basis: 40%;
  height: 40px;
  font-size: 1.2rem;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
    transition: 0.4s ease;
  }
}
</style>