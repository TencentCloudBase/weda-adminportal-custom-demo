// 引入子应用需要的模块
import { registerMicroApps, start } from "qiankun";

// 初始化子应用
export const initMicroApps = (microApps) => {
  registerMicroApps(
    // 子应用配置
    microApps.map((app) => ({
      name: app.id, // 接口返回的应用id
      container: "#micro-app-container", // 子应用挂载的容器
      entry: app?.deployUrl, // 接口返回的应用的部署地址
      activeRule: "#/app/" + app.id, // 子应用路由规则
    }))
  );
  start({
        // 关闭预加载
        prefetch: false,
        sandbox: {
          // 避免子应用的样式污染父应用的样式
          experimentalStyleIsolation: true,
        },
    });
};
