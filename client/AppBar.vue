<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        <small class="hidden-xs-only">どどんとふのダイスが手軽に使える</small>Saipage
      </v-toolbar-title>
      <v-spacer/>
      <v-select
        v-model="gameType"
        :menu-props="{ maxHeight: '400'}"
        :items="diceBots"
        class="hidden-xs-only game-type"
        prepend-icon="book"
        item-text="name"
        item-value="gameType"
        placeholder="ロード中……"
      />
      <v-tooltip bottom>
        <v-btn
          slot="activator"
          class="hidden-xs-only"
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Settings from "./Settings.vue";
import { fetchDicebots } from "./dice";

interface DiceBotInfo {
  name: string;
  gameType: string;
}

const diceBots: DiceBotInfo[] = [];

@Component({
  components: {
    Settings
  }
})
export default class AppBar extends Vue {
  data() {
    return {
      settings: false,
      diceBots: diceBots
    };
  }

  mounted() {
    if (this.$data.diceBots.length == 0) {
      fetchDicebots().then(dicebots => {
        this.$data.diceBots = dicebots;
      });
    }
  }

  get gameType() {
    return this.$store.state.gameType;
  }

  set gameType(newType) {
    this.$store.dispatch("updateGameType", newType);
    // this.$data.snackbarText = `ダイスボットを「${newType}」に変更しました`;
    // this.$data.snackbar = true;
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
  max-width: 270px !important;
  padding-top: 16px;
  padding-right: 15px;
  .v-icon {
    color: #000 !important;
  }
}
</style>
