/*
 * @Descripttion: useSelect(原mixin)  类型待优化
 * @version:
 * @Author: June
 * @Date: 2023-04-23 21:10:05
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-07-05 00:47:52
 */
import { inject, onBeforeMount, onMounted, reactive } from 'vue';
import { SelectEvent, SelectMode, SelectOneType } from '@/utils/event/types';
import EventEmitter from 'events';

interface Selector {
  mSelectMode: SelectMode;
  mSelectOneType: SelectOneType;
  mSelectId: string[] | string;
  mSelectIds: string[];
  mSelectActive: unknown[];
}

export default function useSelect() {
  const state = reactive<Selector>({
    mSelectMode: SelectMode.EMPTY,
    mSelectOneType: SelectOneType.EMPTY,
    mSelectId: '', // 选择id
    mSelectIds: [], // 选择id
    mSelectActive: [],
  });

  const fabric = inject('fabric');
<<<<<<< Updated upstream:src/hooks/select.ts
  // const canvas = inject('canvas');
  const canvasEditor = inject('canvasEditor');
  const event = inject('event');
=======
  const canvas = inject('canvas');
  const event: EventEmitter | undefined = inject('event');
>>>>>>> Stashed changes:old/src/hooks/select.ts

  const selectOne = (e: { id: string; type: SelectOneType }[]) => {
    state.mSelectMode = SelectMode.ONE;
    state.mSelectId = e[0].id;
    state.mSelectOneType = e[0].type;
    state.mSelectIds = e.map((item) => item.id);
  };

  const selectMulti = (e: { id: string; type: SelectOneType }[]) => {
    state.mSelectMode = SelectMode.MULTI;
    state.mSelectId = '';
    state.mSelectIds = e.map((item) => item.id);
  };

  const selectCancel = () => {
    state.mSelectId = '';
    state.mSelectIds = [];
    state.mSelectMode = SelectMode.EMPTY;
    state.mSelectOneType = SelectOneType.EMPTY;
  };

  onMounted(() => {
    if (!event) return;
    event.on(SelectEvent.ONE, selectOne);
    event.on(SelectEvent.MULTI, selectMulti);
    event.on(SelectEvent.CANCEL, selectCancel);
  });

  onBeforeMount(() => {
    if (!event) return;
    event.off(SelectEvent.ONE, selectOne);
    event.off(SelectEvent.MULTI, selectMulti);
    event.off(SelectEvent.CANCEL, selectCancel);
  });

  return {
    fabric,
    // canvas,
    canvasEditor,
    mixinState: state,
  };
}
