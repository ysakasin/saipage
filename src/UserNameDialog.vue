<template>
  <v-dialog
    v-model="value"
    max-width="500px">
    <v-card>
      <v-card-title>
        名前を変更
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="close()">
          <v-text-field
            v-model.lazy="userName"
            label="名前"
            autofocus
          />
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat
          @click.stop="close()">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

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
    this.$store.commit('changeUserName', newName);
  }

  close() {
    this.$emit('close');
  }
}
</script>

