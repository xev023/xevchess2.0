<script setup>
import { useRoute } from 'vue-router';
import { useSocketIO } from '../sockets';
import { onMounted } from 'vue';
const { socket } = useSocketIO();
const route = useRoute();
onMounted(()=>{
    socket.emit('joinRoom',route.params.roomKey);
});
</script>

<template>
    <p>GAME STARTS</p>
</template>