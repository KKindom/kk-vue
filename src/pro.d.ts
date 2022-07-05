//解决TypeScript引入js第三方包，无法找到模块“xxx.js”的声明文件 xxx隐式拥有 “any“ 类型 的问题

declare module '@/tools/verfifcation.js' // declare module 'xxx'路径或者模块名
declare module '@/api/Link.js' // declare module 'xxx'路径或者模块名
declare module '@/api/url.js' // declare module 'xxx'路径或者模块名
