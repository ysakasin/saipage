<template>
  <v-layout row>
    <v-dialog
      v-model="needPassword"
      max-width="500px"
      persistent>
      <v-card>
        <v-card-title>
          <span class="headline">パスワード入力</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model.lazy="password"
                  :append-icon="visiblePassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (visiblePassword = !visiblePassword)"
                  :type="visiblePassword ? 'text' : 'password'"
                  label="パスワードを入力..."
                  autofocus=""
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            depressed
            @click.native="joinRoom()">送信</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component({})
export default class PasswordDialog extends Vue {
  data() {
    return {
      visiblePassword: false,
      password: ""
    };
  }

  get needPassword(): boolean {
    return this.$store.state.needPassword;
  }

  joinRoom() {
    this.$store.commit("updatePassword", this.$data.password);
    this.$store.dispatch("joinRoom", this.$store.state.roomId);
  }
}
</script>
