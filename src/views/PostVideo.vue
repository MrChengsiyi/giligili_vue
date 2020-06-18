<template lang="html">
  <div class="PostVideo">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item  label="视频封面">
      <el-upload
          class="avatar-uploader"
          action=""
          ref="upload"
          :show-file-list="false"
          :http-request="fnUploadRequest"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>





<script>
import * as API from '../../api/video';
import uplpadAPI from '../../api/upload/';

export default {
  name: 'PostVideo',
  data() {
    return {
      imageUrl: '',
      form: {
        title: '',
        info: '',
        avatar： '',
      },
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    fnUploadRequest(option) {
      uplpadAPI(option.file.name).then((res) => {
        const oReq = new XMLHttpRequest();
        oReq.open('PUT', res.data.put, true);
        oReq.send(option.file);
        oReq.onload = () => {
          this.imageUrl = res.data.get;
          this.form.avatar = res.data.key;
        };
      }).catch((error) => {
        this.$notify.error({
          title: '网路错误，或者服务器宕机',
          message: error,
        });
      });
    },
    onSubmit() {
      // this.$notify({
      //   title:'csy',
      //   message:'csy',
      // });
      API.postVideo(this.form).then((res) => {
        if (res.status > 0) {
          this.$notify({
            title: '投稿失败',
            message: res.msg,
          });
        } else {
          this.$notify({
            title: '投稿成功',
            message: `您投稿的ID为${res.data.id}`,
            type: 'success',
          });
        }
      }).catch((error) => {
        this.$notify.error({
          title: '网络错误，或服务器宕机',
          message: error,
        });
      });
    },
  },
  components: {},
};
</script>
