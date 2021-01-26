// 日期和时间

// 创建


//- 创建一个新的 Date 对象，只需要调用 new Date()，在调用时可以带有下面这些参数之一：
    //- new Date()
    //- 不带参数 —— 创建一个表示当前日期和时间的 Date 对象：
    let now = new Date();
    console.log( now ); // 显示当前的日期/时间  2021-01-25T12:31:40.040Z




//- new Date(milliseconds)
//- 创建一个 Date 对象，其时间等于 1970-01-01 00:00:00 UTC+0 再过一毫秒（1/1000 秒）。
    // 0 表示 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    console.log( Jan01_1970 ); // 1970-01-01T00:00:00.000Z

    // 现在增加 24 小时
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    console.log( Jan02_1970 ); // 1970-01-02T00:00:00.000Z

    // 传入的整数参数代表的是自 1970-01-01 00:00:00 以来经过的毫秒数，该整数被称为 时间戳。

    // 这是一种日期的轻量级数字表示形式。我们通常使用 new Date(timestamp) 通过时间戳来创建日期，
    // 并可以使用 date.getTime() 将现有的 Date 对象转化为时间戳

    // 在 01.01.1970 之前的日期带有负的时间戳，例如：
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    console.log( Dec31_1969 ); // 1969-12-31T00:00:00.000Z




//- new Date(datestring)
//- 如果只有一个参数，并且是字符串，那么它会被自动解析。该算法与 Date.parse 所使用的算法相同
    let date = new Date("2020-01-01");
    console.log(date); // 2020-01-01T00:00:00.000Z

    // 该时间未被设定，因此被假定为格林尼治标准时间（GMT）的午夜（midnight）
    // 并会根据你运行代码时的时区进行调整
    // 因此，结果可能是
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // 或
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

            //- new Date(year, month, date, hours, minutes, seconds, ms)
            //- 使用当前时区中的给定组件创建日期。只有前两个参数是必须的。
                //- year 必须是四位数：2013 是合法的，98 是不合法的。
                //- month 计数从 0（一月）开始，到 11（十二月）结束。
                //- date 是当月的具体某一天，如果缺失，则为默认值 1。
                //- 如果 hours/minutes/seconds/ms 缺失，则均为默认值 0。


    // 例如：
    // new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    // new Date(2011, 0, 1); // 同样，时分秒等均为默认值 0
    // 时间度量最大精确到 1 毫秒（1/1000 秒）：

    let date2 = new Date(2020, 1, 1, 0, 0, 0, 0);
    console.log( date2 ); // 2020-01-31T16:00:00.000Z



    
// -------------------------------------------------------------------------------------------




// 访问日期组件

    // 从 Date 对象中访问年、月等信息有多种方式：
        // getFullYear()    获取年份（4 位数）
        
        // getMonth()       获取月份，从 0 到 11。
       
        //  getDate()       获取当月的具体日期，从 1 到 31
       
        // getHours()，getMinutes()，getSeconds()，getMilliseconds() 获取相应的时间组件。
        
        // getDay()         获取一周中的第几天, 获取一周中的第几天，从 0（星期日）到 6（星期六）第一天始终是星期日
                         
        // getTime()    返回日期的时间戳 —— 从 1970-1-1 00:00:00 UTC+0 开始到现在所经过的毫秒数。      

// 不是 getYear()，而是 getFullYear()
    //- 很多 JavaScript 引擎都实现了一个非标准化的方法 getYear()。不推荐使用这个方法。
    // 它有时候可能会返回 2 位的年份信息。永远都不要使用它。要获取年份就使用 getFullYear()。

// 以上的所有方法返回的组件都是基于当地时区的。
// 当地时区的 UTC 对应项，它们会返回基于 UTC+0 时区的日、月、年等：
    // getUTCFullYear()，getUTCMonth()，getUTCDay()。只需要在 "get" 之后插入 "UTC" 即可。


//  当前日期
let now1 = new Date();

// 当地时区的小时数
console.log( now1.getHours() );

// 在 UTC+0 时区的小时数（非夏令时的伦敦时间）
console.log( date.getUTCHours() );

// 除了上述给定的方法，还有两个没有 UTC 变体的特殊方法：
    //- getTimezoneOffset()
    //- 返回 UTC 与本地时区之间的时差，以分钟为单位：

// 如果你在时区 UTC-1，输出 60
// 如果你在时区 UTC+3，输出 -180
console.log( new Date().getTimezoneOffset() );





// -------------------------------------------------------------------------------------------



