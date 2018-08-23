import Axios from '../http/index'
export default {
  getPublicInfo(arg) {
    return Axios.request({
      url: '/market-competitive-statistic.zpidc.com/statistic/maimaireport/get',
      ...arg
    })
  },
  getLowInfo(arg) {
    return Axios.request({
      url: 'user-competitive-score.zpidc.com/user/competitive/getCompetitiveScoreDistribution?startTime=2018-08-21+18:54:55&endTime=2018-08-22+18:54:55',
      ...arg
    })
  },
}