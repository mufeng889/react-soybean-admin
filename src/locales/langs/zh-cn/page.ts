const page: App.I18n.Schema['translation']['page'] = {
  login: {
    common: {
      loginOrRegister: '登录 / 注册',
      userNamePlaceholder: '请输入用户名',
      phonePlaceholder: '请输入手机号',
      codePlaceholder: '请输入验证码',
      passwordPlaceholder: '请输入密码',
      confirmPasswordPlaceholder: '请再次输入密码',
      codeLogin: '验证码登录',
      confirm: '确定',
      back: '返回',
      validateSuccess: '验证成功',
      loginSuccess: '登录成功',
      welcomeBack: '欢迎回来，{{userName}} ！'
    },
    pwdLogin: {
      title: '密码登录',
      rememberMe: '记住我',
      forgetPassword: '忘记密码？',
      register: '注册账号',
      otherAccountLogin: '其他账号登录',
      otherLoginMode: '其他登录方式',
      superAdmin: '超级管理员',
      admin: '管理员',
      user: '普通用户'
    },
    codeLogin: {
      title: '验证码登录',
      getCode: '获取验证码',
      reGetCode: '{{time}}秒后重新获取',
      sendCodeSuccess: '验证码发送成功',
      imageCodePlaceholder: '请输入图片验证码'
    },
    register: {
      title: '注册账号',
      agreement: '我已经仔细阅读并接受',
      protocol: '《用户协议》',
      policy: '《隐私权政策》'
    },
    resetPwd: {
      title: '重置密码'
    },
    bindWeChat: {
      title: '绑定微信'
    }
  },
  about: {
    title: '关于',
    introduction: `SoybeanAdmin 是一个优雅且功能强大的后台管理模板，基于最新的前端技术栈，包括 React18.3, Vite5, TypeScript,ReactRouter6.4,Redux/toolkit 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。此外，它还采用了基于 ApiFox 的在线Mock数据方案。SoybeanAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。`,
    projectInfo: {
      title: '项目信息',
      version: '版本',
      latestBuildTime: '最新构建时间',
      githubLink: 'Github 地址',
      previewLink: '预览地址'
    },
    prdDep: '生产依赖',
    devDep: '开发依赖'
  },
  home: {
    greeting: '早安，{{userName}}, 今天又是充满活力的一天!',
    weatherDesc: '今日多云转晴，20℃ - 25℃!',
    projectCount: '项目数',
    todo: '待办',
    message: '消息',
    downloadCount: '下载量',
    registerCount: '注册量',
    schedule: '作息安排',
    study: '学习',
    work: '工作',
    rest: '休息',
    entertainment: '娱乐',
    visitCount: '访问量',
    turnover: '成交额',
    dealCount: '成交量',
    projectNews: {
      title: '项目动态',
      moreNews: '更多动态',
      desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
      desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
      desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
      desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
      desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！'
    },
    creativity: '创意'
  },
  function: {
    tab: {
      tabOperate: {
        title: '标签页操作',
        addTab: '添加标签页',
        addTabDesc: '跳转到关于页面',
        closeTab: '关闭标签页',
        closeCurrentTab: '关闭当前标签页',
        closeAboutTab: '关闭"关于"标签页',
        addMultiTab: '添加多标签页',
        addMultiTabDesc1: '跳转到多标签页页面',
        addMultiTabDesc2: '跳转到多标签页页面(带有查询参数)'
      },
      tabTitle: {
        title: '标签页标题',
        changeTitle: '修改标题',
        change: '修改',
        resetTitle: '重置标题',
        reset: '重置'
      }
    },
    multiTab: {
      routeParam: '路由参数',
      backTab: '返回 function_tab'
    },
    toggleAuth: {
      toggleAccount: '切换账号',
      authHook: '权限钩子函数 `hasAuth`',
      superAdminVisible: '超级管理员可见',
      adminVisible: '管理员可见',
      adminOrUserVisible: '管理员和用户可见'
    },
    request: {
      repeatedErrorOccurOnce: '重复请求错误只出现一次',
      repeatedError: '重复请求错误',
      repeatedErrorMsg1: '自定义请求错误 1',
      repeatedErrorMsg2: '自定义请求错误 2'
    }
  },
  manage: {
    common: {
      status: {
        enable: '启用',
        disable: '禁用'
      }
    },
    role: {
      title: '角色列表',
      roleName: '角色名称',
      roleCode: '角色编码',
      roleStatus: '角色状态',
      roleDesc: '角色描述',
      menuAuth: '菜单权限',
      buttonAuth: '按钮权限',
      form: {
        roleName: '请输入角色名称',
        roleCode: '请输入角色编码',
        roleStatus: '请选择角色状态',
        roleDesc: '请输入角色描述'
      },
      addRole: '新增角色',
      editRole: '编辑角色'
    },
    user: {
      title: '用户列表',
      userName: '用户名',
      userGender: '性别',
      nickName: '昵称',
      userPhone: '手机号',
      userEmail: '邮箱',
      userStatus: '用户状态',
      userRole: '用户角色',
      form: {
        userName: '请输入用户名',
        userGender: '请选择性别',
        nickName: '请输入昵称',
        userPhone: '请输入手机号',
        userEmail: '请输入邮箱',
        userStatus: '请选择用户状态',
        userRole: '请选择用户角色'
      },
      addUser: '新增用户',
      editUser: '编辑用户',
      gender: {
        male: '男',
        female: '女'
      }
    },
    userDetail: {
      explain: '这个页面仅仅是为了展示 react-router-dom 的 loader 的强大能力，数据是随机的对不上很正常',
      content: `loader 会让网络请求跟懒加载的文件几乎一起发出请求 然后 一边解析懒加载的文件 一边去等待 网络请求
        待到网络请求完成页面 一起显示 配合react的fiber架构 可以做到 用户如果嫌弃等待时间较长 在等待期间用户可以去
        切换不同的页面 这是react 框架和react-router数据路由器的优势 而不用非得等到 页面的显现 而不是常规的
        请求懒加载的文件 - 解析 - 请求懒加载的文件 - 挂载之后去发出网络请求 - 然后渲染页面 - 渲染完成
        还要自己加loading效果`
    },
    menu: {
      home: '首页',
      title: '菜单列表',
      id: 'ID',
      parentId: '父级菜单ID',
      menuType: '菜单类型',
      menuName: '菜单名称',
      routeName: '路由名称',
      routePath: '路由路径',
      pathParam: '路径参数',
      layout: '布局',
      page: '页面组件',
      i18nKey: '国际化key',
      icon: '图标',
      localIcon: '本地图标',
      iconTypeTitle: '图标类型',
      order: '排序',
      constant: '常量路由',
      keepAlive: '缓存路由',
      href: '外链',
      hideInMenu: '隐藏菜单',
      activeMenu: '高亮的菜单',
      multiTab: '支持多页签',
      fixedIndexInTab: '固定在页签中的序号',
      query: '路由参数',
      button: '按钮',
      buttonCode: '按钮编码',
      buttonDesc: '按钮描述',
      menuStatus: '菜单状态',
      form: {
        home: '请选择首页',
        menuType: '请选择菜单类型',
        menuName: '请输入菜单名称',
        routeName: '请输入路由名称',
        routePath: '请输入路由路径',
        pathParam: '请输入路径参数',
        page: '请选择页面组件',
        layout: '请选择布局组件',
        i18nKey: '请输入国际化key',
        icon: '请输入图标',
        localIcon: '请选择本地图标',
        order: '请输入排序',
        keepAlive: '请选择是否缓存路由',
        href: '请输入外链',
        hideInMenu: '请选择是否隐藏菜单',
        activeMenu: '请选择高亮的菜单的路由名称',
        multiTab: '请选择是否支持多标签',
        fixedInTab: '请选择是否固定在页签中',
        fixedIndexInTab: '请输入固定在页签中的序号',
        queryKey: '请输入路由参数Key',
        queryValue: '请输入路由参数Value',
        button: '请选择是否按钮',
        buttonCode: '请输入按钮编码',
        buttonDesc: '请输入按钮描述',
        menuStatus: '请选择菜单状态'
      },
      addMenu: '新增菜单',
      editMenu: '编辑菜单',
      addChildMenu: '新增子菜单',
      type: {
        directory: '目录',
        menu: '菜单'
      },
      iconType: {
        iconify: 'iconify图标',
        local: '本地图标'
      }
    }
  }
};

export default page;
