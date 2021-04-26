# 依赖镜像
FROM nginx
# 将项目的打包目录, 拷贝到镜像的 /usr/share/nginx/html 目录
COPY dist /usr/share/nginx/html
# 将项目的 nginx.conf 配置, 拷贝到镜像的 /etc/nginx 目录
COPY etc/nginx.conf /etc/nginx/nginx.conf