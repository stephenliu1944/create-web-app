var faker = require('faker');
var Mock = require('mockjs');

module.exports = [{
    url: '/user/123',
    response: {
        body: {
            id: 123,
            name: 'Stephen',
            email: 'xxx@gmail.com'
        }
    }
}, {
    url: '/user/:id',
    response: {
        body: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email()
        }
    }
}, {
    url: '/user/*.do',
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
    url: '/user/**/list',
    response: {
        body: Mock.mock({
            'data|20': [{
                id: '@integer(0, 10000)',
                name: '@name',
                email: '@email'
            }]
        }).data
    }
}];
