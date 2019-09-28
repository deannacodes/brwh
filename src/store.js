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
                return value.id != id
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
            commit('setLoading', true)
            let query = base + "users/" + id
            Axios.get(query)
                .then((response) => {
                    if (response.message != "Not Found") {
                        commit('setViewingUser', response)
                    }
                    commit('setLoading', false)
                })
        },
        compareUsers({ commit }, idA, idB) {
            commit('setLoading', true)
            let query = base + "users/?user1=" + idA + "&user2=" + idB
            // Axios.get(query)
            //     .then((response) => {
            //         if (response.message != "Not Found") {
            //             commit('setViewingUser', response)
            //         }
            //         commit('setLoading', false)
            //     })

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
        "name": "James Agnew",
        "username": "jamesagnew",
        "avatar": "https://avatars3.githubusercontent.com/u/3465117?v=4",
        "bio": null,
        "email": "jamesagnew@gmail.com",
        "location": "Toronto, Canada",
        "company": "HAPI // Smile CDR // University Health Network",
        "num_of_java_repos": 10,
        "avg_stars_count_per_repo": 87.4,
        "closed_issue_ratio": 0.6767810026385225,
        "avg_fork_count": 74.8,
        "has_maven_gradle": true,
        "has_readme": true,
        "uses_branches": true,
        "top_dependencies": [
            [
                "hapi-fhir-base",
                47
            ],
            [
                "logback-classic",
                42
            ],
            [
                "javax.servlet-api",
                30
            ],
            [
                "hapi-fhir-structures-dstu3",
                30
            ],
            [
                "jetty-servlet",
                28
            ],
            [
                "jetty-server",
                26
            ],
            [
                "jetty-webapp",
                25
            ],
            [
                "maven-deploy-plugin",
                24
            ],
            [
                "thymeleaf",
                24
            ],
            [
                "jetty-servlets",
                23
            ]
        ],
        "overall_score": 0.9385660456114787,
        "scores": {
            "versatility": 0.9234378026481879,
            "best_practices": 1.0,
            "github_activity": 0.8922603341862484
        }
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