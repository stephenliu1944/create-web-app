var faker = require('faker');
var Mock = require('mockjs');

module.exports = [{
    url: '/user/*',
    response: {
        body: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email()
        }
    }
}, {
    url: '/user/**/name',
    response: {
        body: Mock.mock({
            'data|20': [{
                id: '@integer(0, 10000)',
                name: '@name',
                email: '@email'
            }]
        }).data
    }
}, {
    'url': '/demo/detail/:id.do',
    'mockjs': true,
    'delay': 500,
    'method': 'get',
    'result': {
        'statusCode': 200,
        'message': '请求成功',
        'success': true,
        'data': {
            'id': '@integer(0, 10000)',
            'personName': '@cname',
            'cellPhone': '@integer(11)',
            'email': '@email',
            'level': '@integer(0, 1)',
            'status': 'disable'
        }
    }
}, {
    'url': '/demo/list.do',
    'mockjs': true,
    'delay': 1000,
    'method': 'get',
    'result': {
        'statusCode': 200,
        'message': '请求成功',
        'success': true,
        'data|20': [
            {
                'id': '@integer(0, 10000)',
                'personName': '@cname',
                'cellPhone': '@integer(11)',
                'email': '@email',
                'level': '@integer(0, 1)',
                'status': 'enable'
            }
        ]
    }
}];
