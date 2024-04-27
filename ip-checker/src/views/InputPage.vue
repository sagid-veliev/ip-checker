<template>
  <div class="form">
    <el-input
        class="textarea"
        v-model="inputIp"
        :rows="8"
        :cols="15"
        type="textarea"
        placeholder="Введите IP адреса"
    />
    <el-button class="button" @click="submit">Отправить</el-button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import {useTableDataStore} from "@/stores/table.data";
import api from "@/axios/axios";

const router = useRouter();
const { setTableData, clearTableData } = useTableDataStore();
const inputIp = ref<string>('');

const submit = async () => {
  try {
    clearTableData();
    await fetchAllData();
    await router.push({ name: 'table' });
  } catch (e) {
    console.error(e);
  }
}

const fetchAllData = async () => {
  const splittedIpList = inputIp.value.split('\n');
  const promises = splittedIpList.map(fetchDataFromIP);
  return await Promise.all(promises);
}

const fetchDataFromIP = async (ip) => {
  try {
    const { data } = await api.get(`/json/${ip}`);
    if (data.status === 'fail') return;
    setTableData(data);
  } catch (e) {
    console.error(e);
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  width: 80%;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  margin: 40px auto;
}
.textarea {
  width: 620px;
  height: 200px;
}
.button {
  background: #F2F0F0;
  border-radius: 4px;
  padding: 12px 20px;
}
</style>
