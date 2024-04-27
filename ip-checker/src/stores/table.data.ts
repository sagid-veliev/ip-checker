import {computed, ref} from 'vue'
import { defineStore } from 'pinia'

export const useTableDataStore = defineStore('tableData', () => {
  const tableData = ref<IResponseSuccess>([]);
  const setTableData = (data: IResponseSuccess[]) => {
    tableData.value.push(data);
  }
  const clearTableData = () => {
    tableData.value = [];
  }
  return { tableData, setTableData, clearTableData }
})
