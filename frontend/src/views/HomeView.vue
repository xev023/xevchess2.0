<script setup>
import { ref } from 'vue';
import { copyToClipboard } from '@/commons.js'
import { useSocketIO } from '../sockets'
import { useRouter } from 'vue-router';
const router = useRouter();
const { socket } = useSocketIO()
const timeOptions = ref(false);
const playerOptions = ref(false);
const timeValue = ref( 0 );
const playerValue = ref( 0 );
function setGameTime (val) {
  timeValue.value = val;
  timeOptions.value = false;
}
function setPlayerColour (val) { 
  playerValue.value = val;
  playerOptions.value = false;
}
socket.on('gameStarts',()=>{
    router.push({path:`/game-room/${socket.id}`});
});
</script>

<template>
  <main>
    <h1>Play chess with your friends!</h1>
    <div>
      <button v-if="!timeOptions" @click="()=>timeOptions = !timeOptions">Choose game time</button>
      <ul v-else>
        <li @click="setGameTime(3)">3</li>
        <li @click="setGameTime(5)">5</li>
        <li @click="setGameTime(10)">10</li>
        <li @click="setGameTime(15)">15</li>
        <li @click="setGameTime(30)">30</li>
      </ul>
      <button v-if="!playerOptions" @click="()=>playerOptions = !playerOptions">Choose your colour</button>
      <ul v-if="playerOptions">
        <li @click="setPlayerColour(0)"><img alt="white king" src="@/assets/white_king.png"></li>
        <li @click="setPlayerColour(1)"><img alt="black king" src="@/assets/black_king.png"></li>
      </ul>
      <span>
        <input :placeholder="`localhost:5173/game-room/${socket.id}`" disabled>
        <p @click="copyToClipboard(`localhost:5173/game-room/${socket.id}`)">
          <i class="fa-solid fa-copy"></i>
        </p>
      </span>
    </div>
  </main>
</template>

<style scoped>
  main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10rem;
    align-items: center;
  } 
  div{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 15rem;
    width: 20rem;
    border-radius: 5px;
    background-color: #222;
    padding: 1rem;
  }
  h1{
    text-align: center;
    font-size: 3rem;    
  }
  button{
    border: 0;
    border-radius: 3px;
    width: 8rem;
    height: 2rem;
    cursor: pointer;
  }
  ul{
    display: flex;
    justify-content: space-around;
    list-style: none;
    gap: 1rem;
  }
  li{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: aqua;
    cursor: pointer;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img{
    width: 100%;
    height: 100%;
  }
  input{
    height: 2rem;
    border: 0;
    border-radius: 5px;
    color: black;
    padding-left: 3px;
  }
  span{
    display: flex;
    gap: 1rem;
  }
  p{
    background-color: white;
    color: black;
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
    border-radius: 50%;
  }
</style>