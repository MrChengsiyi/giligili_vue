import axios from 'axios'
// import Vue from 'vue'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

const postVideo = form => axios.post('/api/v1/videos', form).then(res => res.data);
const getVideos =() => axios.get('/api/v1/videos').then(res=>res.data);

export {
  // body...
  postVideo,
  getVideos,
};
