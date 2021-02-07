<template>
  <!-- el-dialog: 弹出对话框组件
       title: 对话框标题
       visible: 是否显示
   -->
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    @close="clearForm"
    width="80%"
  >
    <el-form
      :model="form"
      ref="form"
      label-suffix="："
      label-width="120px"
    >
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-form-item label="一级分类">
          <el-select v-model = "form.first_cateid" placeholder="请选择一级分类"
          @change="onChangeCategory">
            <el-option label="请选择一级分类" :value="0"></el-option>
              <!-- 循环一级分类 -->
            <el-option
            v-for="item of firstCategoryList"
            :key = "item.id"
            :label ="' |- ' + item.catename"
            :value = "item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model = "form.second_cateid" placeholder="请选择二级分类">
            <el-option label="请选择二级分类" :value="0"></el-option>
              <!-- 循环一级分类 -->
            <el-option
            v-for="item of secondCategoryList"
            :key = "item.id"
            :label ="item.catename"
            :value = "item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
           <el-input v-model.trim="form.goodsname" autocomplete="off" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
           <el-input v-model.trim="form.price" autocomplete="off" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price">
           <el-input v-model.trim="form.market_price" autocomplete="off" placeholder="请输入市场价格"></el-input>
        </el-form-item>
         <el-form-item label="商品规格">
          <el-select v-model = "form.specsid" placeholder="请选择商品规格" @change="onChangeSpecs">
            <el-option label="请选择商品规格" :value="0"></el-option>
              <!-- 循环一级分类 -->
            <el-option
            v-for="item of specsList"
            :key = "item.id"
            :label ="item.specsname"
            :value = "item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性">
          <el-select v-model = "form.specsattr" placeholder="请选择规格属性">
            <el-option label="请选择规格属性" value=""></el-option>
              <!-- 循环一级分类 -->
            <el-option v-for="item of attrList" :key = "item" :label ="item"
            :value = "item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="图片信息" name="imageInfo">
        <el-form-item label="图片">
        <!-- 上传图片
            list-type:文件列表的类型 text/picture/picture-card
            auto-upload: 是否自动上传
            limit 允许上传的文件数量
            on-change 文件状态改变时的钩子, 添加文件、上传成功和上传失败时都会被调用
        -->
        <el-upload
          :class = "{upload: hideUploadBtn}"
          action="#"
          list-type="picture-card"
          :limit="imgLimit"
          :file-list="fileList"
          accept="image/png, image/gif, image/jpeg"
          :on-change="uploadImg"
          :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <!-- 预览的小图 -->
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <!-- 预览大图片的按钮 -->
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <!-- 删除图片的按钮 -->
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <!-- 展示大图片的对话框
             append-to-body: 是否挂载在body上
        -->
        <el-dialog :visible.sync="dialogVisible" :append-to-body = "true">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
       <!-- 修改的时候且有图片时显示分类图片-->
      <el-form-item label="商品图片" v-if="form.id > 0 && editDefaultImg != ''">
        <el-image style="width:148px; height: 148px" fit = "fill" :src = "editDefaultImg | recombinationImg" />
      </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="促销信息" name="promoteInfo">
        <el-form-item label="新品">
          <el-switch v-model="form.isnew" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
        <el-form-item label="热卖">
          <el-switch v-model="form.ishot" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="详细信息" name="detailInfo">
        <!-- 富文本
        id: 创建编辑器的唯一标识(必填) -->
        <vue-wangeditor
        id="editor"
        ref = "editor"
        :disabledMenus = "['location','insertcode','video']"
        width = "100%"
        height = "340"
        :value="form.description"
        >
        </vue-wangeditor>
      </el-tab-pane>
    </el-tabs>
     <el-form-item>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
     </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 引入富文本编辑器插件
