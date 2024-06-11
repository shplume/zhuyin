<template>
  <div class="container">
    <Breadcrumb :items="['menu.thesisManage', 'menu.thesisManage.inquiry']" />
    <a-card class="general-card" :title="'论文查询'">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="title" :label="'论文题目'">
                  <a-input
                    v-model="formModel.title"
                    :placeholder="'请输入论文题目或论文英文题目'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="'姓名'">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="'请输入学生姓名'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="number" :label="'学号'">
                  <a-input
                    v-model="formModel.number"
                    :placeholder="'请输入学生学号'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="college" :label="'专业'">
                  <a-input
                    v-model="formModel.college"
                    :placeholder="'请输入学生所在专业'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="uploadTime" :label="'上传日期'">
                  <a-range-picker
                    v-model="formModel.uploadTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="fileState" :label="'状态'">
                  <a-select
                    v-model="formModel.fileState"
                    :options="statusOptions"
                    :placeholder="'全部'"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>

        <a-divider style="height: 84px" direction="vertical" />

        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>

      <a-divider style="margin-top: 0" />

      <a-row style="margin-bottom: 16px">
        <a-col :span="12"> </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button type="primary" style="margin-right: 8px">打包下载</a-button>
          <a-dropdown-button type="primary" @click="submitConfirm">
            <icon-send style="margin-right: 8px" />
            送审
            <template #content>
              <a-doption @click="submitRandom">
                <icon-relation style="margin-right: 8px" />
                随机送审
              </a-doption>
            </template>
          </a-dropdown-button>

          <a-tooltip :content="'刷新'">
            <div class="action-icon" @click="fetchData">
              <icon-refresh size="18" :spin="loading" />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="'密度'">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="'列设置'">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>

      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :row-selection="rowSelection"
        :data="renderData"
        :bordered="false"
        :size="size"
        :selected-keys="selectIds"
        @page-change="
          (e) => {
            pagination.current = e;
          }
        "
        @select="
          (rowKeys, _, record) => {
            selectIds = rowKeys;
            record.select = !record.select;
          }
        "
        @selection-change="
          (rowKeys) => {
            selectIds = rowKeys;
          }
        "
      >
        <template #columns>
          <a-table-column :title="'学号'" data-index="number">
            <template #cell="{ record }">
              {{ record.number }}
            </template>
          </a-table-column>
          <a-table-column :title="'姓名'" data-index="name">
            <template #cell="{ record }">
              {{ record.name }}
            </template>
          </a-table-column>
          <a-table-column :title="'院系'" data-index="college">
            <template #cell="{ record }">
              {{ record.college }}
            </template>
          </a-table-column>
          <a-table-column :title="'论文题目'" data-index="chineseTitle">
            <template #cell="{ record }">
              {{ record.chineseTitle }}
            </template>
          </a-table-column>
          <a-table-column :title="'论文英文题目'" data-index="englishTitle">
            <template #cell="{ record }">
              {{ record.englishTitle }}
            </template>
          </a-table-column>
          <a-table-column :title="'上传日期'" data-index="uploadTime">
            <template #cell="{ record }">
              {{ dayjs(record.time).format('YYYY-MM-DD HH:mm') }}
            </template>
          </a-table-column>
          <a-table-column :title="'状态'" data-index="fileState">
            <template #cell="{ record }">
              <p v-if="record.fileState === 1">
                <span>待上传</span>
              </p>
              <p v-if="record.fileState === 2">
                <span>待评审</span>
              </p>
              <p v-if="record.fileState === 3">
                <span>评审中</span>
              </p>
              <p v-if="record.fileState === 4">
                <span>评审完成</span>
              </p>
              <p v-if="record.fileState === 5">
                <span>打回</span>
              </p>
              <p v-if="record.fileState === 6">
                <span>弃用</span>
              </p>
            </template>
          </a-table-column>
          <a-table-column :title="'操作'" data-index="operate">
            <template #cell="{ record }">
              <a-link
                :loading="thesisDownloadLoading"
                @click="onThesisDownload(record)"
              >
                下载
              </a-link>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="isVisible"
      :width="814"
      :ok-loading="allocationLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      @before-open="fetchTeacherList"
    >
      <template #title> 请选择当前需要评阅的老师 </template>
      <a-radio-group v-if="!teacherLoading" v-model="teacherId">
        <a-space wrap>
          <template v-for="item in teacherList" :key="item.number">
            <a-radio :value="item.id">
              <template #radio="{ checked }">
                <a-space
                  :align="'start'"
                  class="custom-radio-card"
                  :class="{ 'custom-radio-card-checked': checked }"
                  wrap
                >
                  <div className="custom-radio-card-mask">
                    <div className="custom-radio-card-mask-dot" />
                  </div>
                  <div>
                    <div className="custom-radio-card-title">
                      {{ item.name }}
                    </div>
                    <a-typography-text type="secondary">
                      院系：{{ item.college }}
                    </a-typography-text>
                  </div>
                </a-space>
              </template>
            </a-radio>
          </template>
        </a-space>
      </a-radio-group>
      <a-spin v-else dot />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, nextTick, reactive, watch } from 'vue';
  import { Pagination } from '@/types/global';
  import {
    queryAllotList,
    AllotListRelevant,
    queryAllocation,
    queryDownload,
    queryRandomAllocation,
  } from '@/api/list';
  import { queryTeacherList, TeacherListRelevant } from '@/api/user';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type {
    TableColumnData,
    TableRowSelection,
  } from '@arco-design/web-vue/es/table/interface';
  import useLoading from '@/hooks/loading';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import dayjs from 'dayjs';
  import isBetween from 'dayjs/plugin/isBetween';
  import { Message } from '@arco-design/web-vue';

  dayjs.extend(isBetween);

  const generateFormModel = () => {
    return {
      title: '',
      name: '',
      number: '',
      college: '',
      uploadTime: [],
      fileState: undefined,
    };
  };
  const formModel = ref(generateFormModel());

  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: '待上传',
      value: 1,
    },
    {
      label: '待评审',
      value: 2,
    },
    {
      label: '评审中',
      value: 3,
    },
    {
      label: '评审完成',
      value: 4,
    },
    {
      label: '打回',
      value: 5,
    },
    {
      label: '弃用',
      value: 6,
    },
  ]);

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  const size = ref<SizeProps>('medium');
  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined
  ) => {
    size.value = val as SizeProps;
  };

  const densityList = computed(() => [
    {
      name: '迷你',
      value: 'mini',
    },
    {
      name: '偏小',
      value: 'small',
    },
    {
      name: '中等',
      value: 'medium',
    },
    {
      name: '偏大',
      value: 'large',
    },
  ]);

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  type Column = TableColumnData & { checked?: true };
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const basePagination: Pagination = {
    current: 1,
    pageSize: 15,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  });

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '学号',
      dataIndex: 'number',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '院系',
      dataIndex: 'college',
    },
    {
      title: '论文题目',
      dataIndex: 'chineseTitle',
    },
    {
      title: '论文英文题目',
      dataIndex: 'englishTitle',
    },
    {
      title: '上传日期',
      dataIndex: 'uploadTime',
    },
    {
      title: '状态',
      dataIndex: 'fileState',
    },
    {
      title: '操作',
      dataIndex: 'status',
    },
  ]);

  const selectIds = ref<(string | number)[]>([]);
  const renderData = ref<AllotListRelevant[]>([]);
  const allotListData = ref<AllotListRelevant[]>([]);

  const { loading, setLoading } = useLoading(false);
  const search = () => {
    setLoading(true);
    renderData.value = allotListData.value.filter(
      (e: AllotListRelevant) =>
        (e.chineseTitle.includes(formModel.value.title) ||
          e.englishTitle.includes(formModel.value.title)) &&
        e.name.includes(formModel.value.name) &&
        e.number.includes(formModel.value.number) &&
        e.college.includes(formModel.value.college) &&
        (e.fileState === formModel.value.fileState ||
          formModel.value.fileState === undefined) &&
        (formModel.value.uploadTime.length === 0 ||
          dayjs(e.uploadTime).isBetween(
            formModel.value.uploadTime[0],
            formModel.value.uploadTime[1]
          ))
    );
    setLoading(false);
  };
  const reset = () => {
    formModel.value = generateFormModel();
    search();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await queryAllotList();
      allotListData.value = data.data;
      renderData.value = allotListData.value;
      search();
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const isVisible = ref(false);
  const teacherId = ref<number | undefined>(undefined);
  const submitConfirm = () => {
    if (selectIds.value.length === 0) {
      Message.warning('请先选择要分配的论文');
      return;
    }
    isVisible.value = true;
  };

  const { loading: allocationLoading, setLoading: allocationSetLoading } =
    useLoading(false);
  const handleOk = async () => {
    try {
      allocationSetLoading(true);
      const res = await queryAllocation({
        thesisIds: selectIds.value as number[],
        teacherId: teacherId.value as number,
      });

      if (res.status === 200) {
        teacherId.value = undefined;
        fetchData();
        selectIds.value = [];
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      allocationSetLoading(false);
    }
  };

  const submitRandom = async () => {
    if (selectIds.value.length === 0) {
      Message.warning('请先选择要分配的论文');
      return;
    }

    try {
      allocationSetLoading(true);
      const res = await queryRandomAllocation({
        thesisIds: selectIds.value as number[],
      });

      if (res.status === 200) {
        teacherId.value = undefined;
        fetchData();
        selectIds.value = [];
      }
    } catch (error) {
      // you can report use errorHandler or other
    } finally {
      allocationSetLoading(false);
    }
  };

  const handleCancel = () => {
    teacherId.value = undefined;
  };

  const teacherList = ref<TeacherListRelevant[]>([]);
  const { loading: teacherLoading, setLoading: teacherSetLoading } =
    useLoading(false);
  const fetchTeacherList = async () => {
    try {
      teacherSetLoading(true);
      const { data } = await queryTeacherList();
      teacherList.value = data.data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      teacherSetLoading(false);
    }
  };

  const {
    loading: thesisDownloadLoading,
    setLoading: thesisDownloadSetLoading,
  } = useLoading(false);
  const onThesisDownload = async (e: any) => {
    try {
      thesisDownloadSetLoading(true);
      const res = await queryDownload({
        thesisId: e.id,
      });

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', e.chineseTitle);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      thesisDownloadSetLoading(false);
    }
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }

  .custom-radio-card {
    padding: 10px 16px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    width: 250px;
    box-sizing: border-box;
  }

  .custom-radio-card-mask {
    height: 14px;
    width: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid var(--color-border-2);
    box-sizing: border-box;
  }

  .custom-radio-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
  }

  .custom-radio-card-title {
    color: var(--color-text-1);
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .custom-radio-card:hover,
  .custom-radio-card-checked,
  .custom-radio-card:hover .custom-radio-card-mask,
  .custom-radio-card-checked .custom-radio-card-mask {
    border-color: rgb(var(--primary-6));
  }

  .custom-radio-card-checked {
    background-color: var(--color-primary-light-1);
  }

  .custom-radio-card:hover .custom-radio-card-title,
  .custom-radio-card-checked .custom-radio-card-title {
    color: rgb(var(--primary-6));
  }

  .custom-radio-card-checked .custom-radio-card-mask-dot {
    background-color: rgb(var(--primary-6));
  }
</style>

<style>
  .arco-radio-group .arco-radio {
    margin-right: 0px;
  }

  .arco-radio {
    padding-left: 0px;
  }
</style>
