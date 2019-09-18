//动态生成导航菜单项（不能写死，以防往后还要添加，故需要动态生成）


/*
* 思路：
*    ---要生成多个菜单肯定需要遍历，故一定是个数组，数组中是一个一个的对象，一个对象就是一个菜单
*    ---导航菜单有一级菜单和二级菜单，如何区分？
*        --1).通常加一个children属性来区分，有children属性的就是二级菜单，没有children属性的是一级菜单
*        --2).一个组件的内部有些子元素，子元素都放在children属性中，children属性值是一个数组，数组中存放的是每一个子菜单对象
*/

const menus=[
    {
        Icon:'home',
        title:'menus.home',
        key:'/'
    },
    {
        Icon:'appstore',
        title:'menus.products',
        key:'/products',
        children:[
            {
                Icon:'bars',
                title:'menus.category',
                key:'/category'
            },
            {
                Icon:'tool',
                title:'menus.product',
                key:'/product'
            }
        ]
    },
    {
        Icon:'user',
        title:'menus.user',
        key:'/user'
    },
    {
        Icon:'safety',
        title:'menus.role',
        key:'/role'
    },
    {
        Icon:'area-chart',
        title:'menus.charts',
        key:'/charts',
        children:[
            {
                Icon:'bar-chart',
                title:'menus.bar',
                key:'/charts/bar'
            },
            {
                Icon:'line-chart',
                title:'menus.line',
                key:'/charts/line'
            },
            {
                Icon:'pie-chart',
                title:'menus.pie',
                key:'/charts/pie'
            },
        ]
    },

];
export default menus;