// 设置日期组件

    // 下列方法可以设置日期/时间组件：
        //- setFullYear(year, [month], [date])
        //- setMonth(month, [date])
        //- setDate(date)
        //- setHours(hour, [min], [sec], [ms])
        //- setMinutes(min, [sec], [ms])
        //- setSeconds(sec, [ms])
        //- setMilliseconds(ms)
        //- setTime(milliseconds)（使用自 1970-01-01 00:00:00 UTC+0 以来的毫秒数来设置整个日期）
    // 以上方法除了 setTime() 都有 UTC 变体，例如：setUTCHours()。
    // 有些方法可以一次性设置多个组件，比如 setHours。未提及的组件不会被修改。

// 举个例子：
let today = new Date();

today.setHours(0);
console.log(today); // 日期依然是今天，但是小时数被改为了 0

today.setHours(0, 0, 0, 0);
console.log(today); // 日期依然是今天，时间为 00:00:00。



// -------------------------------------------------------------------------------------------





// 自动校准（Autocorrection）
    //- 自动校准 是 Date 对象的一个非常方便的特性。我们可以设置超范围的数值，它会自动校准。

let date01 = new Date(2020, 0, 32); // 32 Jan 2013 ?!?
console.log(date01); // ……是 1st Feb 2013!
// 超出范围的日期组件将会被自动分配。


// 假设我们要在日期 “28 Feb 2016” 上加 2 天。结果可能是 “2 Mar” 或 “1 Mar”，
// 因为存在闰年。但是我们不需要去考虑这些，只需要直接加 2 天，剩下的 Date 对象会帮我们处理：
let date02 = new Date(2016, 1, 28);
date02.setDate(date02.getDate() + 2);
console.log( date02 ); // 1 Mar 2016


// 这个特性经常被用来获取给定时间段后的日期。例如，我们想获取“现在 70 秒后”的日期：
let date03 = new Date();
date03.setSeconds(date03.getSeconds() + 70);
console.log( date03 ); // 显示正确的日期信息 


// 我们还可以设置 0 甚至可以设置负值。例如：
let date04 = new Date(2021, 1, 25);
date04.setDate(1); // 设置为当月的第一天
console.log( date04 ); // 2021-01-31T16:00:00.000Z

date04.setDate(0); // 天数最小可以设置为 1，所以这里设置的是上一月的最后一天
console.log( date04 ); // 2021-01-30T16:00:00.000Z




// -------------------------------------------------------------------------------------------




// 日期转化为数字，日期差值
    // 当 Date 对象被转化为数字时，得到的是对应的时间戳，与使用 date.getTime() 的结果相同：

let date05 = new Date();
console.log(+date05); // 以毫秒为单位的数值，与使用 date.getTime() 的结果相同

// 有一个重要的副作用：日期可以相减，相减的结果是以毫秒为单位时间差。

// 这个作用可以用于时间测量：
let start = new Date(); // 开始测量时间
// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // 结束测量时间

console.log( `The loop took ${end - start} ms` );





// -------------------------------------------------------------------------------------------





// Date.now()
    //- 如果我们仅仅想要测量时间间隔，我们不需要 Date 对象。
    //- 有一个特殊的方法 Date.now()，它会返回当前的时间戳。

// 它相当于 new Date().getTime()，但它不会创建中间的 Date 对象。因此它更快，而且不会对垃圾处理造成额外的压力。

// 这种方法很多时候因为方便，又或是因性能方面的考虑而被采用，例如使用 JavaScript 编写游戏或其他的特殊应用场景。

// 因此这样做可能会更好：
let start1 = Date.now(); // 从 1 Jan 1970 至今的时间戳

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end1 = Date.now(); // 完成

console.log( `The loop took ${end1 - start1} ms` ); // 相减的是时间戳，而不是日期






// -------------------------------------------------------------------------------------------




// 度量（Benchmarking）
    //- 如果我们想要为一个很耗 CPU 性能的函数提供一个可靠的度量（benchmark），我们应该小心一点。


// 例如，我们想判断两个计算日期差值的函数：哪个更快？
// 这种性能测量通常称为“度量（benchmark）”。

// 我们有 date1 和 date2，哪个函数会更快地返回两者的时间差？
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

// 这两个函数做的事情完全相同，但是其中一个函数使用显性的 date.getTime() 来获取毫秒形式的日期，
// 另一个则依赖于“日期 — 数字”的转换。它们的结果是一样的。

// 那么，哪个更快呢？
    // 首先想到的方法可能是连续运行它们很多次，并计算时间差。就我们的例子而言，函数非常简单，
    // 所以我们必须执行至少 100000 次。



function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

