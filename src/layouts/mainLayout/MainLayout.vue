// import lazyload from 'Components/lazyload/Lazyload';

/**
 * @desc 页面主框架组件
 */
<template>
<div :class="$style.mainLayout">
    <Header />
    <div :class="$style.container">
        <router-view />
    </div>
    <Footer />
</div>
</template>

<script>
import Header from 'Components/header/Header';
import Footer from 'Components/footer/Footer';

export default {
    components: {
        Header,
        Footer
    }
}
</script>

<style module src="./mainLayout.less"></style>