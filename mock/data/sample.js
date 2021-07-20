module.exports = [{
    request: {
        url: '/api/user/123'
    },
    response: {
        body: {
            code: 'ok',
            message: '成功',
            data: {
                id: 123,
                name: 'Stephen',
                email: 'xxx@email.com'
            }
        }
    }
}, {
    request: {
        url: '/api/user/:id'
    },
    response: {
        body: {
            code: 'ok',
            message: '成功',
            data: {
                id: 123,
                name: 'Stephen',
                email: 'xxx@email.com'
            }
        }
    }
}, {
    request: {
        url: '/api/user/*.do'
    },
    response: {
        body: {
            code: 'ok',
            message: '成功',
            data: {
                id: 123,
                name: 'Stephen',
                email: 'xxx@email.com'
            }
        }
    }
}, {
    request: {
        url: '/api/users'
    },
    response: {
        body: {
            code: 'ok',
            message: '成功',
            data: [{
                id: 123, 
                name: 'Stephen',
                age: 30
            }, {
                id: 124, 
                name: 'Ricky',
                age: 20				
            }]
        }
    }
}];
