```html
<div align="center">
  <img src="./public/favicon.svg" width="160" />
  <h1>React SoybeanAdmin</h1>
  <span><a href="./README.en-US.md">English</a> | 中文</span>
</div>
```

---

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

> [!NOTE]
> If you find `React SoybeanAdmin` helpful, or if you like our project, please give us a ⭐️ on GitHub. Your support is our motivation to keep improving and adding new features! Thank you!

## Introduction

[`React Soybean`](https://github.com/mufeng889/react-soybean-admin) is a sleek, elegant, and powerful admin template built with the latest frontend technologies, including React 18, ReactRouter V6, Vite 5, TypeScript, Redux/toolkit, and UnoCSS. It comes with rich theme configuration and components, strict code conventions, and an automated file-based routing system. Additionally, it integrates an online Mock data solution based on ApiFox. `React Soybean` provides a comprehensive one-stop admin management solution, with zero configuration needed, ready to use right out of the box. It also serves as a best practice for learning cutting-edge technologies quickly.

## Versions

### React Version

- **React 18 Version:**
  - [Preview](https://github.com/mufeng889/react-soybean-admin/)
  - [Accelerated Access for China](https://react-soybean-admin.pages.dev/)
  - [GitHub Repo](https://github.com/mufeng889/react-soybean-admin)
  - [Gitee Repo](https://gitee.com/sjgk_dl/react-admin)

#### Documentation

- [Docs](https://react-soybean-docs.ohh-889.com/index-en?theme=dark)

### Vue Versions

- **NaiveUI Version:**
  - [Preview](https://naive.soybeanjs.cn/)
  - [GitHub Repo](https://github.com/soybeanjs/soybean-admin)
  - [Gitee Repo](https://gitee.com/honghuangdc/soybean-admin)

- **AntDesignVue Version:**
  - [Preview](https://antd.soybeanjs.cn/)
  - [GitHub Repo](https://github.com/soybeanjs/soybean-admin-antd)
  - [Gitee Repo](https://gitee.com/honghuangdc/soybean-admin-antd)

- **Legacy Version:**
  - [Preview](https://legacy.soybeanjs.cn/)
  - [GitHub Repo](https://github.com/soybeanjs/soybean-admin/tree/legacy)

## Features

- **Cutting-edge Tech Stack**: Built with the latest popular technologies, including React 18, ReactRouter V6, Vite 5, TypeScript, Redux/toolkit, and UnoCSS.
- **Clean Project Structure**: Uses a pnpm monorepo structure that is clear, elegant, and easy to understand.
- **Strict Code Conventions**: Adheres to the [SoybeanJS Guidelines](https://docs.soybeanjs.cn/zh/standard), integrating eslint, prettier, and simple-git-hooks to ensure code quality.
- **TypeScript**: With strict type checking and built-in hooks for type inference, only simple type definitions are needed to enjoy robust TypeScript type hints, greatly improving code maintainability.
- **Rich Theme Configuration**: Offers various built-in theme settings, perfectly integrated with UnoCSS.
- **Built-in Internationalization**: Easily implement multi-language support.
- **Enhanced Routing**: Extends the React-Router V6 API to offer a Vue-Router-like experience for flexible and efficient routing management.
- **Automated File-based Routing**: Convention-based routing with auto-generated imports, declarations, and types. For more details, check out [Elegant Router](https://github.com/mufeng889/react-auto-route).
- **Flexible Permission System**: Supports both frontend static routes and backend dynamic routes.
- **Comprehensive Page Components**: Includes built-in pages like 403, 404, 500, as well as layout components, tab components, theme configuration components, and more.
- **Command Line Tools**: Built-in efficient CLI tools for git commits, file deletion, publishing, and more.
- **Mobile Adaptability**: Fully supports mobile devices with responsive layouts.
- **User-friendly UI**: Automatically captures and displays errors with a friendly interface, helping users quickly locate and fix issues. It also supports in-component monitoring and reporting.

## Comprehensive Ant Design-style Documentation

- [Docs](https://react-soybean-docs.ohh-889.com/index-en?theme=dark)
![](https://ohh-1321526050.cos.ap-nanjing.myqcloud.com/docs-home.jpg)

## Sample Images

![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-01.png)
![](https://ohh-1321526050.cos.ap-nanjing.myqcloud.com/mobile.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-02.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-03.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-04.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-05.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-06.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-07.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-08.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-09.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-10.png)
![](https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/soybean-admin-v1-mobile.png)

## Usage

**Environment Setup**

Make sure your environment meets the following requirements:

- **git**: You'll need git to clone and manage the project version.
- **NodeJS**: >=18.12.0, recommended 18.19.0 or higher.
- **pnpm**: >= 8.7.0, recommended 8.14.0 or higher.

**Clone the Project**

```bash
git clone https://github.com/soybeanjs/soybean-admin.git
```

**Install Dependencies**

```bash
pnpm i
```

> Since this project uses pnpm monorepo management, please do not use npm or yarn to install dependencies.

**Start the Project**

```bash
pnpm dev
```

**Build the Project**

```bash
pnpm build
```

## How to Contribute

We warmly welcome and appreciate all forms of contribution. If you have any ideas or suggestions, feel free to submit a [pull request](https://github.com/mufeng889/react-soybean-admin/pulls) or create a GitHub [issue](https://github.com/mufeng889/react-soybean-admin/issues/new).

## Git Commit Guidelines

This project includes a `commit` command that allows you to generate commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/) standard. When submitting a PR, please use the `commit` command to create a commit message to ensure its compliance with our conventions.

## Browser Support

We recommend using the latest version of Chrome for the best development experience.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| --- |

 --- | --- | --- | --- |
| not supported | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Authors

[Ohh-889](https://github.com/mufeng889)

[Soybean](https://github.com/honghuangdc)

## Contributors

Thanks to the following contributors. If you wish to contribute to this project, please see [How to Contribute](#how-to-contribute).

<a href="https://github.com/mufeng889/react-soybean-admin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mufeng889/react-soybean-admin" />
</a>

## Community

`React Soybean` is a completely open-source and free project aimed at helping developers easily build medium to large-scale admin systems. We also offer WeChat and QQ groups for discussion and support. Feel free to ask questions within the groups.

  <div>
   <p>QQ Group</p>
    <img src="https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/qq-soybean-admin-3.jpg" style="width:200px" />
  </div>

 <div>
  <p>Add the following WeChat to be invited into the group</p>
  <img src="https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/wechat-soybeanjs.jpg" style="width:200px" />
 </div>

 <div>
  <p>Add the following WeChat to be invited into the group</p>
  <img src="https://ohh-1321526050.cos.ap-nanjing.myqcloud.com/ohh-889.jpg" style="width:200px" />
 </div>

## License

This project is licensed under the [MIT © 2021 Soybean](./LICENSE) license. It is intended for learning purposes only. For commercial use, please retain the author's copyright information. The author does not guarantee and assumes no responsibility for any risks arising from the use of the software.
```
