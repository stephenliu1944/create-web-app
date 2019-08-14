
// var Mock = require('mockjs');
// var faker = require('faker');

module.exports = [{
    'url': '/demo/add',
    'method': 'post',
    'response': {
        'delay': 3000,
        'status': 200,
        'header': {
            
        },
        'body': {
            'statusCode': 200,
            'message': '请求成功',
            'success': true,
            'data': {
                'id': '@integer(0, 10000)'
            }
        }
    }
}, {
    'url': '/demo/edit/:id',
    'mockjs': true,
    'delay': 500,
    'method': 'post',
    'result': {
        'statusCode': 200,
        'message': '请求成功',
        'success': true,
        'data': {
            'id': '@integer(0, 10000)'
        }
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
