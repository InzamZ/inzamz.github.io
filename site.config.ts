import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://www.inzamz.top/',
  lang: 'zh-CN',
  title: 'InzamZ的小破站',
  subtitle: '胆大飘洋过海,胆小寸步难行',
  author: {
    name: 'InzamZ',
    avatar: 'https://www.inzamz.top/images/avatar.jpg'
  },
  favicon: 'https://www.inzamz.top/favicon.ico',
  description: '一个自言自语的地方',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    // {
    //   name: 'QQ 群 1050458482',
    //   link: 'https://qm.qq.com/cgi-bin/qm/qr?k=kZJzggTTCf4SpvEQ8lXWoi5ZjhAx0ILZ&jump_from=webapi',
    //   icon: 'i-ri-qq-line',
    //   color: '#12B7F5',
    // },
    {
      name: 'GitHub',
      link: 'https://github.com/InzamZ',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '微博',
      link: 'https://weibo.com/u/7529779251?is_all=1',
      icon: 'i-ri-weibo-line',
      color: '#E6162D',
    },
    {
      name: '豆瓣',
      link: 'https://www.douban.com/people/inzamz/',
      icon: 'i-ri-douban-line',
      color: '#007722',
    },
    {
      name: 'NEODB',
      link: 'https://neodb.social/users/misaka19614@m.cmx.im/',
      icon: 'i-ri-douban-line',
      color: '#C20C0C',
    },
    {
      name: '网易云音乐',
      link: 'https://music.163.com/#/user/home?id=1525382286',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#C20C0C',
    },
    {
      name: '知乎',
      link: 'https://www.zhihu.com/people/ge-zhe-79-3',
      icon: 'i-ri-zhihu-line',
      color: '#0084FF',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/259102692',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    // {
    //   name: '微信公众号',
    //   link: 'https://cdn.yunyoujun.cn/img/about/white-qrcode-and-search.jpg',
    //   icon: 'i-ri-wechat-2-line',
    //   color: '#1AAD19',
    // },
    {
      name: 'Twitter',
      link: 'https://twitter.com/InzamZ',
      icon: 'i-ri-twitter-line',
      color: '#1da1f2',
    },
    {
      name: 'Telegram Channel',
      link: 'https://t.me/inzamsgossip',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    },
    {
      name: 'E-Mail',
      link: 'me@inzamz.top',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: 'POPI',
      link: 'https://www.popiapp.cn/TnolgX',
      icon: 'i-ri-questionnaire-line',
      color: '#525252',
    },
    {
      name: 'Travelling',
      link: 'https://www.travellings.cn/go.html',
      icon: 'i-ri-train-line',
      color: 'var(--va-c-text)',
    },
  ],

  search: {
    enable: false,
  },

  sponsor: {
    enable: true,
    title: '可怜可怜孩子吧！',
    methods: [
      {
        name: '支付宝',
        url: 'https://p.130014.xyz/2020/12/03/1173CB0E-9A44-45A6-8991-515958F4ADBB.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://p.130014.xyz/2020/12/03/9AACAEEE-03D9-4794-BAC6-2EE2965384DF.jpg',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://p.130014.xyz/2020/12/03/25F401EB-6BED-4A00-BAD2-DF69A9011C8A.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },

  /**
   * 开启阅读统计
   */
  statistics: {
    enable: true,
    readTime: {
      /**
       * 阅读速度
       */
      speed: {
        cn: 300,
        en: 200,
      },
    },
  }
})
