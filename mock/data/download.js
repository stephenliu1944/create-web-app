module.exports = [{
    url: '/files/:name',
    method: 'post',
    response: {
        delay: 2000,
        headers: {
            'Content-Disposition': 'attachment;filename=sample.txt;'
        },
        body: '/sample.txt'
    }
}];
