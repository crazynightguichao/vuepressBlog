#!/usr/bin/env sh
###
 # @Author: jiaguichao
 # @Date: 2022-01-13 18:28:01
 # @LastEditTime: 2022-01-17 10:23:59
 # @Description: Do not edit
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.zhangyunchen.cc' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f git@github.com:crazynightguichao/crazynightguichao.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/vuepress.git master:gh-pages

cd -
