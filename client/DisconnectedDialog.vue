<template>
  <v-dialog
    v-model="disconnected"
    max-width="500px"
    persistent>
    <v-card>
      <v-card-title>
        <span class="headline">サーバーとの接続が切れました</span>
      </v-card-title>
      <v-card-text>
        通信の不良またはルームが削除されたことにより、サーバーとの接続が切れました。
        再接続するまでしばらく待つか、ページのリロードをしてください。
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat
          href="/"
        >ロビーに戻る</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class DisconnectedDialog extends Vue {
  get disconnected(): boolean {
    return this.$store.state.disconnected;
  }
}
</script>
