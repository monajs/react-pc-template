### 开发推荐
该项目已支持 react hook，为了提升性能，请尽量考虑使用 react 函数组件来开发。


### 项目启动
```bash
npm i
```

```bash
npm start
```

### 代理服务
- hosts配置
```
127.0.0.1		business.meitun.com
```
- 启动代理服务
```
npm run proxy
```
- 你也可以选择用nginx

### 项目打包
```bash
npm run build
```

* 打包后文件存储在 `dist` 文件夹下

### eslint

[eslint-rules](https://eslint.org/docs/rules/)


### commitlint

#### Commit message格式:
`<type>: <subject>`
注意冒号后面有空格。

#### type
用于说明 commit 的类别，只允许使用下面7个标识。

* `feat`：新功能（feature）
* `fix`：修补bug
* `docs`：文档（documentation）
* `style`： 格式（不影响代码运行的变动）
* `refactor`：重构（即不是新增功能，也不是修改bug的代码变动）
* `test`：增加测试
* `chore`：构建过程或辅助工具的变动


### stylelint

[stylelint-rules](https://stylelint.io/user-guide/rules/)

[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard/blob/9efccc5bb3e5faf57bf99b36b3bd7c8256b66a09/index.js) extends [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended/blob/master/index.js)

[规则文档翻译](https://github.com/monajs/mona-template-react/blob/master/docs/stylelint.config.md)
