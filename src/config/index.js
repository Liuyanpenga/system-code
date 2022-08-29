
//  环境配置文件
//  一般在企业级项目里面有三个环境开发环境测试环境线上环境

// 当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/db4e84807fa3a23bbe2ca06959701064/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/db4e84807fa3a23bbe2ca06959701064/api',
  },
  pro: {
    baseApi: '//future.com/api',
    mockApi: 'https://www.fastmock.site/mock/db4e84807fa3a23bbe2ca06959701064/api',
  },
}

export default {
  env,
  // mock的总开关,
  mock: false,
  ...EnvConfig[env]
}

