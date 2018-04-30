<template>
  <v-card>
    <v-list>
      <template v-for="(item, i) in logs">
        <v-list-tile :key="i">
          <v-list-tile-content class="log">
            <v-list-tile-sub-title>{{ item.userName }}</v-list-tile-sub-title>
            <v-list-tile-title>{{ item.body }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import store from './store';

@Component
export default class Log extends Vue {
  get logs() {
    return this.$store.state.logs;
  }
}
</script>

<style lang="scss" scoped>
.log {
  user-select: text;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