console.log( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
console.log( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );

// 使用 getTime() 这种方式快得多！原因是它没有类型转化，这样对引擎优化来说更加简单。
// 我们得到了结论，但是这并不是一个很好的度量的例子。

// 想象一下当运行 bench(diffSubtract) 的同时，CPU 还在并行处理其他事务，并且这也会占用资源。
// 然而，运行 bench(diffGetTime) 的时候，并行处理的事务完成了。

// 这是对于现代多进程操作系统来说的一个非常真实的场景。

// 结果就是，第一个函数相比于第二个函数，缺少 CPU 资源。这可能导致错误的结论。

// 为了得到更加可靠的度量，整个度量测试包应该重新运行多次。

// 例如，像下面的代码这样：

function diffSubtract1(date1, date2) {
  return date2 - date1;
}

function diffGetTime1(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench1(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

// 交替运行 bench(upperSlice) 和 bench(upperLoop) 各 10 次
for (let i = 0; i < 10; i++) {
  time1 += bench1(diffSubtract1);
  time2 += bench1(diffGetTime1);
}

console.log( 'Total time for diffSubtract: ' + time1 );
console.log( 'Total time for diffGetTime: ' + time2 );

// 现代的 JavaScript 引擎的先进优化策略只对执行很多次的 “hot code” 有效（对于执行很少次数的代码没有必要优化）。
// 因此，在上面的例子中，第一次执行的优化程度不高。我们可能需要增加一个升温步骤：

// 在主循环中增加“升温”环节
// bench(diffSubtract);
// bench(diffGetTime);

// 开始度量
for (let i = 0; i < 10; i++) {
  time1 += bench1(diffSubtract1);
  time2 += bench1(diffGetTime1);
}
// 进行微度量测试时要小心
// 现代的 JavaScript 引擎执行了很多优化。与“正常使用”相比，它们可能会改变“人为测试”的结果，
// 特别是在我们对很细微的东西进行度量测试时，例如 operator 的工作方式或内建函数。
// 因此，如果你想好好了解一下性能，请学习 JavaScript 引擎的工作原理。在那之后，你可能再也不需要微度量了。




// -------------------------------------------------------------------------------------------




// 对一个字符串使用 Date.parse
    //- Date.parse(str) 方法可以从一个字符串中读取日期。

// 字符串的格式应该为：YYYY-MM-DDTHH:mm:ss.sssZ，其中：
    //- YYYY-MM-DD —— 日期：年-月-日。
    //- 字符 "T" 是一个分隔符。
    //- HH:mm:ss.sss —— 时间：小时，分钟，秒，毫秒。
    //- 可选字符 'Z' 为 +-hh:mm 格式的时区。单个字符 Z 代表 UTC+0 时区。
    //- 简短形式也是可以的，比如 YYYY-MM-DD 或 YYYY-MM，甚至可以是 YYYY。

// Date.parse(str) 调用会解析给定格式的字符串，并返回时间戳（自 1970-01-01 00:00:00 起所经过的毫秒数）。
// 如果给定字符串的格式不正确，则返回 NaN。


let ms = Date.parse('2021-01-25');

console.log(ms); // 1327611110417  (时间戳)

// 我们可以通过时间戳来立即创建一个 new Date 对象：
let time = new Date( Date.parse('2021-01-25T21:20') );

console.log(time); // 2021-01-25T13:20:00.000Z   13+8=21
 
console.log(time.getHours()); // 21


// -------------------------------------------------------------------------------------------



// 总结
    //- 在 JavaScript 中，日期和时间使用 Date 对象来表示。我们不能只创建日期，或者只创建时间，Date 对象总是同时创建两者。
    //- 月份从 0 开始计数（对，一月是 0）。
    //- 一周中的某一天 getDay() 同样从 0 开始计算（0 代表星期日）。
    //- 当设置了超出范围的组件时，Date 会进行自我校准。这一点对于日/月/小时的加减很有用。
    //- 日期可以相减，得到的是以毫秒表示的两者的差值。因为当 Date 被转换为数字时，Date 对象会被转换为时间戳。
    //- 使用 Date.now() 可以更快地获取当前时间的时间戳。
    //- 和其他系统不同，JavaScript 中时间戳以毫秒为单位，而不是秒。

// 有时我们需要更加精准的时间度量。JavaScript 自身并没有测量微秒的方法（百万分之一秒），
// 但大多数运行环境会提供。例如：浏览器有 performance.now() 方法来给出从页面加载开始的以毫秒为单位的微秒数（精确到毫秒的小数点后三位）：
    // console.log(`Loading started ${performance.now()}ms ago`);
    // 类似于 "Loading started 34731.26000000001ms ago"
    // .26 表示的是微秒（260 微秒）
    // 小数点后超过 3 位的数字是精度错误，只有前三位数字是正确的


