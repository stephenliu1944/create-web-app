'use strict';
import { task, src, dest, series, parallel } from 'gulp';
import del from 'del';
import compress from 'gulp-zip';
import sftp from 'gulp-sftp-up4';
import mergeStream from 'merge-stream';
import { parcel, deployment } from './package.json';
import { execSync } from 'child_process';

const BUILD_PATH = 'build';                    // 编译文件
const DIST_PATH = 'dist';                      // 目的地文件
const { name, zip } = parcel;                  // 打包配置
const packageNames = typeof name === 'string' ? [name] : name || [];
const { dev, test } = deployment;

// 清除 dist 目录
task('clean', () => del([DIST_PATH]));

// 文件拷贝到 dist 目录
task('dist', () => {    
    var stream = src(`${BUILD_PATH}/**`);
    packageNames.forEach((name) => {
        stream = stream.pipe(dest(`${DIST_PATH}/${name}/`));
    });

    return stream;
});

// 将静态资源压缩为 zip 格式
task('zip', () => {
    var streams = [];
    packageNames.forEach((name) => {
        var stream = src([`${DIST_PATH}/${name}/**`], { base: `${DIST_PATH}/` })
            .pipe(compress(`${typeof zip === 'string' ? zip : name}.zip`));
        streams.push(stream);
    });

    return mergeStream(...streams).pipe(dest(DIST_PATH));
});
// 打包项目
task('package', series('clean', 'dist', 'zip'));

// 将静态资源发布到 dev 服务器
task('deploy-dev', () => {
    return src(dev.zip ? [`${DIST_PATH}/*.zip`] : [`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`])
        .pipe(sftp(dev));
});

// 将静态资源发布到 test 服务器
task('deploy-test', () => {
    return src(test.zip ? [`${DIST_PATH}/*.zip`] : [`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`])
        .pipe(sftp(test));
});

// 同时部署到开发和测试服务器
task('deploy-all', parallel('deploy-dev', 'deploy-test'));

task('git-push', (done) => {
    execSync('git add -A :/');
    execSync('git commit -m "quick commit"');
    execSync('git push');
    done();
});
