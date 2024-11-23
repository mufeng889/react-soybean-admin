const page: App.I18n.Schema['translation']['page'] = {
  about: {
    devDep: '开发依赖',
    introduction: `SoybeanAdmin 是一个优雅且功能强大的后台管理模板，基于最新的前端技术栈，包括 React18.3, Vite5, TypeScript,ReactRouter6.4,Redux/toolkit 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。此外，它还采用了基于 ApiFox 的在线Mock数据方案。SoybeanAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。`,
    prdDep: '生产依赖',
    projectInfo: {
      githubLink: 'Github 地址',
      latestBuildTime: '最新构建时间',
      previewLink: '预览地址',
      title: '项目信息',
      version: '版本'
    },
    title: '关于'
  },
  function: {
    multiTab: {
      backTab: '返回 function_tab',
      routeParam: '路由参数'
    },
    request: {
      repeatedError: '重复请求错误',
      repeatedErrorMsg1: '自定义请求错误 1',
      repeatedErrorMsg2: '自定义请求错误 2',
      repeatedErrorOccurOnce: '重复请求错误只出现一次'
    },
    tab: {
      tabOperate: {
        addMultiTab: '添加多标签页',
        addMultiTabDesc1: '跳转到多标签页页面',
        addMultiTabDesc2: '跳转到多标签页页面(带有查询参数)',
        addTab: '添加标签页',
        addTabDesc: '跳转到关于页面',
        closeAboutTab: '关闭"关于"标签页',
        closeCurrentTab: '关闭当前标签页',
        closeTab: '关闭标签页',
        title: '标签页操作'
      },
      tabTitle: {
        change: '修改',
        changeTitle: '修改标题',
        reset: '重置',
        resetTitle: '重置标题',
        title: '标签页标题'
      }
    },
    toggleAuth: {
      adminOrUserVisible: '管理员和用户可见',
      adminVisible: '管理员可见',
      authHook: '权限钩子函数 `hasAuth`',
      superAdminVisible: '超级管理员可见',
      toggleAccount: '切换账号'
    }
  },
  home: {
    creativity: '创意',
    dealCount: '成交量',
    downloadCount: '下载量',
    entertainment: '娱乐',
    greeting: '早安，{{userName}}, 今天又是充满活力的一天!',
    message: '消息',
    projectCount: '项目数',
    projectNews: {
      desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
      desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
      desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
      desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
      desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！',
      moreNews: '更多动态',
      title: '项目动态'
    },
    registerCount: '注册量',
    rest: '休息',
    schedule: '作息安排',
    study: '学习',
    todo: '待办',
    turnover: '成交额',
    visitCount: '访问量',
    weatherDesc: '今日多云转晴，20℃ - 25℃!',
    work: '工作'
  },
  login: {
    bindWeChat: {
      title: '绑定微信'
    },
    codeLogin: {
      getCode: '获取验证码',
      imageCodePlaceholder: '请输入图片验证码',
      reGetCode: '{{time}}秒后重新获取',
      sendCodeSuccess: '验证码发送成功',
      title: '验证码登录'
    },
    common: {
      back: '返回',
      codeLogin: '验证码登录',
      codePlaceholder: '请输入验证码',
      confirm: '确定',
      confirmPasswordPlaceholder: '请再次输入密码',
      loginOrRegister: '登录 / 注册',
      loginSuccess: '登录成功',
      passwordPlaceholder: '请输入密码',
      phonePlaceholder: '请输入手机号',
      userNamePlaceholder: '请输入用户名',
      validateSuccess: '验证成功',
      welcomeBack: '欢迎回来，{{userName}} ！'
    },
    pwdLogin: {
      admin: '管理员',
      forgetPassword: '忘记密码？',
      otherAccountLogin: '其他账号登录',
      otherLoginMode: '其他登录方式',
      register: '注册账号',
      rememberMe: '记住我',
      superAdmin: '超级管理员',
      title: '密码登录',
      user: '普通用户'
    },
    register: {
      agreement: '我已经仔细阅读并接受',
      policy: '《隐私权政策》',
      protocol: '《用户协议》',
      title: '注册账号'
    },
    resetPwd: {
      title: '重置密码'
    }
  },
  manage: {
    common: {
      status: {
        disable: '禁用',
        enable: '启用'
      }
    },
    menu: {
      activeMenu: '高亮的菜单',
      addChildMenu: '新增子菜单',
      addMenu: '新增菜单',
      button: '按钮',
      buttonCode: '按钮编码',
      buttonDesc: '按钮描述',
      constant: '常量路由',
      editMenu: '编辑菜单',
      fixedIndexInTab: '固定在页签中的序号',
      form: {
        activeMenu: '请选择高亮的菜单的路由名称',
        button: '请选择是否按钮',
        buttonCode: '请输入按钮编码',
        buttonDesc: '请输入按钮描述',
        fixedIndexInTab: '请输入固定在页签中的序号',
        fixedInTab: '请选择是否固定在页签中',
        hideInMenu: '请选择是否隐藏菜单',
        home: '请选择首页',
        href: '请输入外链',
        i18nKey: '请输入国际化key',
        icon: '请输入图标',
        keepAlive: '请选择是否缓存路由',
        layout: '请选择布局组件',
        localIcon: '请选择本地图标',
        menuName: '请输入菜单名称',
        menuStatus: '请选择菜单状态',
        menuType: '请选择菜单类型',
        multiTab: '请选择是否支持多标签',
        order: '请输入排序',
        page: '请选择页面组件',
        parent: '请选择父级菜单',
        pathParam: '请输入路径参数',
        queryKey: '请输入路由参数Key',
        queryValue: '请输入路由参数Value',
        routeName: '请输入路由名称',
        routePath: '请输入路由路径'
      },
      hideInMenu: '隐藏菜单',
      home: '首页',
      href: '外链',
      i18nKey: '国际化key',
      icon: '图标',
      iconType: {
        iconify: 'iconify图标',
        local: '本地图标'
      },
      iconTypeTitle: '图标类型',
      id: 'ID',
      keepAlive: '缓存路由',
      layout: '布局',
      localIcon: '本地图标',
      menuName: '菜单名称',
      menuStatus: '菜单状态',
      menuType: '菜单类型',
      multiTab: '支持多页签',
      order: '排序',
      page: '页面组件',
      parent: '父级菜单',
      parentId: '父级菜单ID',
      pathParam: '路径参数',
      query: '路由参数',
      routeName: '路由名称',
      routePath: '路由路径',
      title: '菜单列表',
      type: {
        directory: '目录',
        menu: '菜单'
      }
    },
    role: {
      addRole: '新增角色',
      buttonAuth: '按钮权限',
      editRole: '编辑角色',
      form: {
        roleCode: '请输入角色编码',
        roleDesc: '请输入角色描述',
        roleName: '请输入角色名称',
        roleStatus: '请选择角色状态'
      },
      menuAuth: '菜单权限',
      roleCode: '角色编码',
      roleDesc: '角色描述',
      roleName: '角色名称',
      roleStatus: '角色状态',
      title: '角色列表'
    },
    user: {
      addUser: '新增用户',
      editUser: '编辑用户',
      form: {
        nickName: '请输入昵称',
        userEmail: '请输入邮箱',
        userGender: '请选择性别',
        userName: '请输入用户名',
        userPhone: '请输入手机号',
        userRole: '请选择用户角色',
        userStatus: '请选择用户状态'
      },
      gender: {
        female: '女',
        male: '男'
      },
      nickName: '昵称',
      title: '用户列表',
      userEmail: '邮箱',
      userGender: '性别',
      userName: '用户名',
      userPhone: '手机号',
      userRole: '用户角色',
      userStatus: '用户状态'
    },
    userDetail: {
      content: `loader 会让网络请求跟懒加载的文件几乎一起发出请求 然后 一边解析懒加载的文件 一边去等待 网络请求
        待到网络请求完成页面 一起显示 配合react的fiber架构 可以做到 用户如果嫌弃等待时间较长 在等待期间用户可以去
        切换不同的页面 这是react 框架和react-router数据路由器的优势 而不用非得等到 页面的显现 而不是常规的
        请求懒加载的文件 - 解析 - 请求懒加载的文件 - 挂载之后去发出网络请求 - 然后渲染页面 - 渲染完成
        还要自己加loading效果`,
      explain: '这个页面仅仅是为了展示 react-router-dom 的 loader 的强大能力，数据是随机的对不上很正常'
    }
  }
};

export default page;
