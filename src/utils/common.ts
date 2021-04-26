/**
 * @desc 封装了一些项目常用方法.
 */

// 内部函数, 用于判断对象类型
function _getClass(obj: any): string {
    return Object?.prototype?.toString?.call(obj)?.match(/^\[object\s(.*)\]$/)[1];
}

export function isArray(obj: any): boolean {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj: any): boolean {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj: any): boolean {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj: any): boolean {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj: any): boolean {
    return _getClass(obj).toLowerCase() === 'number';
}

export function isFormData(obj: any): boolean {
    return (typeof FormData !== 'undefined') && (obj instanceof FormData);
}

export function isFile(obj: any): boolean {
    return _getClass(obj).toLowerCase() === 'file';
}

export function isBlob(obj: any): boolean {
    return _getClass(obj).toLowerCase() === 'blob';
}

export function isFunction(obj: any): boolean {
    return _getClass(obj).toLowerCase() === 'function';
}

export function isURLSearchParams(obj: any): boolean {
    return typeof URLSearchParams !== 'undefined' && obj instanceof URLSearchParams;
}

export function isIE(): boolean {
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf('compatible') > -1 &&
        userAgent.indexOf('MSIE') > -1) {
        return true;
    }
    return false;
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj: any): boolean {
    let empty = false;

    if (obj === null || obj === undefined) { // null and undefined
        empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true;
    } else if (isObject(obj)) {
        let hasProp = false;
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                hasProp = true;
                break;
            }
        }
        if (!hasProp) {
            empty = true;
        }
    } else if (isNumber(obj) && isNaN(obj)) {
        empty = true;
    }
    return empty;
}

/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj: any): boolean {
    return !isEmpty(obj);
}

/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中全是空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str: string): boolean {
    if (isEmpty(str)) {
        return true;
    } else if (isString(str) && str.trim().length === 0) {
        return true;
    }
    return false;
}

/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj: string): boolean {
    return !isBlank(obj);
}

/**
 * @desc 函数节流
 * @url http://underscorejs.org/#throttle
 * @param {string} func 防抖函数
 * @param {string} wait 间隔时间
 * @param {string} options 可选项
 */
export function throttle(func: Function, wait: number, options: {leading?: boolean, trailing?: boolean}): Function {
    let context: object, args: object, result: Function;
    let timeout: number | null = null;
    let previous: number = 0;

    if (!options) {
        options = {};
    }

    let later = function() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };

    return function(this: typeof throttle) {
        let now: number = +new Date();
        
        if (!previous && options.leading === false) {
            previous = now;
        } 
        
        let remaining: number = wait - (now - previous);
        context = this;
        args = arguments;
        
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                window.clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = window.setTimeout(later, remaining);
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
export function debounce(func: Function, wait: number, immediate: boolean): Function {
    let timeout: number | null = null;
    let result: () => void | null = null;
    let debounced = function(this: typeof debounce) {
        let context = this;
        let args = arguments;
        
        if (timeout) {
            window.clearTimeout(timeout);
        }

        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;

            if (callNow) {
                result = func.apply(context, args);
            }

            timeout = window.setTimeout(function() {
                // timeout 为 null 的时候 callNow 才为 true.
                timeout = null;
            }, wait);
        } else {
            timeout = window.setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        return result;
    };

    (debounced as any).cancel = function() {
        window.clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

/**
 * @desc 字符串切分为数组
 * @param {String} str 将要切分的字符串
 * @param {String} separator 分隔符
 * @return {Array} 切分的数组.
 */
export function spliteStr(str: string, separator: string = ','): string[] {
    if (isBlank(str)) {
        return [];
    }

    let array: Array<string> = [];

    str.split(separator).forEach(substring => {
        let substr = substring.trim();
        if (substr.length > 0) {
            array.push(substr);
        }
    });
    return array;
}
