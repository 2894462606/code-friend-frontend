<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import {ref} from "vue";
import {Page, User} from "@/modules/type";
import {searchUsers} from "@/plugins/request/userAPI.ts";
import UserCardList from "@/components/UserCard.vue";
import {SearchUserParams} from "@/modules/requestParams";
import {useRouter} from "vue-router";

const router = useRouter()

let userPage = ref<Page<User>>({
  records: [],
  total: 5,
  current: 1,
  size: 5,
})
const userList = ref<User[]>([])
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)

const searchUserParams = ref<SearchUserParams>({
  current: 1,
  size: 5
})
const onLoad = () => {
  // 异步更新数据
  searchUsers(searchUserParams.value).then(res => {
    if (res.code !== 0) {
      return
    }
    userPage.value = res.data
    userList.value.push(...userPage.value.records)
    // 加载状态结束
    loading.value = false
    // 数据是否全部加载完成
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
  <TopBar :show-left="false">
    <template #right>
      <van-icon name="search" size="18" @click="router.push('/user/search')"/>
    </template>
  </TopBar>
  <van-empty v-if="!loading && userList.length === 0" description="结果为空"/>
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
