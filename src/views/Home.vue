<template>
  <div class="home">
      <div class="">
        <el-row>
            <el-col :span="6" v-for="video in videos" :key="video.id">
              <el-card >
                <img class="video-avatar" :src="video.avatar" >
                <div >
                  <div>{{video.title}}</div>
                  <div class="info">{{video.info}}</div>
                </div>
              </el-card>
            </el-col>
        </el-row>
      </div>
  </div>
</template>

<style>
.video-avatar{
  width: 100%;
}

.info {
  color: #666;
  margin-top:5px;
}
</style>


<script>
import * as API from '../../api/video';

  export default {
    name:'home',
    data() {
      return {
        videos:[],
      };
    },
    methods: {
      load(){
        API.getVideos().then((res)=>{
          this.videos=res.data;
        });
      },
    },
    components:{
    },
    beforeMount(){
      this.load();
    },
  };
</script>
