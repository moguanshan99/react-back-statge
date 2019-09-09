const { override, fixBabelImports, addLessLoader,addDecoratorsLegacy,addWebpackAlias} = require('customize-cra');

// 修改脚手架webpack的配置
module.exports = override(

    //按需加载组件代码和样式
    fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
}),

 //自定义主题se
 addLessLoader({
       javascriptEnabled: true,
       modifyVars: { '@primary-color': '#1DA57A' },
 }),

    //添加babel插件，支持装饰器语法,简化高阶组件的使用
    addDecoratorsLegacy(),

     // 配置路径别名, 就是为了简写路径. （缺点：路径就没有提示）
       addWebpackAlias({

        })
);