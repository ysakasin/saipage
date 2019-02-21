<template>
  <v-card class="log-area">
    <v-card-text
      v-if="logs.length == 0"
      class="log">
      <div class="meta">
        ダイスログはまだありません
      </div>
    </v-card-text>
    <template v-for="(item, i) in logs">
      <v-card-text
        :key="i"
        class="log">
        <div class="meta">
          <span>{{ item.gameType }}</span><span class="timestamp">{{ format(item.timestamp) }}</span>
        </div>
        <div class="subheading">{{ item.command }} {{ item.body }}</div>
      </v-card-text>
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "./store";

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
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日 ${h}:${m}`;
    } else {
      return `${h}:${m}`;
    }
  }

  zeroPadding(x: number): string {
    return ("0" + x).slice(-2);
  }
}
</script>

<style lang="scss" scoped>
.log-area {
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}

.log {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  .meta {
    line-height: 1.4;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
  }
  .timestamp::before {
    content: "・";
  }
  .subheading {
    word-wrap: break-word;
    line-height: 1.2;
  }
}
</style>
