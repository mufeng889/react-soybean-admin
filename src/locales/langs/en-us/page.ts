const page: App.I18n.Schema['translation']['page'] = {
  login: {
    common: {
      loginOrRegister: 'Login / Register',
      userNamePlaceholder: 'Please enter user name',
      phonePlaceholder: 'Please enter phone number',
      codePlaceholder: 'Please enter verification code',
      passwordPlaceholder: 'Please enter password',
      confirmPasswordPlaceholder: 'Please enter password again',
      codeLogin: 'Verification code login',
      confirm: 'Confirm',
      back: 'Back',
      validateSuccess: 'Verification passed',
      loginSuccess: 'Login successfully',
      welcomeBack: 'Welcome back, {{userName}} !'
    },
    pwdLogin: {
      title: 'Password Login',
      rememberMe: 'Remember me',
      forgetPassword: 'Forget password?',
      register: 'Register',
      otherAccountLogin: 'Other Account Login',
      otherLoginMode: 'Other Login Mode',
      superAdmin: 'Super Admin',
      admin: 'Admin',
      user: 'User'
    },
    codeLogin: {
      title: 'Verification Code Login',
      getCode: 'Get verification code',
      reGetCode: 'Reacquire after {{time}}s',
      sendCodeSuccess: 'Verification code sent successfully',
      imageCodePlaceholder: 'Please enter image verification code'
    },
    register: {
      title: 'Register',
      agreement: 'I have read and agree to',
      protocol: '《User Agreement》',
      policy: '《Privacy Policy》'
    },
    resetPwd: {
      title: 'Reset Password'
    },
    bindWeChat: {
      title: 'Bind WeChat'
    }
  },
  about: {
    title: 'About',
    introduction: `SoybeanAdmin is an elegant and powerful admin template, based on the latest front-end technology stack, including React18.3, Vite5, TypeScript, ReactRouter6.4,Redux/toolkitand UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. SoybeanAdmin provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.`,
    projectInfo: {
      title: 'Project Info',
      version: 'Version',
      latestBuildTime: 'Latest Build Time',
      githubLink: 'Github Link',
      previewLink: 'Preview Link'
    },
    prdDep: 'Production Dependency',
    devDep: 'Development Dependency'
  },
  home: {
    greeting: 'Good morning, {{userName}}, today is another day full of vitality!',
    weatherDesc: 'Today is cloudy to clear, 20℃ - 25℃!',
    projectCount: 'Project Count',
    todo: 'Todo',
    message: 'Message',
    downloadCount: 'Download Count',
    registerCount: 'Register Count',
    schedule: 'Work and rest Schedule',
    study: 'Study',
    work: 'Work',
    rest: 'Rest',
    entertainment: 'Entertainment',
    visitCount: 'Visit Count',
    turnover: 'Turnover',
    dealCount: 'Deal Count',
    projectNews: {
      title: 'Project News',
      moreNews: 'More News',
      desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
      desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
      desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
      desc4: 'Soybean is busy writing project documentation for soybean-admin!',
      desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!'
    },
    creativity: 'Creativity'
  },
  function: {
    tab: {
      tabOperate: {
        title: 'Tab Operation',
        addTab: 'Add Tab',
        addTabDesc: 'To about page',
        closeTab: 'Close Tab',
        closeCurrentTab: 'Close Current Tab',
        closeAboutTab: 'Close "About" Tab',
        addMultiTab: 'Add Multi Tab',
        addMultiTabDesc1: 'To MultiTab page',
        addMultiTabDesc2: 'To MultiTab page(with query params)'
      },
      tabTitle: {
        title: 'Tab Title',
        changeTitle: 'Change Title',
        change: 'Change',
        resetTitle: 'Reset Title',
        reset: 'Reset'
      }
    },
    multiTab: {
      routeParam: 'Route Param',
      backTab: 'Back function_tab'
    },
    toggleAuth: {
      toggleAccount: 'Toggle Account',
      authHook: 'Auth Hook Function `hasAuth`',
      superAdminVisible: 'Super Admin Visible',
      adminVisible: 'Admin Visible',
      adminOrUserVisible: 'Admin and User Visible'
    },
    request: {
      repeatedErrorOccurOnce: 'Repeated Request Error Occurs Once',
      repeatedError: 'Repeated Request Error',
      repeatedErrorMsg1: 'Custom Request Error 1',
      repeatedErrorMsg2: 'Custom Request Error 2'
    }
  },
  manage: {
    common: {
      status: {
        enable: 'Enable',
        disable: 'Disable'
      }
    },
    role: {
      title: 'Role List',
      roleName: 'Role Name',
      roleCode: 'Role Code',
      roleStatus: 'Role Status',
      roleDesc: 'Role Description',
      menuAuth: 'Menu Auth',
      buttonAuth: 'Button Auth',
      form: {
        roleName: 'Please enter role name',
        roleCode: 'Please enter role code',
        roleStatus: 'Please select role status',
        roleDesc: 'Please enter role description'
      },
      addRole: 'Add Role',
      editRole: 'Edit Role'
    },
    user: {
      title: 'User List',
      userName: 'User Name',
      userGender: 'Gender',
      nickName: 'Nick Name',
      userPhone: 'Phone Number',
      userEmail: 'Email',
      userStatus: 'User Status',
      userRole: 'User Role',
      form: {
        userName: 'Please enter user name',
        userGender: 'Please select gender',
        nickName: 'Please enter nick name',
        userPhone: 'Please enter phone number',
        userEmail: 'Please enter email',
        userStatus: 'Please select user status',
        userRole: 'Please select user role'
      },
      addUser: 'Add User',
      editUser: 'Edit User',
      gender: {
        male: 'Male',
        female: 'Female'
      }
    },
    menu: {
      home: 'Home',
      title: 'Menu List',
      id: 'ID',
      parentId: 'Parent ID',
      menuType: 'Menu Type',
      menuName: 'Menu Name',
      routeName: 'Route Name',
      routePath: 'Route Path',
      pathParam: 'Path Param',
      layout: 'Layout Component',
      page: 'Page Component',
      i18nKey: 'I18n Key',
      icon: 'Icon',
      localIcon: 'Local Icon',
      iconTypeTitle: 'Icon Type',
      order: 'Order',
      constant: 'Constant',
      keepAlive: 'Keep Alive',
      href: 'Href',
      hideInMenu: 'Hide In Menu',
      activeMenu: 'Active Menu',
      multiTab: 'Multi Tab',
      fixedIndexInTab: 'Fixed Index In Tab',
      query: 'Query Params',
      button: 'Button',
      buttonCode: 'Button Code',
      buttonDesc: 'Button Desc',
      menuStatus: 'Menu Status',
      form: {
        home: 'Please select home',
        menuType: 'Please select menu type',
        menuName: 'Please enter menu name',
        routeName: 'Please enter route name',
        routePath: 'Please enter route path',
        pathParam: 'Please enter path param',
        page: 'Please select page component',
        layout: 'Please select layout component',
        i18nKey: 'Please enter i18n key',
        icon: 'Please enter iconify name',
        localIcon: 'Please enter local icon name',
        order: 'Please enter order',
        keepAlive: 'Please select whether to cache route',
        href: 'Please enter href',
        hideInMenu: 'Please select whether to hide menu',
        activeMenu: 'Please select route name of the highlighted menu',
        multiTab: 'Please select whether to support multiple tabs',
        fixedInTab: 'Please select whether to fix in the tab',
        fixedIndexInTab: 'Please enter the index fixed in the tab',
        queryKey: 'Please enter route parameter Key',
        queryValue: 'Please enter route parameter Value',
        button: 'Please select whether it is a button',
        buttonCode: 'Please enter button code',
        buttonDesc: 'Please enter button description',
        menuStatus: 'Please select menu status'
      },
      addMenu: 'Add Menu',
      editMenu: 'Edit Menu',
      addChildMenu: 'Add Child Menu',
      type: {
        directory: 'Directory',
        menu: 'Menu'
      },
      iconType: {
        iconify: 'Iconify Icon',
        local: 'Local Icon'
      }
    },
    userDetail: {
      explain: `This page is solely for demonstrating the powerful capabilities of react-router-dom's loader. The data is random and may not match.`,
      content: `The loader allows network requests and lazy-loaded files to be triggered almost simultaneously, enabling the lazy-loaded files to be parsed while waiting for the network request to complete. Once the network request finishes, the page is displayed all at once. Leveraging React's Fiber architecture, if users find the waiting time too long, they can switch to different pages during the wait. This is an advantage of the React framework and React Router's data loader, as it avoids the conventional sequence of: request lazy-loaded file -> parse -> mount -> send network request -> render page -> display, and eliminates the need for manually adding a loading effect.`
    }
  }
};

export default page;
