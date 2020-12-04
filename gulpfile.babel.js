import { task, src } from 'gulp';
import sftp from 'gulp-sftp-up4';
import mergeStream from 'merge-stream';
import { execSync } from 'child_process';
import { name, parcel, deployments } from './package.json';

const DIST_PATH = 'dist';                      // 目的地文件
const deploymentList = Array.isArray(deployments) ? deployments : [deployments];

function isEnabled(config = {}) {
    return config.enabled || config.enabled === undefined;
}

// 将静态资源部署到服务器
task('deploy', () => {
    // 遍历发布配置
    var streams = deploymentList.filter(isEnabled).map((deployment) => {
        const { zip } = parcel;
        let file = `${DIST_PATH}/${name}`;

        if (zip) {
            file += '.zip';
        }
        return src(file).pipe(sftp(deployment));
    });

    return mergeStream(...streams);
});

task('git-push', (done) => {
    execSync('git add -A :/');
    execSync('git commit -m "quick commit"');
    execSync('git push');
    done();
});
