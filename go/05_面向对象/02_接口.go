package main

import (
	"fmt"
)

/*******************接口********************/
/*
	接口（interface）定义了一个对象的行为规范，只定义规范不实现，由具体的对象来实现规范的细节。
 */


/*******************接口类型********************/
/*
在Go语言中接口（interface）是一种类型，一种抽象的类型。
interface是一组method的集合，是duck-type programming的一种体现。接口做的事情就像是定义一个协议（规则），
只要一台机器有洗衣服和甩干的功能，我就称它为洗衣机。不关心属性（数据），只关心行为（方法）。
 */

//为什么要使用接口
type Cat struct {

}

func (c Cat) Say() string {
	return "喵喵喵"
}

type Dog struct {

}

func (d Dog) Say() string {
	return "汪汪汪"
}

func main021() {
	c := Cat{}
	fmt.Println("Cat Say: " , c.Say()) //Cat Say:  喵喵喵

	d := Dog{}
	fmt.Println("Dog Say: " , d.Say()) //Dog Say:  汪汪汪

	//上面的代码中定义了猫和狗，然后它们都会叫，你会发现main函数中明显有重复的代码，
	//如果我们后续再加上猪、青蛙等动物的话，我们的代码还会一直重复下去。那我们能不能把它们当成“能叫的动物”来处理呢？

	//像类似的例子在我们编程过程中会经常遇到：
	//比如一个网上商城可能使用支付宝、微信、银联等方式去在线支付，我们能不能把它们当成“支付方式”来处理呢？
	//比如三角形，四边形，圆形都能计算周长和面积，我们能不能把它们当成“图形”来处理呢？
	//比如销售、行政、程序员都能计算月薪，我们能不能把他们当成“员工”来处理呢？

	//Go语言中为了解决类似上面的问题，就设计了接口这个概念。接口区别于我们之前所有的具体类型，
	//接口是一种抽象的类型。当你看到一个接口类型的值时，你不知道它是什么，唯一知道的是通过它的方法能做什么。
}


/*******************接口的定义********************/
/*
Go语言提倡面向接口编程。
    接口是一个或多个方法签名的集合。
    任何类型的方法集中只要拥有该接口'对应的全部方法'签名。
    就表示它 "实现" 了该接口，无须在该类型上显式声明实现了哪个接口。
    这称为Structural Typing。
    所谓对应方法，是指有相同名称、参数列表 (不包括参数名) 以及返回值。
    当然，该类型还可以有其他方法。

    接口只有方法声明，没有实现，没有数据字段。
    接口可以匿名嵌入其他接口，或嵌入到结构中。
    对象赋值给接口时，会发生拷贝，而接口内部存储的是指向这个复制品的指针，既无法修改复制品的状态，也无法获取指针。
    只有当接口存储的类型和对象都为nil时，接口才等于nil。
    接口调用不会做  receiver的自动转换。
    接口同样支持匿名字段方法。
    接口也可实现类似OOP中的多态。
    空接口 可以作为任何类型数据的容器。
    一个类型可实现多个接口。
    接口命名习惯以 er 结尾。

每个接口由数个方法组成，接口的定义格式如下：
    type 接口类型名 interface{
        方法名1( 参数列表1 ) 返回值列表1
        方法名2( 参数列表2 ) 返回值列表2
        …
    }

其中：
    1.接口名：使用type将接口定义为自定义的类型名。Go语言的接口在命名时，一般会在单词后面添加er，
      如有写操作的接口叫Writer，有字符串功能的接口叫Stringer等。接口名最好要能突出该接口的类型含义。
    2.方法名：当方法名首字母是大写且这个接口类型名首字母也是大写时，这个方法可以被接口所在的包（package）之外的代码访问。
    3.参数列表、返回值列表：参数列表和返回值列表中的参数变量名可以省略。

举个例子：
	type writer interface{
		Write([]byte) error
	}
当你看到这个接口类型的值时，你不知道它是什么，唯一知道的就是可以通过它的Write方法来做一些事情。
 */


/*******************实现接口的条件********************/
/*
一个对象只要全部实现了接口中的方法，那么就实现了这个接口。换句话说，接口就是一个需要实现的方法列表。
 */

//我们来定义一个Sayer接口：
type Sayer interface {
	say()
}

//定义dog和cat两个结构体：
type dog struct {}
type cat struct {}

//因为Sayer接口里只有一个say方法，所以我们只需要给dog和cat 分别实现say方法就可以实现Sayer接口了
// cat实现了Sayer接口
func (c cat) say() {
	fmt.Println("喵喵喵")
}

// dog实现了Sayer接口
func (d dog) say() {
	fmt.Println("汪汪汪")
}




