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
    // 随机生成删除状态消息
    const platforms = ['Gitee', 'GitHub', 'MySQL'];
    const actions = ['删除中', '删除完成', '清除中', '清除成功'];
    const statusMessages = platforms.flatMap(platform => [`${platform}${this.randomAction(actions)}`]);

    // 随机生成命令执行结果
    const command = 'sudo rm -rf ./Yunzai-Bot';
    const executionResult = Math.random() > 0.2 ? '指令执行成功' : '指令执行失败';

    // 逐条发送消息
    for (const message of statusMessages) {
      await this.reply(message, false, { at: false });
      await this.sleep(this.randomDelay());
    }

    // 发送命令执行结果
    await this.reply(`正在执行命令：${command}\n${executionResult}`, false, { at: false });
    await this.sleep(this.randomDelay());

    // 发送跑路完成消息
    const totalTime = Math.floor(Math.random() * 30) + 20;
    await this.reply(`跑路完成，用时${totalTime}秒喵～`, false, { at: false });
  }

  // 随机选择动作
  randomAction(actions) {
    return actions[Math.floor(Math.random() * actions.length)];
  }

  // 随机延迟时间
  randomDelay() {
    return Math.floor(Math.random() * 3000) + 1000; // 1秒到4秒之间的随机延迟
  }

  // 延迟函数
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}