module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复bug
        'docs',     // 文档更新
        'style',    // 代码格式化
        'refactor', // 重构
        'perf',     // 性能优化
        'test',     // 测试
        'chore',    // 构建工具或辅助工具变动
        'ci',       // CI/CD相关
        'build',    // 构建系统
        'revert'    // 回滚提交
      ]
    ],
    'subject-max-length': [2, 'always', 100],
    'subject-case': [2, 'always', 'lower-case']
  }
};