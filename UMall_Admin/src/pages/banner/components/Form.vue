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
      <el-form-item label="标题" prop="title">
        <el-input
          v-model.trim="form.title"
          autocomplete="off"
          placeholder="请输入标题"
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
      <!-- 修改的时候且有图片时显示轮播图-->
      <el-form-item label="轮播图" v-if="form.id > 0 && editDefaultImg != ''">
        <el-image style="width:148px; height: 148px" fit = "fill" :src = "editDefaultImg | recombinationImg" />
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

const defaultForm = {
  title: '', // 轮播图名称
  img: '', // 轮播图图片
  status: 1 // 状态 1正常 2禁用
}
export default {
  data () {
    return {
      dialogFormVisible: true,
      title: '', // 对话框的标题,
      form: { ...defaultForm },
      rules: {
        title: [
          { required: true, message: '请输入标题名称', trigger: 'blur' }
        ]
      }
    }
  }
}

</script>

<style>
</style>
