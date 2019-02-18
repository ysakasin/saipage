<template>
  <div>
    <v-toolbar>
      <v-toolbar-title><small>どどんとふのダイスが手軽に使える</small>Saipage</v-toolbar-title>
      <v-spacer/>
      <v-btn
        flat
        large
        class="hidden-xs-only game-type"
        @click="userNameDialog = true">
        <v-icon class="nameicon">book</v-icon>
        <span>{{ gameType }}</span>
      </v-btn>
      <v-btn
        icon
        class="hidden-sm-and-up"
        @click="userNameDialog = true">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-tooltip bottom>
        <v-btn
          slot="activator"
          icon
          @click.stop="playSound = !playSound">
          <v-icon v-if="playSound">volume_up</v-icon>
          <v-icon v-else>volume_off</v-icon>
        </v-btn>
        <span v-if="playSound">現在 : ON</span>
        <span v-else>現在 : OFF</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn
          slot="activator"
          icon
          @click.stop="settings = true">
          <v-icon>settings</v-icon>
        </v-btn>
        <span>設定</span>
      </v-tooltip>
    </v-toolbar>
    <Settings
      v-model="settings"
    />
    <UserNameDialog
      v-model="userNameDialog"
      @close="userNameDialog = false" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Settings from "./Settings.vue";
import UserNameDialog from "./UserNameDialog.vue";

@Component({
  components: {
    Settings,
    UserNameDialog
  }
})
export default class AppBar extends Vue {
  data() {
    return {
      settings: false,
      userNameDialog: false
    };
  }

  get gameType() {
    return this.$store.state.gameType;
  }

  get playSound() {
    return this.$store.state.settings.playSound;
  }
  set playSound(val: boolean) {
    this.$store.commit("updateSoundSetting", val);
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

.game-type {
  text-transform: none;
}
</style>
