import io from 'socket.io-client';
import store from './store';
const socket = io({
  autoConnect: false
});

socket.on('log', (log: Log) => {
  store.commit('appendLogBuffer', log);
});

socket.on('roomName', (roomName: string) => {
  store.commit('updateRoomName', roomName);
});

socket.on('gameType', (gameType: string) => {
  store.commit('updateGameType', gameType);
});

socket.on('addShortcut', (shortcut: string) => {
  store.commit('addShortcut', shortcut);
});

socket.on('removeShortcut', (shortcut: string) => {
  store.commit('removeShortcut', shortcut);
});

socket.on('disconnect', () => {
  store.commit('disconnected');
});

socket.on('reconnect', () => {
  store.commit('connected');
  store.dispatch('joinRoom', store.state.roomId);
});

export default socket;
