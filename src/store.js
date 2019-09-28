import Vuex from 'vuex'
import Vue from 'vue'
import Axios from 'axios';
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        favorites: sampleFavorites(),
        menu: "Search",
        loading: false,
        viewingUser: null,
        compareUser: null,
        compatibilityScore: 99
    },
    mutations: {
        addTeam(state, user) {
            state.favorites.push(user)
        },
        deleteTeam(state, id) {
            let newFavs = state.favorites.filter(function (value, index, arr) {
                return value.username != id
            });
            console.log(newFavs)
            state.favorites = newFavs
        },
        setMenu(state, item) {
            state.menu = item
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        setViewingUser(state, user) {
            state.viewingUser = user
        },
        setCompareUser(state, user) {
            state.compareUser = user
        },
        setCompatibilityScore(state, score) {
            state.compatibilityScore = score
        },
        clearViewingUser(state) {
            state.viewingUser = null
        },
        clearCompareUser(state) {
            state.compareUser = null
            state.compatibilityScore = null
        }
    },
    actions: {
        searchUser({ commit }, id) {
            let query = "http://localhost:5000/?user=" + id
            Axios.get(query)
                .then((response) => {
                    console.log(response.data)
                    if (response.message != "Not Found") {
                        commit('setViewingUser', JSON.parse(response.data))
                    }
                    commit('setLoading', false)
                })
                .catch(commit('setLoading', false))
        },
        compareUsers({ commit }, idA, idB) {
            let query = "http://localhost:5000/compare?userA=" + idA + "&userB=" + idB
            console.log("Reached");
            Axios.get(query)
                .then((response) => {
                    let users = [JSON.parse(response.data).userA, JSON.parse(response.data).userB]
                    commit('setCompareUser',users)
                    commit('setCompatibilityScore', JSON.parse(response.data).similarity)
                    commit('setLoading', false)
                }).catch(commit('setLoading', false))

        }
    }
})


function sampleFavorites() {
    let user1 = sampleUser()
    return [user1]
}

function sampleUser() {
    return {"name": "James Agnew", "username": "jamesagnew", "avatar": "https://avatars3.githubusercontent.com/u/3465117?v=4", "bio": null, "email": "jamesagnew@gmail.com", "location": "Toronto, Canada", "company": "HAPI // Smile CDR // University Health Network", "num_of_java_repos": 10, "avg_stars_count_per_repo": 87.3, "closed_issue_ratio": 0.6767810026385225, "avg_fork_count": 74.8, "has_maven_gradle": true, "has_readme": true, "uses_branches": true, "top_dependencies": [["hapi-fhir-base", 47], ["logback-classic", 42], ["javax.servlet-api", 30], ["hapi-fhir-structures-dstu3", 30], ["jetty-servlet", 28], ["jetty-server", 26], ["jetty-webapp", 25], ["maven-deploy-plugin", 24], ["thymeleaf", 24], ["jetty-servlets", 23]], "overall_score": 93, "scores": {"versatility": 92, "best_practices": 100, "github_activity": 89, "community_score": 49}, "community_scores": {"comments_quality_score": 57, "pr_quality_score": 40}, "avg_response_time": 5.6, "code_additions": 4175155, "code_deletions": 2158123}
}

function sampleCompareUsers() {
    return [
        {
            "avatar": "https://avatars1.githubusercontent.com/u/775227",
            "bio": null,
            "name": "Naoyuki",
            "username": "nk1234",
            "email": "naoyuki.kanezawa@gmail.com",
            "location": null,
            "company": "@zeit ",
            "num_of_java_repos": 2,
            "avg_stars_count_per_repo": 813.0,
            "avg_open_issues_per_repo": 31.5,
            "avg_fork_count": 309.0,
            "has_maven_gradle": true,
            "has_readme": true,
            "uses_branches": false,
            "top_dependencies": []
        },
        {
            "avatar": "https://avatars1.githubusercontent.com/u/775227",
            "bio": null,
            "name": "Naoyuki",
            "username": "nk12345",
            "email": "naoyuki.kanezawa@gmail.com",
            "location": null,
            "company": "@zeit ",
            "num_of_java_repos": 2,
            "avg_stars_count_per_repo": 813.0,
            "avg_open_issues_per_repo": 31.5,
            "avg_fork_count": 309.0,
            "has_maven_gradle": true,
            "has_readme": true,
            "uses_branches": false,
            "top_dependencies": []
        }
    ]
}