/*******************接口类型变量********************/
/*
接口类型变量能够存储所有实现了该接口的实例。 例如上面的示例中，Sayer类型的变量能够存储dog和cat类型的变量。
 */
func main022()  {

	var x Sayer // 声明一个Sayer类型的变量x

	c := cat{} // 实例化一个cat
	d := dog{} // 实例化一个dog
	x = c      // 可以把cat实例直接赋值给x
	x.say()     // 喵喵喵
	x = d     // 可以把dog实例直接赋值给x
	x.say()   // 汪汪汪
}


/******************值接收者和指针接收者实现接口的区别*********************/
//我们有一个Mover接口和一个dog结构体。
type Mover interface {
	move()
}

type fish struct {

}
//值接收者实现接口
/*func (f fish) move() {
	fmt.Println("fish会动")
}*/

//此时实现接口的是dog类型：
/*func main023()  {
	var m Mover
	var wangcai = fish{}  // 旺财是fish类型
	m = wangcai           // m可以接收fish类型
	fugui := &fish{}     //富贵是*fish类型
	m = fugui
	m = fugui           // m可以接收*fish类型
	m.move()
	//从上面的代码中我们可以发现，使用值接收者实现接口之后，
	//不管是dog结构体还是结构体指针*dog类型的变量都可以赋值给该接口变量。
	//因为Go语言中有对指针类型变量求值的语法糖，dog指针fugui内部会自动求值*fugui。
}*/


/******************指针接收者实现接口*********************/
func (f *fish) move() {
	fmt.Println("狗会动")
}

/*func main024() {
	var x Mover
	var wangcai = fish{} // 旺财是fish类型
	//x = wangcai         // x不可以接收fish类型
	var fugui = &fish{}  // 富贵是*fish类型
	x = fugui           // x可以接收*fish类型
	x.move()

	//此时实现Mover接口的是*dog类型，所以不能给x传入dog类型的wangcai，此时x只能存储*fish类型的值。
}
*/

//请问下面的代码是否能通过编译？
type People interface {
	Speak(string) string

}

type Stu struct {

}

/*func (stu *Stu) Speak(think string) (talk string){
	if think == "sb" {
		talk = "你是个大帅比"
	} else {
		talk = "hello"
	}
	return
}
*/

func (stu Stu) Speak(think string) (talk string){
	if think == "sb" {
		talk = "你是个大帅比"
	} else {
		talk = "hello"
	}
	return
}


func main025() {
	//var p People = Stu{} //cannot use Stu literal (type Stu) as type People in assignment:
						//Stu does not implement People (Speak method has pointer receiver)
	/*var p People = &Stu{}
	think := "smile"
	fmt.Println(p.Speak(think)) //hello*/

	var p1 People = Stu{}
	think := "sb"
	fmt.Println(p1.Speak(think)) //你是个大帅比

	var p2 People = &Stu{}
	SB := "sb"
	fmt.Println(p2.Speak(SB)) //你是个大帅比



}
/*****************一个类型实现多个接口**********************/
/*
一个类型可以同时实现多个接口，而接口间彼此独立，不知道对方的实现。
例如，狗可以叫，也可以动。我们就分别定义Sayer接口和Mover接口，如下： Mover接口。
 */

// Sayer 接口
type Sayer021 interface {
	Say()
}

// Mover 接口
type Mover021 interface {
	Move()
}

//dog既可以实现Sayer接口，也可以实现Mover接口。
type Dog021 struct {
	name string
}

// 实现Sayer接口
func (d Dog021) Say() {
	fmt.Printf("%s会叫汪汪汪\n", d.name)
}

// 实现Mover接口
func (d Dog021) Move() {
	fmt.Printf("%s会动\n", d.name)
}

func main026()  {
	var x Sayer021
	var y Mover021

	d := Dog021{"旺财"}
	x = d
	y = d
	x.Say() //旺财会叫汪汪汪
	y.Move() //旺财会动
}


/*****************多个类型实现同一接口**********************/
/*
Go语言中不同的类型还可以实现同一接口 首先我们定义一个Mover接口，它要求必须由一个move方法。
 */
type Mover022 interface {
	move()
}

//例如狗可以动，汽车也可以动，可以使用如下代码实现这个关系：
type dog022 struct {
	name string
}

type car022 struct {
	brand string
}

// dog类型实现Mover接口
func (d dog022) move() {
	fmt.Printf("%s会跑\n", d.name)
}

// car类型实现Mover接口
func (c car022) move() {
	fmt.Printf("%s速度70迈\n", c.brand)
}

