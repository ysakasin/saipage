<template>
  <v-dialog
    v-model="isActive"
    max-width="500px">
    <v-card>
      <v-card-title>
        ショートカット編集
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="add()">
          <v-text-field
            v-model.lazy="command"
            label="登録するコマンドを入力..."
            autofocus
          />
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  props : {
    value: Boolean
  },
  watch : {
    value (val : boolean) {
      if (val != this.$data.isActive) {
        this.$data.isActive = val;
      }
    },
    isActive (val : boolean) {
      this.$emit('input', val);
    }
  }
})
export default class ShortcutDialog extends Vue {
  data () {
    return {
      isActive: false,
      command: '',
    };
  }

  add () {
    this.$store.commit('addShortcut', this.$data.command);
    this.$data.command = '';
  }
}
</script>


