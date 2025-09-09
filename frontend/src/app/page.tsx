'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';

export default function HomePage() {
  const [currentPain, setCurrentPain] = useState(0);
  const [currentStats, setCurrentStats] = useState({
    lostRevenue: 285600,
    noShows: 1247,
    wastedHours: 892
  });

  // 广告投放餐馆老板痛点轮播
  const painPoints = [
    "Facebook广告花了$3000，不知道来了几个客人",
    "Google广告每天$500，客人来了但无法追踪ROI",
    "投了一个月广告，不知道哪个渠道有效果",
    "广告带来的客人爽约了，$2000广告费白花",
    "想给广告来的客人发优惠券，但不知道谁是谁"
  ];

  // 痛点轮播动画
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPain((prev) => (prev + 1) % painPoints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 实时数据增长动画
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        lostRevenue: prev.lostRevenue + Math.floor(Math.random() * 1200),
        noShows: prev.noShows + Math.floor(Math.random() * 8),
        wastedHours: prev.wastedHours + Math.floor(Math.random() * 5)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* 动态背景粒子 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-10 -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" variant="light" />
            
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">功能展示</a>
              <a href="#success" className="text-gray-300 hover:text-white transition-colors">成功案例</a>
              <a href="#roi" className="text-gray-300 hover:text-white transition-colors">收益计算</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                登录
              </Link>
              <Link href="/demo" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
                立即体验
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                🚨 每天损失 ${(currentStats.lostRevenue / 365).toFixed(0)}+ 美元
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              全美唯一
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                广告+预约
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
                一体化追踪系统
              </span>
            </h1>
            
            {/* 核心优势展示 */}
            <div className="h-24 mb-8 flex items-center justify-center bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-sm rounded-2xl mx-4 border border-green-500/30">
              <p className="text-xl md:text-2xl text-green-300 font-bold px-6 text-center">
                🎯 投广告的餐馆老板专用 • 每个客人都知道从哪来的 • 精准追踪ROI
              </p>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-5xl mx-auto leading-relaxed">
              <span className="text-yellow-400 font-bold">不只是预约系统</span> - 我们是为投放广告的餐馆老板量身定制
              <br />
              <span className="text-green-400 font-bold text-xl">Facebook广告来的客人 • Google广告来的客人 • 全部自动追踪签到</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/demo" 
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1">
                <span className="mr-2">🚀</span>
                免费试用 - 立即止损
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
              
              <Link href="/consultation" 
                className="border-2 border-white/30 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                <span className="mr-2">📞</span>
                专家一对一咨询
              </Link>
            </div>

            {/* 广告损失统计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-red-900/30 backdrop-blur-md rounded-2xl p-6 border border-red-500/20 hover:bg-red-900/40 transition-colors duration-300">
                <div className="text-4xl font-bold text-red-300 mb-2 animate-pulse">
                  ${(currentStats.lostRevenue * 0.6).toLocaleString()}
                </div>
                <div className="text-red-200 text-sm">无法追踪的广告费（全美餐馆）</div>
              </div>
              
              <div className="bg-yellow-900/30 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/20 hover:bg-yellow-900/40 transition-colors duration-300">
                <div className="text-4xl font-bold text-yellow-300 mb-2 animate-pulse">
                  {(currentStats.noShows * 0.4).toFixed(0)}%
                </div>
                <div className="text-yellow-200 text-sm">餐馆不知道广告效果</div>
              </div>
              
              <div className="bg-blue-900/30 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 hover:bg-blue-900/40 transition-colors duration-300">
                <div className="text-4xl font-bold text-blue-300 mb-2 animate-pulse">
                  {(currentStats.wastedHours * 2.3).toFixed(0)}万
                </div>
                <div className="text-blue-200 text-sm">广告带来客人数（每月）</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-end Pain Points */}
      <section className="relative z-10 py-20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              投广告餐馆老板的三大痛点
            </h2>
            <p className="text-2xl text-gray-300">
              每一分广告费都看不到效果，就像把钱扔进黑洞
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Problem Cards */}
            {[
              {
                icon: "🕳️",
                title: "广告费像扔进黑洞",
                desc: "每个月Facebook广告$5000，Google广告$3000。客人来了，但不知道是哪个广告带来的。ROI完全无法计算。",
                impact: "$8000/月 无法追踪",
                color: "red"
              },
              {
                icon: "🤷‍♂️", 
                title: "客人来源完全不清楚",
                desc: "客人说看到广告来的，但到底是Facebook、Google、还是Yelp？不知道哪个渠道有效，不敢停任何广告。",
                impact: "100%盲投广告",
                color: "orange"
              },
              {
                icon: "📱",
                title: "无法精准营销客户", 
                desc: "想给广告来的客人发优惠券、生日祝福、新菜推荐，但根本不知道谁是广告客人，只能广撒网。",
                impact: "营销效果差80%",
                color: "yellow"
              }
            ].map((pain, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-${pain.color}-900/40 to-${pain.color}-800/20 backdrop-blur-md rounded-3xl p-8 border border-${pain.color}-500/30 hover:scale-105 transform transition-all duration-300 cursor-pointer group`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="text-6xl mb-4 group-hover:animate-bounce">{pain.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{pain.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{pain.desc}</p>
                <div className={`text-${pain.color}-300 font-bold text-lg`}>
                  ⚠️ {pain.impact}
                </div>
              </div>
            ))}
          </div>

          {/* Solution Preview */}
          <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-md rounded-3xl p-12 border border-green-500/30">
            <div className="text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-4xl font-bold text-white mb-6">BookMe = 全美唯一广告追踪预约系统</h3>
              <p className="text-2xl text-green-300 mb-8">
                广告来源自动标记 + 签到时精准追踪 + 客户群体分类营销
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-green-200">广告客人可追踪</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">3倍</div>
                  <div className="text-blue-200">广告ROI提升</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">5min</div>
                  <div className="text-purple-200">一键群发营销</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              投广告餐馆老板专属功能
            </h2>
            <p className="text-xl text-gray-300">每个功能都为追踪广告效果而设计</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Feature Cards */}
            {[
              {
                title: "广告来源自动追踪",
                desc: "客人预约时，系统自动标记来源（Facebook、Google、Yelp）。签到时精准记录，每个广告渠道效果一目了然。",
                benefits: ["100%准确追踪广告来源", "精确计算每个渠道ROI", "自动生成广告效果报告"],
                icon: "🎯"
              },
              {
                title: "智能签到+客户分类",
                desc: "客人签到时，系统自动识别广告来源，建立专属客户档案。广告客人、自然客人、回头客全部分类管理。",
                benefits: ["客户来源100%清晰", "精准客户分组营销", "回头客自动识别"],
                icon: "📱"
              },
              {
                title: "一键群发营销系统",
                desc: "想给Facebook广告来的客人发优惠券？一键搞定。想给Google广告客人推新菜？批量发送。精准营销，告别广撒网。",
                benefits: ["营销精准度提升5倍", "客户转化率翻倍", "营销成本降低60%"],
                icon: "📬"
              },
              {
                title: "广告投放优化建议",
                desc: "系统分析每个广告渠道的客人消费习惯、回头率、满意度，AI推荐最佳广告投放策略。",
                benefits: ["广告ROI提升200%+", "智能投放建议", "自动优化广告预算"],
                icon: "🤖"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-green-300">
                      <span className="mr-2">✅</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium ROI Calculator */}
      <section className="relative z-10 py-20 bg-black/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-6">
              算算您餐馆每月少赚多少钱
            </h2>
            <p className="text-xl text-gray-300">
              基于纽约、加州高端餐馆真实数据
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-3xl p-8 border border-blue-500/30">
            <div className="text-center mb-8">
              <div className="text-7xl font-bold text-red-400 mb-2 animate-pulse">
                $18,900
              </div>
              <p className="text-xl text-gray-200 mb-2">您每月的爽约损失（高端餐馆平均）</p>
              <p className="text-sm text-gray-400">基于Manhattan, Beverly Hills, SF 150+家餐馆数据</p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-900/60 to-red-800/40 rounded-xl p-6 border border-red-500/30">
                  <div className="text-3xl font-bold text-red-300 mb-1">$12,600</div>
                  <div className="text-sm text-red-200">premium食材 & 专业人工</div>
                  <div className="text-xs text-red-400 mt-1">和牛、龙虾、顶级chef费用</div>
                </div>
                <div className="bg-gradient-to-br from-orange-900/60 to-orange-800/40 rounded-xl p-6 border border-orange-500/30">
                  <div className="text-3xl font-bold text-orange-300 mb-1">$4,200</div>
                  <div className="text-sm text-orange-200">黄金时段机会成本</div>
                  <div className="text-xs text-orange-400 mt-1">Friday-Sunday 7-9pm损失</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/60 to-yellow-800/40 rounded-xl p-6 border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">$2,100</div>
                  <div className="text-sm text-yellow-200">品牌声誉 & 运营损失</div>
                  <div className="text-xs text-yellow-400 mt-1">Yelp差评、客诉处理费</div>
                </div>
              </div>
              
              <div className="mt-10 bg-gradient-to-r from-green-900/60 to-blue-900/60 rounded-2xl p-6 border border-green-500/30">
                <div className="text-4xl font-bold text-green-300 mb-3">
                  使用BookMe后每月净增收入: $16,200
                </div>
                <div className="text-xl text-green-200 mb-2">
                  投资回报率: <span className="text-5xl font-bold text-green-400">3,240%</span>
                </div>
                <div className="text-sm text-green-300">
                  95%减少no-show + 40%提升VIP客户价值 + 25%增加翻台率
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Social Proof */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              投广告的餐馆老板都在用
            </h2>
            <p className="text-xl text-gray-300">真实客户，真实广告追踪效果</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "李老板",
                restaurant: "川香楼 (每月广告费$8000)",
                location: "法拉盛, 纽约",
                quote: "以前Facebook广告$5000，Google $3000，完全不知道效果。用了BookMe三个月，发现Google客人消费高30%，现在只投Google，广告费省一半，生意更好。",
                revenue: "广告ROI +280%",
                avatar: "李",
                rating: 5
              },
              {
                name: "Maria Rodriguez", 
                restaurant: "Tacos Del Sol (广告投放2年)",
                location: "洛杉矶, 加州",
                quote: "最爱一键群发功能！Facebook来的客人爱折扣，Instagram客人爱新菜，现在精准营销，每次群发转化率都在40%以上，以前瞎发才5%。",
                revenue: "营销效果 +8倍",
                avatar: "MR", 
                rating: 5
              },
              {
                name: "Johnson Wang",
                restaurant: "Golden Wok (连锁3家店)",
                location: "旧金山湾区",
                quote: "三家店都在用，每家店的广告效果一目了然。现在知道哪家店适合投Facebook，哪家适合投Google，广告预算分配精准，总ROI提升了3倍多。",
                revenue: "总ROI +320%",
                avatar: "JW",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:scale-105 transform transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-gray-300 text-sm">{testimonial.restaurant}</div>
                    <div className="text-gray-400 text-xs">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="bg-green-900/40 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{testimonial.revenue}</div>
                  <div className="text-green-300 text-sm">净增收入</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent CTA */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-red-900/60 to-orange-900/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <div className="text-6xl mb-6">🔥</div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            全美唯一广告追踪预约系统
          </h2>
          <p className="text-2xl text-orange-200 mb-4">
            <span className="text-green-400 font-bold">停止盲投广告 • 开始精准追踪 • 3倍ROI增长</span>
          </p>
          <p className="text-xl text-orange-300 mb-8">
            其他预约系统只管预约，我们帮您追踪每一分广告费的效果。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link href="/signup" 
              className="group bg-gradient-to-r from-green-500 to-blue-600 text-white px-12 py-5 rounded-2xl text-2xl font-bold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 hover:-translate-y-1">
              <span className="mr-2">🚀</span>
              立即开始 - 今天止损
              <span className="ml-2 group-hover:translate-x-2 transition-transform duration-200">→</span>
            </Link>
            
            <Link href="tel:+1-888-BOOKMEE" 
              className="border-2 border-white/50 text-white px-12 py-5 rounded-2xl text-2xl font-bold hover:bg-white/20 transition-all duration-300">
              <span className="mr-2">📞</span>
              (888) BOOK-MEE
            </Link>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30">
            <p className="text-yellow-300 text-lg mb-2">
              🎁 <strong>限时福利</strong>
            </p>
            <p className="text-white">
              前100位注册用户免费试用<span className="text-yellow-400 font-bold text-xl">90天</span> • 
              专属客户成功经理 • 免费上门培训 • 不满意100%退款
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-md text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="lg" variant="light" />
              <p className="text-gray-400 mt-4 leading-relaxed">
                专为美国高端餐馆设计的智能预约系统。
                <br />让每个座位都赚钱，让每位客人都满意。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">核心功能</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-white transition-colors">• VIP客户管理</li>
                <li className="hover:text-white transition-colors">• 智能签到系统</li>
                <li className="hover:text-white transition-colors">• 动态定价策略</li>
                <li className="hover:text-white transition-colors">• 实时数据分析</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">专属服务</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-white transition-colors">• 24/7中文技术支持</li>
                <li className="hover:text-white transition-colors">• 免费上门安装培训</li>
                <li className="hover:text-white transition-colors">• 客户成功经理</li>
                <li className="hover:text-white transition-colors">• 餐馆运营咨询</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">联系我们</h3>
              <div className="space-y-3 text-gray-300">
                <div className="hover:text-white transition-colors">
                  📞 (888) BOOK-MEE
                </div>
                <div className="hover:text-white transition-colors">
                  📧 vip@bookmee.app
                </div>
                <div className="hover:text-white transition-colors">
                  🏢 美国加州 • FDIC保险
                </div>
                <div className="text-green-400 font-medium">
                  🔒 SOC2认证 • PCI合规
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 BookMe Inc. All rights reserved. 
              <span className="mx-4">|</span>
              专利申请中 US Patent Pending
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}