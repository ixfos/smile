// 在现代 JavaScript 中，数字（number）有两种类型：
    // JavaScript 中的常规数字以 64 位的格式 IEEE-754 存储，也被称为“双精度浮点数”。
    // BigInt 数字，用于表示任意长度的整数。有时会需要它们，因为常规数字不能超过 253 或小于 -253。


// -------------------------------------------------------------------------------------------


// 编写数字的更多方法

// 需要写 10 亿。显然的方法是：
let billion1 = 1000000000;

// 在 JavaScript 中，我们通过在数字后附加字母 “e”，并指定零的数量来缩短数字：
let billion2 = 1e9;  // 10 亿，字面意思：数字 1 后面跟 9 个 0

console.log( 7.3e9 );  // 73 亿（7,300,000,000）

// 换句话说，"e" 把数字乘以 1 后面跟着给定数量的 0 的数字。
    //- 1e3 = 1 * 1000
    //- 1.23e6 = 1.23 * 1000000


// 一些非常小的数字。例如，1 微秒（百万分之一秒）：
let ms1 = 0.000001;

// 就像以前一样，可以使用 "e" 来完成。如果我们想避免显式地写零，我们可以这样写：
let ms2 = 1e-6; // 1 的左边有 6 个 0

// 如果我们数一下 0.000001 中的 0 的个数，是 6 个。所以自然是 1e-6。
// 换句话说，e 后面的负数表示除以 1 后面跟着给定数量的 0 的数字：
// -3 除以 1 后面跟着 3 个 0 的数字
    // 1e-3 = 1 / 1000 (=0.001)
// -6 除以 1 后面跟着 6 个 0 的数字
    //- 1.23e-6 = 1.23 / 1000000 (=0.00000123)




// -------------------------------------------------------------------------------------------



// 十六进制，二进制和八进制数字
    //- 十六进制 数字在 JavaScript 中被广泛用于表示颜色，编码字符以及其他许多东西。
    //- 所以自然地，有一种较短的写方法：0x，然后是数字。
// 例如：
console.log( 0xff ); // 255
console.log( 0xFF ); // 255（一样，大小写没影响）


// 二进制和八进制数字系统很少使用，但也支持使用 0b 和 0o 前缀：
let a = 0b11111111;  // 二进制形式的 255
let b = 0o377;       // 八进制形式的 255

console.log( a == b ); // true，两边是相同的数字，都是 255

// 只有这三种进制支持这种写法。对于其他进制，我们应该使用函数 parseInt




// -------------------------------------------------------------------------------------------



// toString(base)
    //- 方法 num.toString(base) 返回在给定 base 进制数字系统中 num 的字符串表示形式。

// 举个例子：
let num = 255;
console.log( num.toString(16) );  // ff
console.log( num.toString(2) );   // 11111111

// base 的范围可以从 2 到 36。默认情况下是 10。

// 常见的用例如下：
    //- base=16 用于十六进制颜色，字符编码等，数字可以是 0..9 或 A..F。
    //- base=2 主要用于调试按位操作，数字可以是 0 或 1。
    //- base=36 是最大进制，数字可以是 0..9 或 A..Z。所有拉丁字母都被用于了表示数字。
        

// 做一个短的 URL。可以简单地使用基数为 36 的数字系统表示：
console.log( 123456..toString(36) ); // 2n9c



// 使用两个点来调用一个方法
    // 请注意 123456..toString(36) 中的两个点不是打错了。如果我们想直接在一个数字上调用一个方法，
    // 比如上面例子中的 toString，那么我们需要在它后面放置两个点 ..。

    // 如果我们放置一个点：123456.toString(36)，那么就会出现一个 error，
    // 因为 JavaScript 语法隐含了第一个点之后的部分为小数部分。
    // 如果我们再放一个点，那么 JavaScript 就知道小数部分为空，现在使用该方法。

// 也可以写成 (123456).toString(36)。
console.log( (123456).toString(36) ); // 2n9c





// -------------------------------------------------------------------------------------------




// 舍入

// 对数字进行舍入的内建函数：
    //- Math.floor
        //- 向下舍入：3.1 变成 3，-1.1 变成 -2。

    //- Math.ceil
        //- 向上舍入：3.1 变成 4，-1.1 变成 -1。

    //- Math.round
        //- 向最近的整数舍入：3.1 变成 3，3.6 变成 4，-1.1 变成 -1。

    //- Math.trunc（IE 浏览器不支持这个方法）
        //- 移除小数点后的所有内容而没有舍入：3.1 变成 3，-1.1 变成 -1。



// 将数字舍入到小数点后 n 位，该怎么办？
    // 例如，我们有 1.2345，并且想把它舍入到小数点后两位，仅得到 1.23。

//- 1.乘除法
    // 例如，要将数字舍入到小数点后两位，我们可以将数字乘以 100（或更大的 10 的整数次幂），
    // 调用舍入函数，然后再将其除回。
let num1 = 1.23456;

