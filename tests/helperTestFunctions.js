const supertest = require('supertest')
const app = require('../src/index')

const routes = {
    'ping' : '/ping',
    'list': '/list',
    'login': '/login',
    'register': {
        'default': '/register',
        'exists': '/register/exist'
    },
    'content': {
        'about': '/content/about'
    },
    'user': {
        'delete': '/user/delete',
        'following': '/user/following',
        'get': {
            'username': '/user/get/username',
            'email': '/user/get/email',
            'profession': '/user/get/profession',
            'stats': '/user/get/stats'
        },
        'set': {
            'username': '/user/set/username',
            'email': '/user/set/email',
            'profession': '/user/set/profession',
            'unfollow': '/user/set/unfollow',
            'password': '/user/set/password'
        }
    },
    'posts': {
        'default': '/posts',
        'create': '/posts/create',
        'delete': '/posts/delete',
        'edit': '/posts/edit'
    }
}

const checkRouteExists = async (route) => {
    const response = await supertest(app).get(route)
    return response.status === 200
}

module.exports = { checkRouteExists, routes }
