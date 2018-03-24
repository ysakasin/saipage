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
    <v-btn icon @click="settings = true">
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
  <v-dialog v-model="userNameDialog" max-width="500px">
    <v-card>
      <v-card-title>
        名前を変更
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="名前"
          v-model.lazy="userName"
          autofocus
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="userNameDialog=false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Nav from './Nav.vue'
import Settings from './Settings.vue'

@Component({
  components: {
    Nav,
    Settings,
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

  set userName(newName : String) {
    this.$store.commit("changeUserName", newName);
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

