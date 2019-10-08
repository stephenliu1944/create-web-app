'use strict';
import gulp, { src, dest, series, parallel } from 'gulp';
import del from 'del';
import zip from 'gulp-zip';
import sftp from 'gulp-sftp-up4';
import mergeStream from 'merge-stream';
import { project, deploy } from './package.json';
import { execSync } from 'child_process';

const BUILD_PATH = 'build';                    // 编译文件
const DIST_PATH = 'dist';                      // 目的地文件
const { packageName } = project;               // 打包生成的文件名
const packageNames = typeof packageName === 'string' ? [packageName] : packageName || [];
const { dev, test } = deploy;

// 清除 dist 目录
gulp.task('clean', () => del([DIST_PATH]));

// 文件打包
gulp.task('dist', series('clean', () => {    
    var stream = src(`${BUILD_PATH}/**`);
    packageNames.forEach((name) => {
        stream = stream.pipe(dest(`${DIST_PATH}/${name}/`));
    });

    return stream;
}));

// 将静态资源压缩为 zip 格式
gulp.task('zip', series('dist', () => {
    var streams = [];
    packageNames.forEach((name) => {
        var stream = src([`${DIST_PATH}/${name}/**`], { base: `${DIST_PATH}/` })
            .pipe(zip(`${name}.zip`));
        streams.push(stream);
    });

    return mergeStream(...streams).pipe(gulp.dest(DIST_PATH));
}));

// 将静态资源发布到 dev 服务器
gulp.task('deploy-dev', () => {
    return src(dev.zip ? [`${DIST_PATH}/*.zip`] : [`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`])
        .pipe(sftp(dev));
});

// 将静态资源发布到 test 服务器
gulp.task('deploy-test', () => {
    return src(test.zip ? [`${DIST_PATH}/*.zip`] : [`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`])
        .pipe(sftp(test));
});

// 同时部署到开发和测试服务器
gulp.task('deploy-all', parallel('deploy-dev', 'deploy-test'));

gulp.task('git-push', (done) => {
    execSync('git add -A :/');
    execSync('git commit -m "quick commit"');
    execSync('git push');
    done();
});
