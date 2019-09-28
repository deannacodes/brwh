<template>
  <div class="compare-page">
    <div class="compare-content">
      <div v-if="error != ''" class="alert alert-danger fade show" role="alert">{{ error }}</div>
      <h1>{{title}}</h1>
      <div class="input-group flex-nowrap" style="margin-top:30px;">
        <div class="input-group-prepend">
          <span class="input-group-text" id="addon-wrapping">@</span>
        </div>
        <input
          type="text"
          class="form-control search-textbox"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          v-model="queryA"
        />
        <div class="input-group-append">
          <b-button v-b-modal.chooseSavedA class="btn btn-sec-small" type="button" id="button-addon1">
            <font-awesome-icon icon="star" />Saved Users
          </b-button>
        </div>
      </div>
      <div class="compare-icon">
        <font-awesome-icon icon="exchange-alt" />
      </div>
      <div class="input-group flex-nowrap">
        <div class="input-group-prepend">
          <span class="input-group-text" id="addon-wrapping">@</span>
        </div>
        <input
          type="text"
          class="form-control search-textbox"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          v-model="queryB"
        />
        <div class="input-group-append">
          <b-button v-b-modal.chooseSavedB class="btn btn-sec-small" type="button" id="button-addon2">
            <font-awesome-icon icon="star" />Saved Users
          </b-button>
        </div>
      </div>
      <button class="btn btn-main" style="margin-top:30px;" v-on:click="searchUser">
        <font-awesome-icon icon="balance-scale" />Compare
      </button>
    </div>

    <b-modal ref="cs" id="chooseSavedA" title="Saved Users" hide-footer>
      <form>
        <div class="form-group">
          <label for="name">Select a user from your saved users.</label>
          <div class="list-group list-group-flush">
            <a v-for="user in favorites" v-bind:key="user.id" @click="chooseSaved('chooseSavedA', user.id)" href="#" class="list-group-item list-group-item-action">{{user.id}}</a>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal ref="cs" id="chooseSavedB" title="Saved Users" hide-footer>
      <form>
        <div class="form-group">
          <label for="name">Select a user from your saved users.</label>
          <div class="list-group list-group-flush">
            <a v-for="user in favorites" v-bind:key="user.id" @click="chooseSaved('chooseSavedB', user.id)" href="#" class="list-group-item list-group-item-action">{{user.id}}</a>
          </div>
        </div>
      </form>
    </b-modal>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CompatibilityView",
  data() {
    return {
      title: "Check Engineer Compatibility",
      queryA: "",
      queryB: "",
      error: ""
    };
  },
  methods: {
    searchUser() {
      this.$store.dispatch("searchUser", this.query);
      if (this.viewingUser == null) {
        this.error = "User not found";
      } else {
        this.error = "";
      }
    },
    chooseSaved(modal, id) {
      if (modal == 'chooseSavedB') {
        this.queryB = id
        this.$refs['cs'].hide("chooseSavedB")
      } else {
        this.queryA = id
        this.$refs['cs'].hide("chooseSavedA")
      }
    }
  },
  computed: mapState({
    favorites: "favorites",
    menu: "menu"
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
