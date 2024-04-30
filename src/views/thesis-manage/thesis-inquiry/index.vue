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
                <a-form-item field="name" :label="'论文题目'">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="'请输入论文题目或论文英文题目'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="number" :label="'姓名/学号'">
                  <a-input
                    v-model="formModel.number"
                    :placeholder="'请输入学生姓名或学号'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="specialty" :label="'专业'">
                  <a-input
                    v-model="formModel.specialty"
                    :placeholder="'请输入学生所在专业'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="nature" :label="'送审性质'">
                  <a-select
                    v-model="formModel.nature"
                    :options="natureOptions"
                    :placeholder="'请选择送审性质'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="createdTime" :label="'上传日期'">
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" :label="'状态'">
                  <a-select
                    v-model="formModel.status"
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
          <a-dropdown-button type="primary" @click="handleClick">
            <icon-send style="margin-right: 8px" />
            送审
            <template #content>
              <a-doption>
                <icon-relation style="margin-right: 8px" />
                随机送审
              </a-doption>
            </template>
          </a-dropdown-button>

          <a-tooltip :content="'刷新'">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
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
        @page-change="onPageChange"
        @select="
          (rowKeys, _, record) => {
            selectIds = rowKeys;
            record.select = !record.select;
          }
        "
      >
      </a-table>
    </a-card>
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title> 请选择当前需要评阅的老师 </template>
      <a-space size="large">
        <a-avatar>A</a-avatar>
        <a-avatar :style="{ backgroundColor: '#3370ff' }">
          <IconUser />
        </a-avatar>
        <a-avatar :style="{ backgroundColor: '#14a9f8' }">Arco</a-avatar>
        <a-avatar :style="{ backgroundColor: '#00d0b6' }">Design</a-avatar>
        <a-avatar>
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </a-space>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  // import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type {
    TableColumnData,
    TableRowSelection,
  } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  });

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      specialty: '',
      nature: '',
      createdTime: [],
      status: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  // const { t } = useI18n();
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const selectIds = ref<(string | number)[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
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
  const columns = computed<TableColumnData[]>(() => [
    {
      title: '学号',
      dataIndex: 'studentNumber',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '专业',
      dataIndex: 'specialty',
    },
    {
      title: '送审性质',
      dataIndex: 'nature',
    },
    {
      title: '论文题目',
      dataIndex: 'thesisTitle',
    },
    {
      title: '论文英文题目',
      dataIndex: 'englishThesisTitle',
    },
    {
      title: '上传日期',
      dataIndex: 'createdTime',
    },
    {
      title: '评阅书模板类型',
      dataIndex: 'softtype',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: 'status',
    },
  ]);

  const natureOptions = computed<SelectOptionData[]>(() => [
    {
      label: '首次送审',
      value: 'artificial',
    },
    {
      label: '导师审核',
      value: 'rules',
    },
  ]);
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: '0',
      value: 'online',
    },
    {
      label: '1',
      value: 'offline',
    },
  ]);
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as PolicyParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined
  ) => {
    size.value = val as SizeProps;
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

  const visible = ref(false);
  const handleClick = () => {
    visible.value = true;

    // window.console.log(selectIds.value, renderData.value);
  };
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
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
</style>
