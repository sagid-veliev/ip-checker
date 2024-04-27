<template>
  <div class="tablepage">
    <el-input
        v-model="search"
        placeholder="Поиск по таблице"
        :prefix-icon="Search"
    />
    <el-table
        :data="filteredTableData"
        stripe
        border
        :default-sort="{ prop: 'country', order: 'descending' }"
        @selection-change="handleSelectionChange"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @cell-click="cellClick"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="query" label="IP">
        <template v-if="showDeleteBtn" #header>
          <div class="custom-cell__flex">
            <span>IP</span>
            <el-button type="danger" size="small" @click="deleteTableData">Удалить выбранные</el-button>
          </div>
        </template>
        <template #default="scope">
          <div class="custom-cell__flex">
            <span>{{ scope.row.query }}</span>
            <img
                v-if="showSingleDelete[scope.row.query]"
                class="table-delete__icon"
                :src="TrashIcon"
                alt="delete"
                @click="deleteRow(scope.row)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="country" label="Country" sortable />
      <el-table-column prop="city" label="City/town" />
      <el-table-column style="margin: auto" width="35">
        <template #default="scope">
          <el-tooltip :content="icons[scope.row.status].text">
            <img :src="icons[scope.row.status].icon"/>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { useTableDataStore } from "@/stores/table.data";
import {onMounted, ref} from "vue";
import { debouncedWatch } from '@vueuse/core'
import TrashIcon from "@/assets/icons/Trash.svg"
import ResolveIcon from "@/assets/icons/Resolve.svg"
import RejectIcon from "@/assets/icons/Reject.svg"
import PendingIcon from "@/assets/icons/Pending.svg"
import { useQueryParams } from "@/utils/query.params";

const icons = {
  "success": {
    icon: ResolveIcon,
    text: "Успешно",
  },
  "fail": {
    icon: RejectIcon,
    text: "Не успешно",
  },
  "pending": {
    icon: PendingIcon,
    text: "В процессе",
  },
}

const { route, setQueryParams, queryParamsExist } = useQueryParams();
const { tableData }= useTableDataStore();

const search = ref<string>('');
const filteredTableData = ref<IResponseSuccess[]>(tableData);

const filterTableData = () => {
  filteredTableData.value = tableData.filter(row => {
    return Object.values(row).some(value =>
        value.toString().toLowerCase().includes(search.value.toLowerCase())
    );
  });
};

const deleteTableData = () => {
  const deletedIPs = selectedRows.value.map((deleted: IResponseSuccess) => deleted.query);
  filteredTableData.value = filteredTableData.value.filter((row: IResponseSuccess) => {
    return !deletedIPs.includes(row.query);
  });
}

const deleteRow = (scopedRow: IResponseSuccess) => {
  filteredTableData.value = filteredTableData.value.filter((row: IResponseSuccess) => {
    return row.query !== scopedRow.query;
  });
}

debouncedWatch(
    search,
    (search) => {
      filterTableData(search);
      setQueryParams(search);
    },
{ debounce: 400 },
)

const cellMouseEnter = (row: any, column: any, cell: HTMLTableCellElement) => {
  const cellChild = cell.querySelector('.custom-cell__flex');
  if (!cellChild.querySelector('.table-delete__icon')) {
    const copyIcon = document.createElement('div');
    copyIcon.classList.add('table-copy__icon');
    cellChild.appendChild(copyIcon);
  }
}

const cellMouseLeave = (row: any, column: any, cell: HTMLTableCellElement) => {
  const cellChild = cell.querySelector('.custom-cell__flex');
  const copyIcon = cellChild.querySelector('.table-copy__icon');
  cellChild.removeChild(copyIcon);
}

const cellClick = (row: any, column: any, cell: HTMLTableCellElement) => {
  navigator.clipboard.writeText(cell.innerText)
      .then(function() {
        console.log('Текст скопирован: ' + text);
        alert('Текст скопирован: ' + text);
      })
      .catch(function(err) {
        console.error('Ошибка копирования текста: ', err);
      });
}

const showDeleteBtn = ref<boolean>(false);
const selectedRows = ref<IResponseSuccess>([]);
const showSingleDelete = ref<{ [key: string]: string }>({})

const handleSelectionChange = (val) => {
  showSingleDelete.value = {};
  showDeleteBtn.value = val.length;
  showSingleDelete.value = val.reduce((acc, row) => {
    acc[row.query] = true;
    return acc;
  }, {});
  selectedRows.value = val;
}

onMounted(() => {
  if (queryParamsExist()) {
    search.value = route.query.search;
  }
});
</script>

<style lang="scss">
.tablepage {
  display: flex;
  width: 60%;
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
.custom-cell__flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table {
  &-delete__icon {
    cursor: pointer;
  }
  &-copy__icon {
    width: 12px;
    height: 13px;
    background: url("@/assets/icons/Copy.svg");
  }
}
</style>
