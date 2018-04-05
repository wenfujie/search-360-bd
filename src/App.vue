<template>
  <div id="app">
    <div class="search-com">
      <el-autocomplete
        class="inline-input"
        v-model="value"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        select-when-unmatched
        @select="handleSelect"
        @keyup="handleSelect({value:value})"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="(item,index) in searchTypeData"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"  @click="handleSelect({value:value})"></el-button>
      </el-autocomplete>
      <div class="search-com__logo"><img :src="searchTypeData[select-1].logoAdress" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      value:"",
      select:2,
      searchTypeData: [{
        id:1,
        name: '360搜索',
        logoAdress: require('./assets/img/360_logo.png'),
        searchSrc: 'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='
      }, {
        id:2,
        name: '百度搜索',
        logoAdress: require('./assets/img/baidu_logo.png'),
        searchSrc: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='
      }, {
        id:3,
        name: '搜狗搜索',
        logoAdress: require('./assets/img/sougou_logo.png'),
        searchSrc: 'https://www.sogou.com/web?query='
      }]
    }
  },
  computed:{
    activeLogo(){
      return "./assets/img/baidu_logo.png";
    },
  },
  methods:{
    // 获取input提示数据
    querySearch(queryString, cb) {
      // 利用vue-source访问借口
      this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + queryString + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
        // 调用 callback 返回建议列表的数据
        let queryArr = [];
        for(let key in res.data.s){
          queryArr.push({value:res.data.s[key]});
        }
        cb(queryArr);
      });
    },
    // 查询
    handleSelect(item) {
      if(item && item.value){
        window.open(this.searchTypeData[this.select-1].searchSrc+item.value);
      }
    }
  }
}
</script>
<style lang="scss" src="./assets/css/App.scss"></style>
