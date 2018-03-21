<template>
  <div>
    <v-toolbar flat class="pa-1">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            dice-room <small>v0.0.0</small>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile v-for="item in items" :key="item.title" @click="">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Nav extends Vue {
  data () {
    return {
      items: [
        {icon: "account_circle", title: "名前を変更"},
        {icon: "casino", title: "ダイスボットを変更"},
        {icon: "settings", title: "設定"},
        {icon: "mdi-logout", title: "ログアウト"},
      ]
    }
  }
}
</script>


<style lang="scss">

</style>

