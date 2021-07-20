<template>
    <div :class="$style.home">
        <h1>Home</h1>
        <!-- 图片引入示例, 熟悉后请删除 -->
        <img :src="require('./images/cat.png')" />
        <!-- 子组件使用以及参数传递示例, 熟悉后请删除 -->
        <Component1 :users="users" />
    </div>
</template>

<script>
import Component1 from './components/component1/Component1';
import { getUsers } from './services/demo';
import { downloadFile } from 'Services/demo';

export default {
    name: "Home",
    components: {
        Component1
    },
    data () {
        return {
            users: null
        }
    },
    mounted () {
        /** 
         * 请求数据示例
         */
        getUsers().then(({ data }) => {
            this.users = data;
        }, (error) => {
            console.error(error);
        });

        /** 
         * 下载文件示例
         */
        // downloadFile('file').then((blob) => {                    
        //     // IE10-Edge
        //     if ('msSaveOrOpenBlob' in window.navigator) {
        //         window.navigator.msSaveOrOpenBlob(blob, 'sample.txt');
        //     // Other Browser
        //     } else {
        //         var a = document.createElement('a');
        //         a.href = window.URL.createObjectURL(blob);
        //         a.download = 'sample.txt';
        //         document.body.appendChild(a);
        //         a.click();
        //         document.body.removeChild(a);
        //     }
        // });
    }
};
</script>

<style module src="./home.less"></style>
