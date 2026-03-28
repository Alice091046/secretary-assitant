// 秘书助手状态API
// 提供实时工作状态数据

const express = require('express');
const app = express();
const port = 3000;

// 允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// 状态定义
const states = {
    IDLE: '空闲',
    PROCESSING: '处理消息中',
    TYPING: '打字回复中',
    THINKING: '思考中',
    DEVELOPING: '开发小组件中',
    RESTING: '休息中'
};

// 任务类型
const tasks = {
    MESSAGE: '处理飞书消息',
    WIDGET: '开发可视化小组件',
    SYSTEM: '系统维护',
    LEARNING: '学习优化',
    PLANNING: '计划任务'
};

// 模拟实时状态数据
function getCurrentStatus() {
    const now = new Date();
    const hour = now.getHours();
    
    // 根据时间模拟不同状态
    let state, task;
    
    if (hour >= 9 && hour < 12) {
        // 上午：活跃工作
        state = Math.random() > 0.3 ? states.PROCESSING : states.TYPING;
        task = tasks.MESSAGE;
    } else if (hour >= 12 && hour < 14) {
        // 中午：可能休息
        state = Math.random() > 0.5 ? states.RESTING : states.THINKING;
        task = tasks.PLANNING;
    } else if (hour >= 14 && hour < 18) {
        // 下午：开发工作
        state = states.DEVELOPING;
        task = tasks.WIDGET;
    } else if (hour >= 18 && hour < 22) {
        // 晚上：学习优化
        state = states.THINKING;
        task = tasks.LEARNING;
    } else {
        // 夜间：空闲或维护
        state = Math.random() > 0.7 ? states.PROCESSING : states.IDLE;
        task = tasks.SYSTEM;
    }
    
    return {
        state: state,
        task: task,
        timestamp: now.toISOString(),
        online: true,
        messageCount: Math.floor(Math.random() * 50) + 10,
        uptime: process.uptime(),
        version: '1.0.0'
    };
}

// API端点
app.get('/api/status', (req, res) => {
    const status = getCurrentStatus();
    res.json({
        success: true,
        data: status,
        message: '状态获取成功'
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        timestamp: new Date().toISOString(),
        service: 'Secretary Assistant Status API',
        status: 'running'
    });
});

// 静态文件服务
app.use(express.static('.'));

app.listen(port, () => {
    console.log(`📡 状态API服务运行在 http://localhost:${port}`);
    console.log(`📊 状态端点: http://localhost:${port}/api/status`);
    console.log(`❤️  健康检查: http://localhost:${port}/api/health`);
    console.log(`🌐 小组件页面: http://localhost:${port}/`);
});