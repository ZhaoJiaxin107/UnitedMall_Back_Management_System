UnitedMall_Backend_Management_System

United Mall Backend Management System Using using Vue.js, Element UI and axios

### 如何启动项目

```
git clone
https://github.com/ZhaoJiaxin107/UnitedMall_Back_Management_System.git
```

**启动后台接口**

```
cd UMall_API
npm start
```



**启动前台项目**

```
cd UMall_Admin
npm run dev
```

### 主要实现功能

- 登录(管理员)

  - 如果跳转的页面不是登录页面，需要登录以后才能够访问

  - 判断用户是否拥有对应的权限，没有权限访问时自动跳转首页

  - 如果登录成功则存储到sessionStorage中

* 首页

  - 利用echarts展示图表数据

* 菜单管理(增删改查)

  - element ui对话框与表格组件

  - 目录与菜单相互切换

  - 添加表单验证

  - 获取上级菜单

* 角色管理(增删改查)

  - element ui 树形控件的使用

  - 不同角色对应不同的权限

* 管理员管理(增删改查)

  - 分页显示管理员数据

* 会员管理(增删改查)
* 商品分类(增删改查)

  - 获取一级分类

  - 图片上传

* 商品规格(增删改查)

  - 多次添加规格属性
  - 分页显示规格数据
  - 将添加的规格属性数组转化为字符串存储

* 商品管理(增删改查)

  - element ui 选项卡的使用
  - 一级分类与二级分类联动
  - 商品规格与规格属性的使用
  - 上传图片
  - 富文本编辑器的使用
  - 分页展示商品信息

- 秒杀活动(增删改查)

  - element ui组件日历组件

  - 一级分类、二级分类与商品信息三级联动

- 轮播图管理(增删改查)

### How to start a project

```
git clone
https://github.com/ZhaoJiaxin107/UnitedMall_ Back_ Management_ System.git
```

Start background api

```
cd UMall_ API
npm start
```

Start the frontend project

```
cd UMall_ Admin
npm run dev
```

### Main functions

- Login (administrator)
  - If the jump page is not a login page, you need to login before you can access it
  - Judge whether the user has the corresponding permissions, and automatically jump to the home page when there is no permission to access
  - If the login is successful, it will be stored in sessionstorage

* home page
  - Displaying chart data with ecarts
  - Menu management
  - Element UI dialog box and table component
  - Switching between directory and menu
  - Add form validation
  - Get superior menu

* Role management
  - The use of element UI tree control
  - Different roles correspond to different permissions

* Administrator management (add, delete, change and check)
  - Display administrator data in pages
* Member management (add, delete, change and check)
* Commodity classification
  - Get the first level classification
  - Picture upload
* Product Specification
  - Add specification attribute more than once
  - Display specification data by page
  - Convert the added specification attribute array to string storage
* Commodity management
  - Using element UI tab
  - Linkage between primary classification and secondary classification
  - Commodity specifications and the use of specification attributes
  - Upload pictures
  - The use of rich text editor
  - Display product information by page
* Second kill activity
  - Element UI component calendar component
  - Three level linkage of primary classification, secondary classification and commodity information
* Management of carousel map

