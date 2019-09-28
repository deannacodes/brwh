import Vuex from 'vuex'
import Vue from 'vue'
import Axios from 'axios';
Vue.use(Vuex)

const base = "https://api.github.com/"

export const store = new Vuex.Store({
    state: {
        favorites: sampleFavorites(),
        menu: "Compatibility",
        viewingUser: {
            "data": {
                "login": "deannacodes",
                "id": 33584568,
                "node_id": "MDQ6VXNlcjMzNTg0NTY4",
                "avatar_url": "https://avatars0.githubusercontent.com/u/33584568?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/deannacodes",
                "html_url": "https://github.com/deannacodes",
                "followers_url": "https://api.github.com/users/deannacodes/followers",
                "following_url": "https://api.github.com/users/deannacodes/following{/other_user}",
                "gists_url": "https://api.github.com/users/deannacodes/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/deannacodes/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/deannacodes/subscriptions",
                "organizations_url": "https://api.github.com/users/deannacodes/orgs",
                "repos_url": "https://api.github.com/users/deannacodes/repos",
                "events_url": "https://api.github.com/users/deannacodes/events{/privacy}",
                "received_events_url": "https://api.github.com/users/deannacodes/received_events",
                "type": "User",
                "site_admin": false,
                "name": "Deanna",
                "company": "Bluebeam, Inc",
                "blog": "deanna.codes",
                "location": null,
                "email": "deanna.streffer@gmail.com",
                "hireable": null,
                "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "public_repos": 12,
                "public_gists": 0,
                "followers": 0,
                "following": 0,
                "created_at": "2017-11-11T22:36:36Z",
                "updated_at": "2019-09-07T15:08:13Z"
            },
            "status": 200,
            "statusText": "OK",
            "headers": {
                "x-ratelimit-remaining": "53",
                "x-github-media-type": "github.v3",
                "last-modified": "Sat, 07 Sep 2019 15:08:13 GMT",
                "etag": "W/\"288c28fc9ba38428ffaf04835a3fae22\"",
                "content-type": "application/json; charset=utf-8",
                "cache-control": "public, max-age=60, s-maxage=60",
                "x-ratelimit-reset": "1569595592",
                "x-ratelimit-limit": "60"
            },
            "config": {
                "url": "https://api.github.com/users/deannacodes",
                "method": "get",
                "headers": {
                    "Accept": "application/json, text/plain, */*"
                },
                "transformRequest": [
                    null
                ],
                "transformResponse": [
                    null
                ],
                "timeout": 0,
                "xsrfCookieName": "XSRF-TOKEN",
                "xsrfHeaderName": "X-XSRF-TOKEN",
                "maxContentLength": -1
            },
            "request": {}
        },
        compareUser: null
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
        setViewingUser(state, user) {
            state.viewingUser = user
        },
        setCompareUser(state, user) {
            state.compareUser = user
        },
        clearViewingUser(state) {
            state.viewingUser = null
            state.compareUser = null
        },
        clearCompareUser(state) {
            state.compareUser = null
        }

    },
    actions: {
        searchUser({ commit }, id) {
            let query = base + "users/" + id
            Axios.get(query)
                .then((response) => {
                    if (response.message != "Not Found") {
                        commit('setViewingUser', response)
                    }
                })
        }
    }
})


function sampleFavorites() {
    let user1 = { id: "jsmith123", name: "John Smith", location: "Tokyo, JP", score: 76, img: "https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", company: "Bizreach" }
    let user2 = { id: "jane_doe_github", name: "Jane Doe", location: "Seattle, WA", score: 80, img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", company: "Google" }
    let user3 = { id: "mscott45", name: "Michael Scott", location: "Scranton, PA", score: 55, img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", company: "Dunder Mifflin" }
    return [user1, user2, user3]
}