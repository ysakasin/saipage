<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        <small class="hidden-xs-only">どどんとふのダイスが手軽に使える</small
        >Saipage
      </v-toolbar-title>
      <v-spacer />
      <v-autocomplete
        v-model="gameType"
        :menu-props="{ maxHeight: '400' }"
        :items="diceBots"
        class="hidden-xs-only game-type"
        prepend-icon="mdi-book-open-page-variant"
        item-text="name"
        item-value="gameType"
        placeholder="ロード中……"
      />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click.stop="playSound = !playSound"
            class="hidden-xs-only"
            icon
          >
            <v-icon v-if="playSound">mdi-volume-high</v-icon>
            <v-icon v-else>mdi-volume-off</v-icon>
          </v-btn>
        </template>
        <span v-if="playSound">現在 : ON</span>
        <span v-else>現在 : OFF</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click.stop="settings = true" icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>設定</span>
      </v-tooltip>
    </v-toolbar>
    <Settings v-model="settings" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Settings from "./Settings.vue";

interface DiceBotInfo {
  name: string;
  gameType: string;
}

@Component({
  components: {
    Settings
  }
})
export default class AppBar extends Vue {
  data() {
    return {
      settings: false
    };
  }

  get diceBots() {
    return this.$store.state.diceBots;
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
  padding-top: 18px !important;
  padding-right: 15px;
  .v-icon {
    color: #000 !important;
  }
}
</style>
