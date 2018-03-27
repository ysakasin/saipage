<template>
  <v-dialog v-model="value" max-width="500px">
    <v-card>
      <v-card-title>
        名前を変更
      </v-card-title>
      <v-card-text>
        <form v-on:submit.prevent="close()">
          <v-text-field
            label="名前"
            v-model.lazy="userName"
            autofocus
          ></v-text-field>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.stop="close()">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    value: Boolean
  }
})
export default class UserNameDialog extends Vue {
  get userName() {
    return this.$store.state.userName;
  }

  set userName(newName : string) {
    this.$store.commit("changeUserName", newName);
  }

  close() {
    this.$emit("close")
  }
}
</script>

