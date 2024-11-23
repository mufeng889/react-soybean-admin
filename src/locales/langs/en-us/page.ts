const page: App.I18n.Schema['translation']['page'] = {
  about: {
    devDep: 'Development Dependency',
    introduction: `SoybeanAdmin is an elegant and powerful admin template, based on the latest front-end technology stack, including React18.3, Vite5, TypeScript, ReactRouter6.4,Redux/toolkitand UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. SoybeanAdmin provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.`,
    prdDep: 'Production Dependency',
    projectInfo: {
      githubLink: 'Github Link',
      latestBuildTime: 'Latest Build Time',
      previewLink: 'Preview Link',
      title: 'Project Info',
      version: 'Version'
    },
    title: 'About'
  },
  function: {
    multiTab: {
      backTab: 'Back function_tab',
      routeParam: 'Route Param'
    },
    request: {
      repeatedError: 'Repeated Request Error',
      repeatedErrorMsg1: 'Custom Request Error 1',
      repeatedErrorMsg2: 'Custom Request Error 2',
      repeatedErrorOccurOnce: 'Repeated Request Error Occurs Once'
    },
    tab: {
      tabOperate: {
        addMultiTab: 'Add Multi Tab',
        addMultiTabDesc1: 'To MultiTab page',
        addMultiTabDesc2: 'To MultiTab page(with query params)',
        addTab: 'Add Tab',
        addTabDesc: 'To about page',
        closeAboutTab: 'Close "About" Tab',
        closeCurrentTab: 'Close Current Tab',
        closeTab: 'Close Tab',
        title: 'Tab Operation'
      },
      tabTitle: {
        change: 'Change',
        changeTitle: 'Change Title',
        reset: 'Reset',
        resetTitle: 'Reset Title',
        title: 'Tab Title'
      }
    },
    toggleAuth: {
      adminOrUserVisible: 'Admin and User Visible',
      adminVisible: 'Admin Visible',
      authHook: 'Auth Hook Function `hasAuth`',
      superAdminVisible: 'Super Admin Visible',
      toggleAccount: 'Toggle Account'
    }
  },
  home: {
    creativity: 'Creativity',
    dealCount: 'Deal Count',
    downloadCount: 'Download Count',
    entertainment: 'Entertainment',
    greeting: 'Good morning, {{userName}}, today is another day full of vitality!',
    message: 'Message',
    projectCount: 'Project Count',
    projectNews: {
      desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
      desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
      desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
      desc4: 'Soybean is busy writing project documentation for soybean-admin!',
      desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!',
      moreNews: 'More News',
      title: 'Project News'
    },
    registerCount: 'Register Count',
    rest: 'Rest',
    schedule: 'Work and rest Schedule',
    study: 'Study',
    todo: 'Todo',
    turnover: 'Turnover',
    visitCount: 'Visit Count',
    weatherDesc: 'Today is cloudy to clear, 20℃ - 25℃!',
    work: 'Work'
  },
  login: {
    bindWeChat: {
      title: 'Bind WeChat'
    },
    codeLogin: {
      getCode: 'Get verification code',
      imageCodePlaceholder: 'Please enter image verification code',
      reGetCode: 'Reacquire after {{time}}s',
      sendCodeSuccess: 'Verification code sent successfully',
      title: 'Verification Code Login'
    },
    common: {
      back: 'Back',
      codeLogin: 'Verification code login',
      codePlaceholder: 'Please enter verification code',
      confirm: 'Confirm',
      confirmPasswordPlaceholder: 'Please enter password again',
      loginOrRegister: 'Login / Register',
      loginSuccess: 'Login successfully',
      passwordPlaceholder: 'Please enter password',
      phonePlaceholder: 'Please enter phone number',
      userNamePlaceholder: 'Please enter user name',
      validateSuccess: 'Verification passed',
      welcomeBack: 'Welcome back, {{userName}} !'
    },
    pwdLogin: {
      admin: 'Admin',
      forgetPassword: 'Forget password?',
      otherAccountLogin: 'Other Account Login',
      otherLoginMode: 'Other Login Mode',
      register: 'Register',
      rememberMe: 'Remember me',
      superAdmin: 'Super Admin',
      title: 'Password Login',
      user: 'User'
    },
    register: {
      agreement: 'I have read and agree to',
      policy: '《Privacy Policy》',
      protocol: '《User Agreement》',
      title: 'Register'
    },
    resetPwd: {
      title: 'Reset Password'
    }
  },
  manage: {
    common: {
      status: {
        disable: 'Disable',
        enable: 'Enable'
      }
    },
    menu: {
      activeMenu: 'Active Menu',
      addChildMenu: 'Add Child Menu',
      addMenu: 'Add Menu',
      button: 'Button',
      buttonCode: 'Button Code',
      buttonDesc: 'Button Desc',
      constant: 'Constant',
      editMenu: 'Edit Menu',
      fixedIndexInTab: 'Fixed Index In Tab',
      form: {
        activeMenu: 'Please select route name of the highlighted menu',
        button: 'Please select whether it is a button',
        buttonCode: 'Please enter button code',
        buttonDesc: 'Please enter button description',
        fixedIndexInTab: 'Please enter the index fixed in the tab',
        fixedInTab: 'Please select whether to fix in the tab',
        hideInMenu: 'Please select whether to hide menu',
        home: 'Please select home',
        href: 'Please enter href',
        i18nKey: 'Please enter i18n key',
        icon: 'Please enter iconify name',
        keepAlive: 'Please select whether to cache route',
        layout: 'Please select layout component',
        localIcon: 'Please enter local icon name',
        menuName: 'Please enter menu name',
        menuStatus: 'Please select menu status',
        menuType: 'Please select menu type',
        multiTab: 'Please select whether to support multiple tabs',
        order: 'Please enter order',
        page: 'Please select page component',
        parent: 'Please select whether to parent menu',
        pathParam: 'Please enter path param',
        queryKey: 'Please enter route parameter Key',
        queryValue: 'Please enter route parameter Value',
        routeName: 'Please enter route name',
        routePath: 'Please enter route path'
      },
      hideInMenu: 'Hide In Menu',
      home: 'Home',
      href: 'Href',
      i18nKey: 'I18n Key',
      icon: 'Icon',
      iconType: {
        iconify: 'Iconify Icon',
        local: 'Local Icon'
      },
      iconTypeTitle: 'Icon Type',
      id: 'ID',
      keepAlive: 'Keep Alive',
      layout: 'Layout Component',
      localIcon: 'Local Icon',
      menuName: 'Menu Name',
      menuStatus: 'Menu Status',
      menuType: 'Menu Type',
      multiTab: 'Multi Tab',
      order: 'Order',
      page: 'Page Component',
      parent: 'Parent Menu',
      parentId: 'Parent ID',
      pathParam: 'Path Param',
      query: 'Query Params',
      routeName: 'Route Name',
      routePath: 'Route Path',
      title: 'Menu List',
      type: {
        directory: 'Directory',
        menu: 'Menu'
      }
    },
    role: {
      addRole: 'Add Role',
      buttonAuth: 'Button Auth',
      editRole: 'Edit Role',
      form: {
        roleCode: 'Please enter role code',
        roleDesc: 'Please enter role description',
        roleName: 'Please enter role name',
        roleStatus: 'Please select role status'
      },
      menuAuth: 'Menu Auth',
      roleCode: 'Role Code',
      roleDesc: 'Role Description',
      roleName: 'Role Name',
      roleStatus: 'Role Status',
      title: 'Role List'
    },
    user: {
      addUser: 'Add User',
      editUser: 'Edit User',
      form: {
        nickName: 'Please enter nick name',
        userEmail: 'Please enter email',
        userGender: 'Please select gender',
        userName: 'Please enter user name',
        userPhone: 'Please enter phone number',
        userRole: 'Please select user role',
        userStatus: 'Please select user status'
      },
      gender: {
        female: 'Female',
        male: 'Male'
      },
      nickName: 'Nick Name',
      title: 'User List',
      userEmail: 'Email',
      userGender: 'Gender',
      userName: 'User Name',
      userPhone: 'Phone Number',
      userRole: 'User Role',
      userStatus: 'User Status'
    },
    userDetail: {
      content: `The loader allows network requests and lazy-loaded files to be triggered almost simultaneously, enabling the lazy-loaded files to be parsed while waiting for the network request to complete. Once the network request finishes, the page is displayed all at once. Leveraging React's Fiber architecture, if users find the waiting time too long, they can switch to different pages during the wait. This is an advantage of the React framework and React Router's data loader, as it avoids the conventional sequence of: request lazy-loaded file -> parse -> mount -> send network request -> render page -> display, and eliminates the need for manually adding a loading effect.`,
      explain: `This page is solely for demonstrating the powerful capabilities of react-router-dom's loader. The data is random and may not match.`
    }
  }
};

export default page;
