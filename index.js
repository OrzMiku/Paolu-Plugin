import plugin from '../../lib/plugins/plugin.js';

export class paolu extends plugin {
  constructor() {
    super({
      name: '跑路',
      dsc: '发送特定内容',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^跑路$',
          fnc: 'repeat'
        }
      ]
    });
  }

  async repeat() {
    // 随机延迟时间，模拟不同删除速度
    const delay = () => Math.floor(Math.random() * 5000);
    await this.sleep(delay());

    // 随机生成删除状态消息
    const platforms = ['Gitee', 'GitHub', 'MySQL'];
    const actions = ['删除中', '删除完成', '清除中', '清除成功'];
    const statusMessages = platforms.flatMap(platform => [`${platform}${this.randomAction(actions)}`]);

    // 随机生成命令执行结果
    const command = 'sudo rm -rf ./Yunzai-Bot';
    const executionResult = Math.random() > 0.2 ? '指令执行成功' : '指令执行失败';

    // 组合最终消息
    const finalMessage = statusMessages.join('\n') + `\n正在执行命令：${command}\n${executionResult}\n\n跑路完成，用时${Math.floor(Math.random() * 30) + 20}秒喵～`;

    await this.reply(finalMessage, false, { at: false });
  }

  // 随机选择动作
  randomAction(actions) {
    return actions[Math.floor(Math.random() * actions.length)];
  }

  // 延迟函数
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}