module.exports = [{
    url: '/file/download',
    // 'method': 'post',
    response: {
        delay: 1000,
        status: 201,
        headers: {
            'Content-Disposition': 'attachment;filename=aaaaa.txt;'
        },
        body: '/sample.txt'
    }
}];
