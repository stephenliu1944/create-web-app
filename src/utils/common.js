/**
 * @desc 封装了一些项目常用方法.
 */

/**
 * @desc 函数节流
 * @url http://underscorejs.org/#throttle
 * @param {string} func 防抖函数
 * @param {string} wait 间隔时间
 * @param {string} options 可选项
 */
export function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) {
        options = {};
    }

    var later = function() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };

    return function() {
        var now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        } 
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

/**
 * @desc 函数防抖，让某个函数在上一次执行后，满足等待某个时间内不再触发此函数后再执行，而在这个等待时间内再次触发此函数，等待时间会重新计算。
 * 解决频繁发生的事件，比如
 * 1.window 的 resize、scroll
 * 2.mousedown、mousemove
 * 3.keyup、keydown
 * 试用场景：输入框搜索，滚动懒加载图片
 * @param {fun} 需要进行函数防抖的函数
 * @param {wait} 参数wait则是需要等待的时间，单位为毫秒
 * @param {immediate} immediate参数如果为true，则debounce函数会在调用时立刻执行一次function，而不需要等到wait这个时间后，
 */
export function debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function() {
        var context = this;
        var args = arguments;
        
        if (timeout) {
            clearTimeout(timeout);
        }

        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;

            if (callNow) {
                result = func.apply(context, args);
            }

            timeout = setTimeout(function() {
                // timeout 为 null 的时候 callNow 才为 true.
                timeout = null;
            }, wait);
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}