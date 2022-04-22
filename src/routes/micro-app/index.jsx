import { PortalContext } from "../../context";
import React, {
  useContext
} from 'react'
import { useParams, Link } from 'react-router-dom'

export default function MicroApp() {
  const portalContext = useContext(PortalContext);
  const id = useParams().id;
  const app = portalContext.appInfo?.find(item => item.id === id);
  // 判断是否移动端
  const isMobile =
    window.matchMedia && window.matchMedia("'(pointer:coarse)").matches;

  if (!app) { 
    return (
    '暂无可访问应用'
    )
  }

  function renderMenu(menu) {
    // 判断是应用内跳转
    if (menu.type === "route") {
      return (
        <li key={menu.Key}>
          <Link to={"/app/" + app.id + menu.path}>{menu.title}</Link>
          {
            // 存在子菜单的情况下，递归渲染
            menu.children?.length > 0 && (
              <ul>{menu.children.map(item => renderMenu(item))}</ul>
            )
          }
        </li>
      );
    }
  }

  return (
    <main style={{ padding: "1rem 0" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: 200 }}>
          <h1>{app.name}</h1>
          {isMobile
            // 移动端导航
            ? app?.appCustomNav?.mobileMenuData.map(renderMenu)
            // pc端导航
            : app?.appCustomNav?.menuData.map(renderMenu)}
        </div>
        <div style={{ flex: 1 }}>
          <div id="micro-app-container"></div>
        </div>
      </div>
    </main>
  );
}