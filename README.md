# @babel/standalone  @types/babel__standalone
- babel 的浏览器端版本
- 可以在浏览器端直接使用 babel 编译 js 代码


# babel 
源码   (parse) ==> 
抽象语法树（AST）  (transform) ==>  
降级的 AST (generate) ==>  
目标代码  

# import { useState, useEffect } from 'react'
1. Blob + URL.createObjectURL() 可以将 js 代码转换为 blob  url
2. import maps + esm.sh

# @monaco-editor/react
 - 基于 monaco-editor 的 react 组件
 - 左侧的编辑器
 - 编辑器中的 ts 代码提示 npm i @typescript/ata

# 右侧的预览
 - iframe 预览
 引入Import Map 可以在 iframe 中使用 import 语句
 控制浏览器如何解析 js 模块的导入路径 简单来说 它就像是一个 “地址簿” 一样
 告诉浏览器当遇到某个模块名时, 应该去哪里找到对应的文件
 在项目中做了映射文件配置为react react-dom/client 这种模块名做了CDN映射
 所以在 iframe 中可以直接使用 import 语句 遇到了react这种模块名就会去映射表里找它对应的CDN地址
 这样做就能在 iframe 中正确处理解析模块名使用 react 了
 import map 让浏览器也能像 node.js 一样解析模块名 不用关心 CDN 地址 享受现代化的开发体验

 将需要运行的js代码通过babel编译降级后, 转换为浏览器可以直接运行的代码, 再将它包装成 HTML类型的二进制对象 也就是 Blob 对象
 再通过 URL.createObjectURL() 方法将 Blob 对象转换为 URL 字符串, 一个临时的本地URL
 最后将这个 URL 字符串赋值给 iframe 的 src 属性, 就可以在 iframe 中运行降级后的 js 代码了
 一般这种本地 URL 都是应用于视频播放的场景 让视频只能在当前域名下播放 就不会发生盗取视频的情况了