console.log( Math.floor(num1 * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23

// 2.函数 toFixed(n) 将数字舍入到小数点后 n 位，并以字符串形式返回结果。

let num2 = 12.34;
console.log( num2.toFixed(1) ); // "12.3"

// 这会向上或向下舍入到最接近的值，类似于 Math.round：

let num3 = 12.36;
console.log( num3.toFixed(1) ); // "12.4"
// 请注意 toFixed 的结果是一个字符串。如果小数部分比所需要的短，则在结尾添加零：

let num4 = 12.34;
console.log( num4.toFixed(5) ); // "12.34000"，在结尾添加了 0，以达到小数点后五位
// 可以使用一元加号或 Number() 调用，将其转换为数字：+ num.toFixed(5)。




// -------------------------------------------------------------------------------------------



// 不精确的计算
    // 在内部，数字是以 64 位格式 IEEE-754 表示的，所以正好有 64 位可以存储一个数字：
    // 中 52 位被用于存储这些数字，其中 11 位用于存储小数点的位置（对于整数，它们为零），而 1 位用于符号。

// 如果一个数字太大，则会溢出 64 位存储，并可能会导致无穷大
console.log( 1e500 ); // Infinity


// 测试：
console.log( 0.1 + 0.2 == 0.3 ); // false

// 检查 0.1 和 0.2 的总和是否为 0.3，我们会得到 false。
// 当我们对两个数字进行求和时，它们的“精度损失”会叠加起来。
console.log( 0.1 + 0.2 ); // 0.30000000000000004


// 最可靠的方法是借助方法 toFixed(n) 对结果进行舍入：
let sum = 0.1 + 0.2;
console.log( sum.toFixed(2) ); // 0.30
// toFixed 总是返回一个字符串。它确保小数点后有 2 位数字。

// 对于其他情况，我们可以使用一元加号将其强制转换为一个数字：
console.log( +sum.toFixed(2) ); // 0.3


// 两个零
    //- 数字内部表示的另一个有趣结果是存在两个零：0 和 -0。
    //- 这是因为在存储时，使用一位来存储符号，因此对于包括零在内的任何数字，可以设置这一位或者不设置。
    //- 在大多数情况下，这种区别并不明显，因为运算符将它们视为相同的值。
console.log(0 === -0); // true




// -------------------------------------------------------------------------------------------




// 测试：isFinite 和 isNaN

// 两个特殊的数值：
    //- Infinity（和 -Infinity）是一个特殊的数值，比任何数值都大（小）。
    //- NaN 代表一个 error。
// 它们属于 number 类型，但不是“普通”数字，因此，这里有用于检查它们的特殊函数：


//- isNaN(value) 将其参数转换为数字，然后测试它是否为 NaN：
console.log( isNaN(NaN) ); // true
console.log( isNaN("66") ); // false
console.log( isNaN(66) ); // false
console.log( isNaN("str") ); // true

//- 值 “NaN” 是独一无二的，它不等于任何东西，包括它自身：
console.log( NaN == NaN ); // false
console.log( NaN === NaN ); // false


//isFinite(value) 将其参数转换为数字，如果是常规数字，则返回 true，而不是 NaN/Infinity/-Infinity：
console.log( isFinite("15") ); // true
console.log( isFinite("str") ); // false，因为是一个特殊的值：NaN
console.log( isFinite(Infinity) ); // false，因为是一个特殊的值：Infinity

// 有时 isFinite 被用于验证字符串值是否为常规数字：
let n = +"15";
// 结果会是 true，除非你输入的是 Infinity、-Infinity 或不是数字
console.log( isFinite(n) ); // true

// 请注意，在所有数字函数中，包括 isFinite，空字符串或仅有空格的字符串均被视为 0。


// 与 Object.is 进行比较
    //- 有一个特殊的内建方法 Object.is，它类似于 === 一样对值进行比较，但它对于两种边缘情况更可靠：
        //- 它适用于 NaN：Object.is（NaN，NaN）=== true，这是件好事。
        //- 值 0 和 -0 是不同的：Object.is（0，-0）=== false，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。
    // 在所有其他情况下，Object.is(a，b) 与 a === b 相同。





// -------------------------------------------------------------------------------------------




// parseInt 和 parseFloat
    //- 使用加号 + 或 Number() 的数字转换是严格的。如果一个值不完全是一个数字，就会失败：

console.log( +"100px" ); // NaN

// 唯一的例外是字符串开头或结尾的空格，因为它们会被忽略。


// 但在现实生活中，我们经常会有带有单位的值，例如 CSS 中的 "100px" 或 "12pt"。并希望从中提取出一个数值。
// 这就是 parseInt 和 parseFloat 的作用。

// 它们可以从字符串中“读取”数字，直到无法读取为止。如果发生 error，则返回收集到的数字。
// 函数 parseInt 返回一个整数，而 parseFloat 返回一个浮点数：

console.log( parseInt('100px') ); // 100
console.log( parseFloat('12.5em') ); // 12.5

console.log( parseInt('12.3') ); // 12，只有整数部分被返回了
console.log( parseFloat('12.3.4') ); // 12.3，在第二个点出停止了读取

// 某些情况下，parseInt/parseFloat 会返回 NaN。当没有数字可读时会发生这种情况：
console.log( parseInt('a123') ); // NaN，第一个符号停止了读取

console.log( parseInt('2n9c', 36) ); // 123456



// -------------------------------------------------------------------------------------------



// 其他数学函数
    //- JavaScript 有一个内建的 Math 对象，它包含了一个小型的数学函数和常量库。

// Math.random()
    //- 返回一个从 0 到 1 的随机数（不包括 1）

console.log( Math.random() ); // 0.1234567894322
console.log( Math.random() ); // 0.5435252343232
console.log( Math.random() ); // ... (任何随机数)

// Math.max(a, b, c...) / Math.min(a, b, c...)
    //- 从任意数量的参数中返回最大/最小值。

console.log( Math.max(3, 5, -10, 0, 1) ); // 5
console.log( Math.min(1, 2) ); // 1

// Math.pow(n, power)
    //- 返回 n 的给定（power）次幂

console.log( Math.pow(2, 10) ); // 2 的 10 次幂 = 1024



