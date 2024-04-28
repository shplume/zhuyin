<template>
  <div>
    <a-space direction="vertical" fill>
      <div class="divider-demo">
        <span style="flex: 30%">批改教师</span>
        <a-divider direction="vertical" />
        <span style="flex: 70%; color: rgb(115, 115, 115)">教师姓名</span>
      </div>
      <div class="divider-demo">
        <span style="flex: 30%">批改日期</span>
        <a-divider direction="vertical" />
        <span style="flex: 70%; color: rgb(115, 115, 115)">xxxx-xx-xx</span>
      </div>
    </a-space>
    <br />
  </div>
  <a-form :model="form" :style="{ width: '100%' }" @submit="handleSubmit">
    <a-card style="margin-left: 5px; margin-right: 5px" title="论文评分">
      <a-form-item
        field="title"
        :rules="[{ required: true, message: '选题评分不能为空' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input-number v-model="form.title" placeholder="论文选题" />
      </a-form-item>
      <a-form-item
        field="document"
        :rules="[{ required: true, message: '文献综述不能为空' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input-number v-model="form.document" placeholder="文献综述" />
      </a-form-item>
      <a-form-item
        field="achievement"
        :rules="[{ required: true, message: '研究成果不能为空' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input-number v-model="form.achievement" placeholder="研究成果" />
      </a-form-item>
      <a-form-item
        field="level"
        :rules="[{ required: true, message: '科研水平不能为空' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input-number v-model="form.level" placeholder="科研水平" />
      </a-form-item>
      <a-form-item
        field="style"
        :rules="[{ required: true, message: '学风和写作不能为空' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input-number v-model="form.style" placeholder="学风和写作" />
      </a-form-item>
    </a-card>
    <a-card
      class="general-card"
      :bordered="false"
      style="
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
      "
    >
      <template #title>
        <a-button
          type="text"
          style="font-size: large"
          @click="handleClickSummary"
        >
          总体评阅意见
        </a-button>
        <a-drawer
          :width="600"
          :visible="visibleSummary"
          placement="left"
          unmount-on-close
          @ok="handleOkSummary"
          @cancel="handleCancelSummary"
        >
          <template #title>总体评阅意见</template>
          <div>
            <a-form-item
              field="sumary"
              :label="'仅罗列要点'"
              :rules="[
                {
                  required: true,
                  message: '总体评阅意见不能为空',
                },
              ]"
              :validate-trigger="['change', 'blur']"
            >
              <a-textarea
                v-model="form.sumary"
                :max-length="400"
                show-word-limit
                :placeholder="'请简单说明，最多不要超多400字。'"
              />
            </a-form-item>
          </div>
        </a-drawer>
      </template>
      <a-form-item
        field="sumary"
        :rules="[
          {
            required: true,
            message: '总体评阅意见不能为空',
          },
        ]"
        :validate-trigger="['change', 'blur']"
      >
        <a-textarea
          v-model="form.sumary"
          :max-length="400"
          show-word-limit
          :placeholder="'请简单说明，最多不要超多400字。'"
        />
      </a-form-item>
    </a-card>
    <a-card
      class="general-card"
      :bordered="false"
      style="
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
      "
    >
      <template #title>
        <a-button
          type="text"
          style="font-size: large"
          @click="handleClickCorrect"
        >
          修改意见
        </a-button>
        <a-drawer
          :width="600"
          :visible="visibleCorrect"
          placement="left"
          unmount-on-close
          @ok="handleOkCorrect"
          @cancel="handleCancelCorrect"
        >
          <template #title>修改意见</template>
          <div>
            <a-form-item
              field="correct"
              :label="'仅罗列要点'"
              :rules="[
                {
                  required: true,
                  message: '修改意见不能为空',
                },
              ]"
              :validate-trigger="['change', 'blur']"
            >
              <a-textarea
                v-model="form.correct"
                :max-length="400"
                show-word-limit
                :placeholder="'请简单说明，最多不要超多400字。'"
              />
            </a-form-item>
          </div>
        </a-drawer>
      </template>
      <a-form-item
        field="correct"
        :rules="[
          {
            required: true,
            message: '修改意见不能为空',
          },
        ]"
        :validate-trigger="['change', 'blur']"
      >
        <a-textarea
          v-model="form.correct"
          :max-length="400"
          show-word-limit
          :placeholder="'请简单说明，最多不要超多400字。'"
        />
      </a-form-item>
    </a-card>
    <a-form-item no-style="false">
      <a-button html-type="submit" type="primary" style="margin: 20px">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup></script>

<script>
  import { ref, reactive } from 'vue';

  export default {
    setup() {
      const visibleSummary = ref(false);
      const visibleCorrect = ref(false);

      const handleClickSummary = () => {
        visibleSummary.value = true;
      };
      const handleOkSummary = () => {
        visibleSummary.value = false;
      };
      const handleCancelSummary = () => {
        visibleSummary.value = false;
      };
      const handleClickCorrect = () => {
        visibleCorrect.value = true;
      };
      const handleOkCorrect = () => {
        visibleCorrect.value = false;
      };
      const handleCancelCorrect = () => {
        visibleCorrect.value = false;
      };

      const form = reactive({
        title: '',
        document: '',
        achievement: '',
        level: '',
        style: '',
        sumary: '',
        correct: '',
        isRead: false,
      });
      const handleSubmit = (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
      };

      return {
        visibleSummary,
        visibleCorrect,
        handleClickSummary,
        handleClickCorrect,
        handleOkSummary,
        handleOkCorrect,
        handleCancelSummary,
        handleCancelCorrect,
        form,
        handleSubmit,
      };
    },
  };
</script>

<style scoped>
  .divider-demo {
    display: flex;
    text-align: center;
    box-sizing: border-box;
    padding: 5px;
    border: 5px solid rgb(var(--gray-2));
  }
</style>
