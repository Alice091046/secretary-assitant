#!/bin/bash
echo "🚀 开始部署秘书助手小组件..."

# 检查必要工具
if ! command -v curl &> /dev/null; then
    echo "❌ 需要安装 curl"
    exit 1
fi

# 创建简单的HTTP服务器
echo "📡 启动本地预览服务器..."
python3 -m http.server 8080 --directory /root/.openclaw/workspace/widget &
SERVER_PID=$!

echo "✅ 小组件已启动！"
echo ""
echo "📱 访问方式："
echo "1. 在同一网络下的设备浏览器访问："
echo "   http://$(hostname -I | awk '{print $1}'):8080"
echo ""
echo "2. 或使用以下临时公网链接（如有配置）："
echo "   （需要ngrok或类似工具）"
echo ""
echo "3. 文件位置："
echo "   /root/.openclaw/workspace/widget/index.html"
echo ""
echo "🔧 功能说明："
echo "   - 办公室场景可视化"
echo "   - 像素小人实时状态"
echo "   - 自动状态切换"
echo "   - 触摸交互支持"
echo ""
echo "💡 点击像素小人可以切换状态！"

# 等待用户中断
trap "kill $SERVER_PID 2>/dev/null; echo '🛑 服务器已停止'; exit 0" INT
wait