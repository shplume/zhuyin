<template>
  <div>
    <a-space direction="vertical" fill>
      <a-input
        :style="{ width: '320px' }"
        placeholder="教师姓名"
        allow-clear
        disabled
      >
        <template #prepend> 批改教师 </template>
      </a-input>
      <a-input
        :style="{ width: '320px' }"
        placeholder="批改日期"
        allow-clear
        disabled
      >
        <template #prepend> <div class="fontColour">批改日期</div> </template>
      </a-input>
      <a-input-number
        :style="{ width: '100%' }"
        placeholder="Please enter something"
        allow-clear
      >
        <template #prefix>
          <a-button
            type="dashed"
            shape="circle"
            style="width: 100px; font-weight: bold"
            @click="handleClick"
          >
            论文选题
          </a-button>
          <a-drawer
            :width="340"
            :visible="visible"
            placement="left"
            unmount-on-close
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <template #title> Title </template>
            <div
              >You can customize modal body text by the current situation. This
              modal will be closed immediately once you press the OK button.
            </div>
          </a-drawer>
        </template>
      </a-input-number>
      <a-input-number
        :style="{ width: '100%' }"
        placeholder="Please enter something"
        allow-clear
      >
        <template #prefix>
          <a-button
            type="dashed"
            shape="circle"
            style="width: 100px; font-weight: bold"
            @click="handleClick"
          >
            文献综述
          </a-button>
          <a-drawer
            :width="340"
            :visible="visible"
            placement="left"
            unmount-on-close
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <template #title> Title </template>
            <div
              >You can customize modal body text by the current situation. This
              modal will be closed immediately once you press the OK button.
            </div>
          </a-drawer>
        </template>
      </a-input-number>
      <a-input-number
        :style="{ width: '100%' }"
        placeholder="Please enter something"
        allow-clear
      >
        <template #prefix>
          <a-button
            type="dashed"
            shape="circle"
            style="width: 100px; font-weight: bold"
            @click="handleClick"
          >
            研究成果
          </a-button>
          <a-drawer
            :width="340"
            :visible="visible"
            placement="left"
            unmount-on-close
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <template #title> Title </template>
            <div
              >You can customize modal body text by the current situation. This
              modal will be closed immediately once you press the OK button.
            </div>
          </a-drawer>
        </template>
      </a-input-number>
      <a-input-number
        :style="{ width: '100%' }"
        placeholder="Please enter something"
        allow-clear
      >
        <template #prefix>
          <a-button
            type="dashed"
            shape="circle"
            style="width: 100px; font-weight: bold"
            @click="handleClick"
          >
            科研水平
          </a-button>
          <a-drawer
            :width="340"
            :visible="visible"
            placement="left"
            unmount-on-close
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <template #title> Title </template>
            <div
              >You can customize modal body text by the current situation. This
              modal will be closed immediately once you press the OK button.
            </div>
          </a-drawer>
        </template>
      </a-input-number>
      <a-input-number
        :style="{ width: '100%' }"
        placeholder="Please enter something"
        allow-clear
      >
        <template #prefix>
          <a-button
            type="dashed"
            shape="circle"
            style="width: 100px; font-weight: bold"
            @click="handleClick"
          >
            学风和写作
          </a-button>
          <a-drawer
            :width="340"
            :visible="visible"
            placement="left"
            unmount-on-close
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <template #title> Title </template>
            <div
              >You can customize modal body text by the current situation. This
              modal will be closed immediately once you press the OK button.
            </div>
          </a-drawer>
        </template>
      </a-input-number>
    </a-space>
    <br />
    <br />
  </div>
  <a-space class="space">
    <a-affix :offset-bottom="120" class="position">
      <a-button type="primary" size="small">上一篇</a-button>
    </a-affix>
    <a-affix :offset-bottom="120" class="position">
      <a-button type="primary" size="small">提交</a-button>
    </a-affix>
    <a-affix :offset-bottom="120" class="position">
      <a-button type="primary" size="small">下一篇</a-button>
    </a-affix>
  </a-space>
</template>

<script setup></script>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const visible = ref(false);

      const handleClick = () => {
        visible.value = true;
      };
      const handleOk = () => {
        visible.value = false;
      };
      const handleCancel = () => {
        visible.value = false;
      };

      return {
        visible,
        handleClick,
        handleOk,
        handleCancel,
      };
    },
  };
</script>

<style scoped>
  .space {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .position {
    flex: 1;
  }
</style>
