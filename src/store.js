import Vuex from 'vuex'
import Vue from 'vue'
import Axios from 'axios';
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        favorites: sampleFavorites(),
        menu: "Search",
        loading: false,
        viewingUser: sampleUser(),
        compareUser: sampleCompareUsers(),
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
    let user2 = sampleUser()
    let user3 = sampleUser()
    return [user1, user2, user3]
}

function sampleUser() {
    return {
        "name": "Adrian",
        "username": "garlicsauce",
        "avatar": "https://avatars0.githubusercontent.com/u/10085330?v=4(25 kB)",
        "bio": "24 years old java and angular developer.",
        "email": "adrian.michalik@wp.pl",
        "location": "Warsaw",
        "company": "@HLTech",
        "num_of_java_repos": 2,
        "avg_stars_count_per_repo": 0.5,
        "closed_issue_ratio": 0.9565217391304348,
        "avg_fork_count": 0.0,
        "has_maven_gradle": true,
        "has_readme": true,
        "uses_branches": true,
        "top_dependencies": [
            [
                "junit",
                2
            ],
            [
                "judge-d-contract-publisher-core",
                1
            ],
            [
                "maven-plugin-testing-harness",
                1
            ],
            [
                "maven-plugin-annotations",
                1
            ],
            [
                "maven-compiler-plugin",
                1
            ],
            [
                "maven-gpg-plugin",
                1
            ],
            [
                "maven-javadoc-plugin",
                1
            ],
            [
                "maven-plugin-plugin",
                1
            ],
            [
                "maven-source-plugin",
                1
            ],
            [
                "maven-surefire-plugin",
                1
            ]
        ],
        "overall_score": 61,
        "scores": {
            "versatility": 40,
            "best_practices": 100,
            "github_activity": 43,
            "community_score": 21
        },
        "community_scores": {
            "comments_quality_score": 0,
            "pr_quality_score": 43
        },
        "avg_response_time": 0.0,
        "code_additions": 336,
        "code_deletions": 206
    }
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