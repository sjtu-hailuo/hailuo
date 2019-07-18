1.创建新项目
react-native init hailuo_app --version 0.59.9

2.替换App.js文件，复制src文件到目录

3.安装依赖（yarn add xxx）
3.1.don't need to link
xml2js(装完这个运行后会依次爆缺下面三个module的错，依次yarn add)
-- events
-- timers
-- stream
react-native-elements

3.2.need to link:
react-navigation(暂未用到)
react-native-vector-icons
react-native-fs
react-native-webview
react-native-sound
npm i git://github.com/chadsmith/react-native-microphone-stream.git

4.sync project
全部install和link结束，到android studio 去sync project

5.运行
最后react-native run-android

出现页面与Hello，成功运行
