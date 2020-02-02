import { task, src, dest, series } from 'gulp';
import del from 'del';
import compress from 'gulp-zip';
import sftp from 'gulp-sftp-up4';
import mergeStream from 'merge-stream';
import { parcels, deployments } from './package.json';
import { execSync } from 'child_process';

const BUILD_PATH = 'build';                    // 编译文件
const DIST_PATH = 'dist';                      // 目的地文件
const parcelList = Array.isArray(parcels) ? parcels : [parcels];
const deploymentList = Array.isArray(deployments) ? deployments : [deployments];

function isEnabled(config = {}) {
    return config.enabled || config.enabled === undefined;
}

function trimSlash(name = '') {
    return name.replace(/^\/*/, '').replace(/\/*$/, '');
}

// 清除 build 目录
task('clean-build', () => del([BUILD_PATH]));

// 清除 dist 目录
task('clean-dist', () => del([DIST_PATH]));

// 项目打包
task('package', series('clean-dist', () => {
    // 遍历打包配置
    var streams = parcelList.filter(isEnabled).map((parcel) => {
        const { name = '', zip } = parcel;    // name 是必填项
        const PROJECT_NAME = trimSlash(name);
        const ZIP_NAME = zip || PROJECT_NAME;

        return src([`${BUILD_PATH}/${PROJECT_NAME}/**`], { base: `${BUILD_PATH}/` })
                .pipe(compress(`${ZIP_NAME}.zip`));
    });

    return mergeStream(...streams).pipe(dest(DIST_PATH));
}));

// 将静态资源部署到服务器
task('deploy', () => {
    // 遍历发布配置
    var streams = deploymentList.filter(isEnabled).map((deployment) => {
        var files = parcelList.filter(isEnabled).map((parcel) => {
            const { name = '', zip } = parcel;    // name 是必填项
            const ZIP_NAME = zip || trimSlash(name);

            return `${DIST_PATH}/${ZIP_NAME}.zip`;
        });

        return src(files).pipe(sftp(deployment));
    });

    return mergeStream(...streams);
});

task('git-push', (done) => {
    execSync('git add -A :/');
    execSync('git commit -m "quick commit"');
    execSync('git push');
    done();
});
