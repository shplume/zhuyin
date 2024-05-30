<template>
  <a-list :bordered="false">
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 姓名 </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph v-model:editText="userinfo.name" editable>
              {{ userinfo.name }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link> 修改 </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>

    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 院系 </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph
              v-model:editText="userinfo.college"
              editable
            >
              {{ userinfo.college }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link> 修改 </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>

    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 电话 </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph v-model:editText="userinfo.phone" editable>
              {{ userinfo.phone }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link> 修改 </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>

    <a-list-item v-permission="['admin', 'teacher']">
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 教工号 </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph v-model:editText="userinfo.number" editable>
              {{ userinfo.number }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link> 修改 </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>

    <a-list-item v-permission="['student']">
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 学工号 </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph v-model:editText="userinfo.number" editable>
              {{ userinfo.number }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link> 修改 </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useUserStore } from '@/store';

  const userStore = useUserStore();

  const userinfo = ref({
    name: userStore.name,
    college: userStore.college,
    phone: userStore.phone,
    number: userStore.number,
  });
</script>

<style scoped lang="less">
  :deep(.arco-list-item) {
    border-bottom: none !important;
    .arco-typography {
      margin-bottom: 20px;
    }
    .arco-list-item-meta-avatar {
      margin-bottom: 1px;
    }
    .arco-list-item-meta {
      padding: 0;
    }
  }
  :deep(.arco-list-item-meta-content) {
    flex: 1;
    border-bottom: 1px solid var(--color-neutral-3);

    .arco-list-item-meta-description {
      display: flex;
      flex-flow: row;
      justify-content: space-between;

      .tip {
        color: rgb(var(--gray-6));
      }
      .operation {
        margin-right: 6px;
      }
    }
  }
</style>
