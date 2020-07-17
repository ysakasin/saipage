<template>
  <v-card v-show="showTips">
    <v-card-title>
      <h3 class="headline">Tips</h3>
    </v-card-title>
    <v-card-text>
      <p>
        <strong>Saipage</strong
        >では<strong>「どどんとふのダイス」</strong>こと<strong>「BCDice」</strong>をブラウザから手軽に振ることができます。
        「手軽にダイスを降る」に特化したため、このアプリケーションには<strong>「ルーム」がありません</strong>。
        設定やダイスロールのログは全てブラウザに保存されます。
      </p>
      <p>
        設定は右上にある
        <strong>歯車のアイコン<v-icon small>settings</v-icon></strong>
        からできます。
      </p>
      <p>
        よく使うコマンドをワンタッチで実行できるように<strong>「ショートカット機能」</strong>を用意しました。
        コマンド入力欄の下にある
        <strong>追加ボタン<v-icon small>add</v-icon></strong>
        から好みに合わせてカスタマイズしてみてください。
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Tool extends Vue {
  get showTips() {
    return this.$store.state.settings.showTips;
  }
}
</script>

<style lang="scss" scoped>
p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
