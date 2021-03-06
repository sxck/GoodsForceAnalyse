import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/home/index' }],
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: true,
  },
});
