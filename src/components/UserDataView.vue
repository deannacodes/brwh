
<template>
  <div class="container-fluid data-holder" style="background: none">
    <div class="score-card score-card-main">
      <div class="row">
        <div class="col-md-6">
          <h1>Overall Score</h1>
          <radial-progress-bar
            :diameter="200"
            :completed-steps="viewingUser.overall_score"
            :total-steps="100"
            start-color="#4eaba8"
            stop-color="#489290"
            inner-stroke-color="#efefef"
            stroke-width="20"
          >
            <h1>{{viewingUser.overall_score}}</h1>
          </radial-progress-bar>
        </div>
        <div class="col-md-6 align-self-center justify-self-center" style="border-left: 1px solid #efefef; padding-left: 30px; ">
          <div class="row" v-for="(score, type) in viewingUser.scores" v-bind:key="type">
            <div class="col-md-9 score-name">
              <h5>{{ type }}</h5>
            </div>
            <div class="col-md-3">
              <radial-progress-bar
                :diameter="65"
                :completed-steps="score"
                :total-steps="100"
                start-color="#4eaba8"
                stop-color="#489290"
                inner-stroke-color="#efefef"
                stroke-width="5"
              >
                <h6>{{score}}</h6>
              </radial-progress-bar>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="score-card">
      <h3>Java Repository Stats</h3>
      <hr />
      <div class="java-stat row">
        <div class="col-md-9">Number of Repos:</div>
        <div class="col-md-3">{{viewingUser.num_of_java_repos}}</div>
      </div>
      <div class="java-stat row">
        <div class="col-md-9">Average Stars per Repo:</div>
        <div class="col-md-3">{{viewingUser.avg_stars_count_per_repo}}</div>
      </div>
      <div class="java-stat row">
        <div class="col-md-9">Average Closed Issues per Repo:</div>
        <div class="col-md-3">{{viewingUser.closed_issue_ratio}}</div>
      </div>
      <div class="java-stat row">
        <div class="col-md-9">Average Fork Count:</div>
        <div class="col-md-3">{{viewingUser.avg_fork_count}}</div>
      </div>
    </div>

    <div class="score-card">
      <h3>Best Practices</h3>
      <hr />
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
import RadialProgressBar from "vue-radial-progress";

export default {
  name: "UserView",
  data() {
    return {
    };
  },
  computed: mapState({
    viewingUser: "viewingUser"
  }),
  components: {
    RadialProgressBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
