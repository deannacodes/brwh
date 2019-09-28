
<template>
  <div
    v-bind:class="{'user-page-search': (viewingUser == null),
  'user-page-view': (viewingUser != null)
  }"
  >
    <template v-if="viewingUser == null">
      <div class="search-page">
        <div v-if="error != ''" class="alert alert-danger fade show" role="alert">{{ error }}</div>
        <h1>{{searchTitle}}</h1>
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
            v-model="query"
          />
        </div>
        <button class="btn btn-main" style="margin-top:30px;" v-on:click="searchUser">
          <font-awesome-icon icon="search" />Search
        </button>
      </div>
    </template>

    <template v-else>
      <div class="col-md-2 profile-sidebar">
        <div class="clear-search" v-on:click="clearUser">
          <font-awesome-icon icon="times" />
        </div>
        <img :src="viewingUser.data.avatar_url" />
        <h4>{{viewingUser.data.login}}</h4>
        <h6 v-if="viewingUser.data.name != null">{{viewingUser.data.name}}</h6>
        <h6 v-if="viewingUser.data.company != null">{{viewingUser.data.company}}</h6>
        <h6 v-if="viewingUser.data.location != null">{{viewingUser.data.location}}</h6>
        <p v-if="viewingUser.data.bio != null" style="padding: 20px 0;">{{viewingUser.data.bio}}</p>
        <button class="btn btn-sec" v-if="viewingUser.data.email != null">
          <font-awesome-icon icon="envelope" />Contact
        </button>
        <button style="margin-top: 15px;" class="btn btn-main">
          <font-awesome-icon icon="user-plus" />Save
        </button>
      </div>
      <div class="col-md-10 profile-main">
        <div class="row"></div>
      </div>
    </template>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "UserView",
  data() {
    return {
      error: "",
      query: "",
      searchTitle: "Search Github Users"
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
    clearUser() {
      this.$store.commit("clearViewingUser");
      this.error = "";
    }
  },
  computed: mapState({
    favorites: "favorites",
    menu: "menu",
    viewingUser: "viewingUser"
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
