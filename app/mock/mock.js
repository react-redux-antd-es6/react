import Mock from 'mockjs';

export default {
  mockData1: Mock.mock({
      status: '400',
      data: Mock.mock({
        "array|1-10": [
          "Hello",
          "Mock.js",
          "!"
        ]
      })
  })
}