/** 
 * 示例代码, 熟悉后请删除
 */
<template>
<div :class="$style.component1">
    <h1>Subcomponent</h1>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{ user }}
        </li>   
    </ul>
</div>
</template>

<script>
export default {
    props: ['users']
};
</script>

<style module src="./component1.less"></style>