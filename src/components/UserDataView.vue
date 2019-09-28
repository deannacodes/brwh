
<template>
  <div class="container-fluid data-holder" style="background: none">
    <div class="score-card score-card-main">
      <h1>Overall Score</h1>
      {{viewingUser.overall_score}}
      <hr />
      <div class="row" v-for="(score, type) in viewingUser.scores" v-bind:key="type">
        <div class="col-md-9 score-name">{{ type }}</div>
        <div class="col-md-3">{{ score }}</div>
      </div>
    </div>

    <br>

    <div class="score-card">
      <h3>Java Repository Stats</h3>
      <hr>
      <div class="java-stat row">
        <div class="col-md-9">Number of Repos:</div>
        <div class="col-md-3">{{viewingUser.num_of_java_repos}}</div>
      </div>
      <div class="java-stat row">
        <div class="col-md-9">Average Stars per Repo:</div>
        <div class="col-md-3">{{viewingUser.avg_stars_count_per_repo}}</div>
      </div>
      <div class="java-stat row">
        <div class="col-md-9">Average Open Issues per Repo:</div>
        <div class="col-md-3">{{viewingUser.avg_open_issues_per_repo}}</div>
      </div>
      <div class="java-stat row">
        <div class="col-md-9">Average Fork Count:</div>
        <div class="col-md-3">{{viewingUser.avg_fork_count}}</div>
      </div>
    </div>

    <div class="score-card">
      <h3>Best Practices</h3>
      <hr>
      <div class="best-practices row">
        <font-awesome-icon v-if="viewingUser.has_maven_gradle" icon="check-square" />
        <font-awesome-icon v-else icon="square" />Uses Maven or Gradle
      </div>
      <div class="best-practices row">
        <font-awesome-icon v-if="viewingUser.has_readme" icon="check-square" />
        <font-awesome-icon v-else icon="square" />Uses Readme
      </div>
      <div class="best-practices row">
        <font-awesome-icon v-if="viewingUser.uses_branches" icon="check-square" />
        <font-awesome-icon v-else icon="square" />Uses Branches
      </div>
    </div>

    <div class="score-card">
      <h3>Versatility</h3>
      <hr />
      <div class="row" v-for="dependency in viewingUser.top_dependencies" v-bind:key="type">
        <div class="col-md-9 score-name">{{ dependency[0] }}</div>
        <div class="col-md-3">{{ dependency[1] }}</div>
      </div>
    </div>
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
  methods: {},
  computed: mapState({
    viewingUser: "viewingUser"
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
