<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import {useRoute} from 'vue-router'
import {ref} from 'vue'
import {Page, User} from '@/modules/type.d.ts'
import {searchUsers} from '@/plugins/request/userAPI.js'
import UserCardList from "@/components/UserCard.vue";
import {SearchUserParams} from "@/modules/requestParams.d.ts";

const route = useRoute()

const tags = route.query.tags

let userPage = ref<Page<User>>({
  records: [],
  total: 5,
  current: 1,
  size: 5,
})
// {
//   id: 0,
//   account: 'AdminPikachu',
//   nickname: '笨蛋皮卡丘',
//   avatarUrl: 'https://robohash.org/EL5.png?set=set4',
//   profile: '个人简介',
//   gender: false,
//   age: 20,
//   phone: '14157001678',
//   email: 'cmaclardie0@friendfeed.com',
//   status: 0,
//   createTime: new Date(),
//   isDelete: false,
//   role: 1,
//   tags: ["java", "C++", "python"],
// }
const userList = ref<User[]>([])
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)

const searchUserParams = ref<SearchUserParams>({
  current: userPage.value.current,
  size: userPage.value.size,
  tags: tags as string[]
})
const onLoad = () => {
  // 异步更新数据
  searchUsers(searchUserParams.value).then(res => {
    if (res.code !== 0) {
      return
    }
    userPage.value = res
    userList.value.push(...res.records)
    // 加载状态结束
    loading.value = false
    // 数据全部加载完成
    if (userPage.value.current >= Math.ceil(userPage.value.total / userPage.value.size)) {
      finished.value = true
    } else {
      searchUserParams.value.current++
    }
  }).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <TopBar :show-right="false"/>
  <van-empty v-if="!loading && userList.length === 0" description="查找结果为空"/>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="userList.length !== 0 ? '没有更多了': ''"
      @load="onLoad"
  >
    <UserCardList :user-list="userList"/>
    <template #loading>
      <van-loading color="#0094ff">
        加载中...
      </van-loading>
    </template>
  </van-list>
</template>

<style scoped>

</style>
