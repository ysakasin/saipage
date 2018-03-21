<template>
  <v-card>
    <v-text-field
      label="コマンドを入力..."
      v-model="name"
      single-line
      hide-details
      full-width
      v-on:focus="help = true"
      v-on:blur="help = false"
    ></v-text-field>
    <v-divider />
    <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave">
    <div v-show="help">
    <v-card-text>
    <div>{{ system }}</div>
    <div class="sysinfo">{{ systeminfo }}</div>
    </v-card-text>
    <v-divider />
    </div>
    </transition>
    <v-btn v-for="(command, i) in commands" :key="i" depressed>{{ command }}</v-btn>
    <v-btn icon>
      <v-icon>add</v-icon>
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Tool extends Vue{
  data () {
    return {
      name: '',
      help: false,
      system: 'クトゥルフ神話TRPG',
      systeminfo: `【ダイスボット】チャットにダイス用の文字を入力するとダイスロールが可能
入力例）２ｄ６＋１　攻撃！
出力例）2d6+1　攻撃！
　　　　  diceBot: (2d6) → 7
上記のようにダイス文字の後ろに空白を入れて発言する事も可能。
以下、使用例
　3D6+1>=9 ：3d6+1で目標値9以上かの判定
　1D100<=50 ：D100で50％目標の下方ロールの例
　3U6[5] ：3d6のダイス目が5以上の場合に振り足しして合計する(上方無限)
　3B6 ：3d6のダイス目をバラバラのまま出力する（合計しない）
　10B6>=4 ：10d6を振り4以上のダイス目の個数を数える
　(8/2)D(4+6)<=(5*3)：個数・ダイス・達成値には四則演算も使用可能
　C(10-4*3/2+2)：C(計算式）で計算だけの実行も可能
　choice[a,b,c]：列挙した要素から一つを選択表示。ランダム攻撃対象決定などに
　S3d6 ： 各コマンドの先頭に「S」を付けると他人結果の見えないシークレットロール
　3d6/2 ： ダイス出目を割り算（切り捨て）。切り上げは /2U、四捨五入は /2R。
　D66 ： D66ダイス。順序はゲームに依存。D66N：そのまま、D66S：昇順。`,
      commands: [
        "1D100",
        "1D6",
        "1D20",
        "1D100<=?",
      ]
    }
  }
  beforeEnter(el) {
      // アコーディオンを閉じた状態にする
      el.style.height = '0'
    }

    enter(el) {
      // アコーディオンのコンテンツの高さを指定して開く
      el.style.height = el.scrollHeight + 'px'
    }

    beforeLeave(el) {
      // アコーディオンを閉じた状態にする
      el.style.height = el.scrollHeight + 'px'
    }

    leave(el) {
      // アコーディオンのコンテンツの高さを指定して開く
      el.style.height = '0'
    }
}
</script>

<style lang="scss" scoped>
.v-enter-active, .v-leave-active {
  transition: all .25s;
  overflow: hidden;
}
.sysinfo {
  white-space: pre;
}
</style>


