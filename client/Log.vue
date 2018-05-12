<template>
  <v-card>
    <v-list>
      <template v-for="(item, i) in logs">
        <v-list-tile :key="i">
          <v-list-tile-content class="log">
            <v-list-tile-sub-title>
              <span>{{ item.userName }}</span><span class="timestamp">{{ format(item.timestamp) }}</span>
            </v-list-tile-sub-title>
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

const aDay = 1000 * 60 * 60 * 24;
const baseTime = Date.now();

@Component
export default class Log extends Vue {
  get logs() {
    return this.$store.state.logs;
  }

  format(dateOrg: any): string {
    const date = new Date(dateOrg);
    const diff = baseTime - date.getTime();
    const h = this.zeroPadding(date.getHours());
    const m = this.zeroPadding(date.getMinutes());
    if (diff >= aDay) {
      const month = date.getMonth();
      const day = date.getDate();
      return `${month}月${day}日 ${h}:${m}`;
    } else {
      return `${h}:${m}`;
    }
  }

  zeroPadding(x: number): string {
    return ('0' + x).slice(-2);
  }
}
</script>

<style lang="scss" scoped>
.log {
  user-select: text;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  .timestamp::before {
    content: "・";
  }
}
</style>