import vueWangeditor from 'vue-wangeditor'
// 引入接口方法
import { mapGetters, mapState } from 'vuex'
// 导入规则
import goodsRules from '@/validate/goods'
// 导入公共方法
import { validate } from '@/utils/function'
// 导出所有的非default内容
import * as model from '@/api/goods'
const defaultForm = {
  first_cateid: 0, // 一级分类ID(required)
  second_cateid: 0, // 二级分类ID(required)
  goodsname: '', // 商品名称(required)
  price: '', // 商品价格(required)
  market_price: '', // 市场价格(required)
  img: '', // 商品图片(required)
  description: '', // 商品详情(required)
  specsid: 0, // 规格ID(required)
  specsattr: '', // 规格属性(required)
  isnew: 1, // 是否新品 1是 2不是
  ishot: 1, // 是否热卖推荐 1是 2不是
  status: 1 // 状态 1启用 2禁用
}
export default {
  components: {
    vueWangeditor
  },
  data () {
    return {
      dialogFormVisible: false,
      title: '', // 对话框的标题
      activeName: 'baseInfo', // 点击的tab选项卡
      form: { ...defaultForm },
      secondCategoryList: [], // 二级分类数据
      attrList: [], // 属性列表
      imgLimit: 1,
      fileList: [], // 选择的文件列表
      dialogVisible: false, // 是否展示大图片
      dialogImageUrl: '', //  大图片的地址
      hideUploadBtn: false, // 是否隐藏选择图片的按钮
      editDefaultImg: '' // 存储修改时传入的图片
    }
  },
  computed: {
    ...mapState({
      // 获取分类列表
      categoryList: state => state.category.list,
      // 获取商品规格
      specsList: state => state.specs.allList
    }),
    ...mapGetters({
      // 获取一级分类
      firstCategoryList: 'category/firstCategoryList'
    })
  },
  mounted () {
    // 如果没有一级分类信息, 则重新获取信息
    if (this.categoryList.length === 0) {
      this.$store.dispatch('category/getCategoryList')
    }
    this.$store.dispatch('specs/getAllSpecs')
  },
  methods: {
    // 切换一级分类时触发
    onChangeCategory (id) {
      // 清空表单的second_cateid
      this.form.second_cateid = 0
      // console.log(id, this.categoryList)
      // 如果id为0则清空二级分类
      // 如果id>0则获取当前分类的二级分类
      if (id > 0) {
        const category = this.categoryList.find(item => item.id === id)
        this.secondCategoryList = category.children || []
      } else {
        this.secondCategoryList = []
      }
    },
    // 切换规格属性时触发
    onChangeSpecs (id) {
      // 清空表单的规格属性数据
      this.form.specsattr = ''
      // console.log(id, this.categoryList)
      // 如果id为0则规格属性数据
      // 如果id>0则获取当前商品规格规格属性数据
      if (id > 0) {
        const specs = this.specsList.find(item => item.id === id)
        this.attrList = specs.attrs || []
      } else {
        this.attrList = []
      }
    },
    // 上传图片
    uploadImg (file, fileList) {
      // console.log(file, fileList)
      // 对大小和类型进行限制
      const allowType = ['image/png', 'image/gif', 'image/jpeg']
      if (!allowType.includes(file.raw.type)) {
        // 选择了不允许的类型
        this.$message.error('不是正确的图片格式')
        // 移除当前选择的文件, 即过滤出不是当前的图片地址的文件
        this.fileList = this.fileList.filter(item => item.url !== file.url)
        return
      }
      const allowMaxSize = 1024 * 1024
      if (file.size > allowMaxSize) {
        // 文件超过允许的大小
        this.$message.error('文件超过允许的大小')
        // 移除当前选择的文件, 即过滤出不是当前的图片地址的文件
        this.fileList = this.fileList.filter(item => item.url !== file.url)
        return
      }
      // 当选择的文件的列表等于允许的最大数量时
      // 隐藏选择图片的按钮
      if (fileList.length === this.imgLimit) {
        this.hideUploadBtn = true
      }
      this.fileList = fileList
      // 把文件的资源保存到表单数据中
      this.form.img = file.raw
    },
    // 图片预览(展示大图)
    handlePictureCardPreview (file) {
      // console.log(file)
      // 把file的链接赋值给大图片的src
      this.dialogImageUrl = file.url
      // 显示大图的对话框
      this.dialogVisible = true
    },
    handleRemove (file) {
      // console.log(file, this.fileList)
      // this.fileList = []
      // 从filelist中删除选择的图片
      this.fileList = this.fileList.filter(item => item.url !== file.url)
      // 显示选择图片的按钮
      this.hideUploadBtn = false
      // 如果是添加清空表单的图片数据, 如果是修改要还原修改之前的数据
      this.form.img = this.editDefaultImg
    },
    onSubmit () {
      // 获取富文本编辑器中的数据
      // console.log(this.$refs.editor.getHtml())
      // 把富文本中的纯文本添加到this.form中
      this.form.description = this.$refs.editor.getText()
      const valid = validate(this.form, goodsRules)
      if (valid !== true) {
        this.$message.error(valid)
        return
      }
      // 验证通过之后才处理数据
      // 根据form数据中是否有id属性来判断当前是修改菜单还是添加菜单
      if (this.form.id && this.form.id > 0) {
        // 修改
        this.editGoods('updateGoods')
      } else {
        // 添加
        this.editGoods()
      }
    },
    editGoods (method = 'addGoods') {
      // 如果是修改，删除数据中多余的属性 secondcatename，firstcatename
      if (this.form.id > 0) {
        Reflect.deleteProperty(this.form, 'secondcatename') // delete this.form.secondcatename
        Reflect.deleteProperty(this.form, 'firstcatename')
      }
      // 把富文本中的内容(包含html)添加到this.form中
      this.form.description = this.$refs.editor.getText()
      // 有文件的上传, 必须使用FormData()
      const data = new FormData()
      for (const k in this.form) {
        data.append(k, this.form[k])
      }
      // 处理菜单的添加,把表单的数据提交给接口
      model[method](data)
        .then(() => {
          // 添加成功
          // 显示添加成功的信息
          this.$message.success({
            message: method === 'addGoods' ? '添加成功' : '修改成功',
            // 关闭对话框
            onClose: () => {
              this.dialogFormVisible = false
            }
          })
          // 添加时重新获取总数量
          if (method === 'addGoods') {
            this.$store.dispatch('goods/getGoodsTotal')
          }
          // 刷新列表数据
          this.$store.dispatch('goods/getGoodsList')
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    clearForm () {
      // 把表单数据还原到初始值
      this.form = { ...defaultForm }
      // 清空富文本编辑器数据
      this.$refs.editor.clear()
      // 还原选项卡
      this.activeName = 'baseInfo'
      // 还原上传组件的数据
      this.hideUploadBtn = false
      this.editDefaultImg = ''
      this.fileList = []
    },
    // 修改时设置表单数据
    setFormData (data) {
      // console.log(data)
      // 根据商品的一级分类设置二级分类的数据
      const category = this.categoryList.find(item => item.id === data.first_cateid)
      this.secondCategoryList = category.children || []
      // 保存商品的图片
      this.editDefaultImg = data.img
      this.form = {...data} // 复制一份数据
      // 设置编辑器内容
      this.$refs.editor.setHtml(data.description)
    }
  }
}
</script>

<style scoped>
.upload /deep/ .el-upload {
  display:none !important
}
.wangEditor-txt{
  height: 280px !important
}
</style>
