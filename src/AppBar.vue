<template>
  <div>
  <v-toolbar>
    <v-icon>room</v-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat large class="hidden-xs-only">
      <v-icon class="nameicon">account_circle</v-icon>
      <span>{{ username }}</span>
    </v-btn>
    <v-btn icon class="hidden-sm-and-up">
      <v-icon>account_circle</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>volume_up</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>settings</v-icon>
    </v-btn>
    <v-menu bottom left>
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" @click="" :disabled="item.disabled">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
  <v-navigation-drawer v-model="drawer" absolute>
    <Nav />
  </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Nav from './Nav.vue'

@Component({
  components: {
    Nav,
  }
})
export default class AppBar extends Vue {
  data () {
    return {
      username: "酒田　シンジ",
      title: "滅びの立会人と創造の観測者と",
      drawer: null,
      a1: null,
      states: ["CoC", "DiceBot", "Shinobigami", "Kancore"],
      items: [
        {title: "ログを保存", disabled: true},
        {title: "ショートカットを保存", disabled: true},
        {title: "ショートカットを読み込む", disabled: true},
        {title: "ルームから退出", disabled: false},
      ]
    }
  }
}
</script>


<style lang="scss">
.dice-select {
  width: 100px;
}
.nameicon {
  padding-right: 8px;
}
</style>

