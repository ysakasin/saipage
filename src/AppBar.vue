<template>
  <div>
  <v-toolbar>
    <v-icon>room</v-icon>
    <v-toolbar-title>{{ roomName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat large class="hidden-xs-only" @click="userNameDialog = true">
      <v-icon class="nameicon">account_circle</v-icon>
      <span>{{ userName }}</span>
    </v-btn>
    <v-btn icon class="hidden-sm-and-up" @click="userNameDialog = true">
      <v-icon>account_circle</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>volume_up</v-icon>
    </v-btn>
    <v-btn icon @click.stop="settings = true">
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
  <Settings v-model="settings" @close="settings = false" />
  <UserNameDialog v-model="userNameDialog" @close="userNameDialog = false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Nav from './Nav.vue'
import Settings from './Settings.vue'
import UserNameDialog from './UserNameDialog.vue'

@Component({
  components: {
    Nav,
    Settings,
    UserNameDialog,
  }
})
export default class AppBar extends Vue {
  data () {
    return {
      drawer: null,
      settings: false,
      userNameDialog: false,
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

  get userName() {
    return this.$store.state.userName;
  }

  get roomName() {
    return this.$store.state.roomName;
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
