<template>
  <!-- el-dialog: 弹出对话框组件
       title: 对话框标题
       visible: 是否显示
   -->
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    @close="clearForm"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-suffix="："
      label-width="120px"
    >
      <el-form-item label="上级分类">
        <el-select v-model="form.pid" placeholder="请选择上级分类">
          <!-- 当value与v-model的值相等的时候就选中 -->
          <!-- value与v-model是全等比较 -->
          <el-option label="顶级分类" :value="0"></el-option>
          <!-- 循环一级分类 -->
          <!-- <el-option
            v-for="item of firstMenuList"
            :key="item.id"
            :label="' |- ' + item.title"
            :value="item.id"
          >
          </el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="title">
        <el-input
          v-model.trim="form.catename"
          autocomplete="off"
          placeholder="请输入分类名称"
        >
        </el-input>
      </el-form-item>
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
      <el-form-item label="状态">
        <!-- 开关组件
            active-value: Boolean | string | number 选中时的值
            inactive-value: Boolean | string | number 未选中时的值
        -->
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入接口方法
// 导出所有的非default内容
// import { addMenu, updateMenu } from '@/api/menu'
import * as model from '@/api/menu'
const defaultForm = {
  pid: 0, // 上级分类编号, 顶级菜单为0
  catename: '', // 分类的名称
  img: '', // 分类的图片
  status: 1 // 状态 1正常 2禁用
}
export default {
  data () {
    return {
      dialogFormVisible: true,
      title: '', // 对话框的标题
      form: { ...defaultForm },
      rules: {
        catename: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      imgLimit: 2,
      fileList: [], // 选择的文件列表
      dialogVisible: false, // 是否展示大图片
      dialogImageUrl: '', //  大图片的地址
      hideUploadBtn: false // 是否隐藏选择图片的按钮
    }
  },
  computed: {
    ...mapGetters({
      firstMenuList: 'menu/firstMenuList'
    })
  },
  methods: {
    // 上传图片
    uploadImg (file, fileList) {
      // console.log(file, fileList)
      // 当选择的文件的列表等于允许的最大数量时
      // 隐藏选择图片的按钮
      if (fileList.length === this.imgLimit) {
        this.hideUploadBtn = true
      }
      this.fileList = fileList
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
      console.log(file, this.fileList)
      // this.fileList = []
      // 从filelist中删除选择的图片
      this.fileList = this.fileList.filter(item =>
        item.url !== file.url)
      // 显示选择图片的按钮
      this.hideUploadBtn = false
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 根据form数据中是否有id属性来判断当前是修改菜单还是添加菜单
          if (this.form.id && this.form.id > 0) {
            // 修改
            this.editMenu('updateMenu')
          } else {
            // 添加
            this.editMenu()
          }
        }
      })
    },
    editMenu (method = 'addMenu') {
      // 处理菜单的添加,把表单的数据提交给接口
      model[method](this.form)
        .then(() => {
          // 添加成功
          // 显示添加成功的信息
          this.$message.success({
            message: method === 'addMenu' ? '添加成功' : '修改成功',
            // 关闭对话框
            onClose: () => {
              this.dialogFormVisible = false
            }
          })
          // 刷新列表数据
          this.$store.dispatch('menu/getMenuList')
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    clearForm () {
      // 把表单数据还原到初始值
      this.form = { ...defaultForm }
      // 清空所有的表单验证
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style>
/*
.upload /deep/ .el-upload
.upload >>> .el-upload (可能不通用)
让el-upload的样式变成全局的
*/
.upload /deep/ .el-upload {
  display:none !important
}
</style>