func main027() {
	//这个时候我们在代码中就可以把狗和汽车当成一个会动的物体来处理了，不再需要关注它们具体是什么，只需要调用它们的move方法就可以了
	var x Mover022
	var a = dog022{name: "旺财"}
	var b = car022{brand: "保时捷"}
	x = a
	x.move() //旺财会跑
	x = b
	x.move() //保时捷速度70迈
}

/*
并且一个接口的方法，不一定需要由一个类型完全实现，接口的方法可以通过在类型中嵌入其他类型或者结构体来实现。
 */
// WashingMachine 洗衣机
type WashingMachine interface {
	wash()
	dry()
}

// 甩干器
type dryer struct{}

// 实现WashingMachine接口的dry()方法
func (d dryer) dry() {
	fmt.Println("甩一甩")
}

// 海尔洗衣机
type haier struct {
	dryer //嵌入甩干器
}

// 实现WashingMachine接口的wash()方法
func (h haier) wash() {
	fmt.Println("洗刷刷")
}

func main029()  {
	var x WashingMachine
	a := haier{dryer{}}
	x = a
	x.dry()
	x.wash()
	a.dry()
	a.wash()
	//甩一甩
	//洗刷刷
	//甩一甩
	//洗刷刷
}

/******************接口嵌套*********************/
/*
接口与接口间可以通过嵌套创造出新的接口
 */
type Sayer023 interface {
	say()
}

type Mover023 interface {
	move()
}

type animal interface {
	Sayer023
	Mover023
}

//嵌套得到的接口的使用与普通接口一样，这里我们让cat实现animal接口：
type cat023 struct {
	name string
}

func (c cat023) say() {
	fmt.Println("喵喵喵")
}

func (c cat023) move() {
	fmt.Println("猫会动")
}

func main0210()  {
	var x animal
	x = cat023{"huahua"}
	x.move()
	x.say()
	//猫会动
	//喵喵喵
}


/******************空接口的定义*********************/
/*
空接口是指没有定义任何方法的接口。因此任何类型都实现了空接口。
空接口类型的变量可以存储任意类型的变量
 */

func main0211()  {
	var x interface{}
	str := "long"
	x = str
	fmt.Printf("type:%T value:%v\n", x, x)

	i := 100
	x = i
	fmt.Printf("type:%T value:%v\n", x, x)

	b := true
	x = b
	fmt.Printf("type:%T value:%v\n", x, x)
	//type:string value:long
	//type:int value:100
	//type:bool value:true
}

/*****************空接口作为函数的参数**********************/

//使用空接口实现可以接收任意类型的函数参数。
func show(a interface{})  {
	fmt.Printf("type:%T value:%v\n", a, a)
}

func main0212()  {
	show("ixfosa")
	show(9)
	show(false)
	//type:string value:ixfosa
	//type:int value:9
	//type:bool value:false

	//空接口作为map的值
	var stuInfo = make(map[string]interface{})
	stuInfo["name"] = "ixfosa"
	stuInfo["age"] = 22
	stuInfo["married"] = false
	fmt.Println(stuInfo) //map[married:false name:ixfosa age:22]
}

/*******************类型断言********************/
/*
空接口可以存储任意类型的值，那我们如何获取其存储的具体数据呢？
接口值
	一个接口的值（简称接口值）是由一个具体类型和具体类型的值两部分组成的。这两部分分别称为接口的动态类型和动态值。

想要判断空接口中的值这个时候就可以使用类型断言，其语法格式：
    x.(T)
其中：
    x：表示类型为interface{}的变量
    T：表示断言x可能是的类型。
该语法返回两个参数，第一个参数是x转化为T类型后的变量，第二个值是一个布尔值，若为true则表示断言成功，为false则表示断言失败。
 */
func main()  {
	var x interface{}
	x = "zhong"
	data, ok := x.(string)

	if ok {
		fmt.Println(data) //zhong
	} else {
		fmt.Println("类型断言失败")
	}
}

//上面的示例中如果要断言多次就需要写多个if判断，这个时候我们可以使用switch语句来实现：
func justifyType(x interface{})  {
	switch v := x.(type) {
	case string:
		fmt.Printf("x is a string，value is %v\n", v)
	case int:
		fmt.Printf("x is a int is %v\n", v)
	case bool:
		fmt.Printf("x is a bool is %v\n", v)
	default:
		fmt.Println("unsupport type！")
	}
}
//因为空接口可以存储任意类型值的特点，所以空接口在Go语言中的使用十分广泛。
//关于接口需要注意的是，只有当有两个或两个以上的具体类型必须以相同的方式进行处理时才需要定义接口。
//不要为了接口而写接口，那样只会增加不必要的抽象，导致不必要的运行时损耗。

