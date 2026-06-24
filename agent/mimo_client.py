"""
Mimo API Client for 出海避雷针
从环境变量 MIMO_API_KEY 读取 API Key
支持Demo模式：API不可用时自动返回演示数据
"""
import os
import json
import httpx
import asyncio
from typing import List, Dict, AsyncGenerator

API_KEY = os.environ.get("MIMO_API_KEY", "tp-ck7e27f72ecbe3f5-0aae5c4c7c0s0sl6d")
BASE_URL = "https://token-plan-cn.xiaomimimo.com/v1"
MODEL = "mimo-v2.5-pro"

DEMO_MODE = os.environ.get("DEMO_MODE", "auto").lower()


DEMO_RESPONSES = {
    "cultural": """## 🎯 文化雷区检测报告
━━━━━━━━━━━━━━━━
**目标市场：** 美国
**产品/品牌：** 示例产品
**检测时间：** 2026-06-23
━━━━━━━━━━━━━━━━

### 【风险等级】：🟡 中风险

### 【问题诊断】
产品设计和营销内容存在2项中等文化风险，主要涉及颜色象征和数字禁忌，需在上线前进行本土化调整。

### 【详细分析】

#### 🟡 中风险：颜色象征
**问题：** 产品主色调使用了大量绿色
**说明：** 在美国文化中，绿色虽然与环保、健康相关，但也与金钱、嫉妒有关联。在产品包装上大面积使用绿色可能让消费者产生"廉价"或"不健康食品"的联想。
**真实案例：** 某中国品牌在美国推出绿色包装的保健品，被消费者误以为是"廉价超市自有品牌"，销量远低于预期。

#### 🟡 中风险：数字禁忌
**问题：** 产品型号包含数字"13"
**说明：** 在西方文化中，13被认为是不吉利的数字（triskaidekaphobia），很多建筑没有13楼，航空公司没有13排。
**真实案例：** 某电子产品品牌推出"X13"型号，在北美市场销量比其他地区低23%，市场调研显示"数字不吉利"是主要原因之一。

#### 🟢 安全：宗教禁忌
**说明：** 产品设计和营销内容未涉及宗教敏感元素，符合美国多元宗教社会的要求。

#### 🟢 安全：动物图案
**说明：** 使用的动物图案（熊猫）在美国文化中代表友好、可爱，无负面含义。

#### 🟢 安全：肢体语言
**说明：** 营销图片中展示的手势和肢体语言符合美国文化规范，无冒犯性动作。

#### 🟢 安全：性别文化
**说明：** 产品定位和广告表现中性，符合美国性别平等观念。

#### 🟢 安全：历史敏感
**说明：** 未涉及任何历史敏感话题。

### 【修改/行动建议】

1. **调整产品主色调**：将绿色面积减少至30%以下，搭配蓝色（信任）或橙色（活力）作为辅助色
2. **修改产品型号**：将"X13"改为"X12S"或"X14"，避开13这个数字
3. **本土化包装文案**：增加"Made with care"、"Quality guaranteed"等美国消费者熟悉的话术
4. **文化测试**：建议在上线前邀请5-10名美国本地用户进行文化适配度测试

### 【法规/案例依据】
- 参考案例：2023年某中国3C品牌美国市场颜色策略调整案例
- 学术依据：《跨文化营销心理学》中关于色彩偏好的地区差异研究
- 行业数据：北美市场消费者对产品颜色的敏感度调研（2024）

### 【下一步建议】
→ 进行【合规雷达扫描】确认产品认证要求
→ 进行【本土化改造】生成完整的美国市场适配方案
→ 查看【踩雷故事】了解更多真实案例

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{
  "score": 72,
  "breakdown": [
    {"item": "颜色象征风险", "type": "deduct", "change": -15},
    {"item": "数字禁忌风险", "type": "deduct", "change": -13},
    {"item": "宗教禁忌安全", "type": "bonus", "change": +5},
    {"item": "动物图案安全", "type": "bonus", "change": +5}
  ],
  "radar": {
    "cultural": 72,
    "compliance": 0,
    "brand": 80,
    "localization": 65,
    "visual": 70,
    "logistics": 0
  }
}
```""",

    "compliance": """## 📡 合规雷达扫描报告
━━━━━━━━━━━━━━━━
**目标市场：** 欧盟
**产品品类：** 消费电子
**业务模式：** B2C跨境电商
━━━━━━━━━━━━━━━━

### 【风险等级】：🟠 中高风险

### 【问题诊断】
该产品进入欧盟市场需要完成多项强制合规事项，涉及数据隐私、产品认证和电商合规三大领域，预计周期8-12周，费用约15,000-25,000欧元。

### 【详细分析】

#### 🔴 高风险：产品认证（CE / RoHS / REACH）
**必须完成：**
- CE认证：欧盟强制安全认证，需由公告机构（Notified Body）出具
- RoHS指令：限制有害物质使用，需提供测试报告
- REACH法规：化学品注册评估，需确认SVHC（高度关注物质）清单
- WEEE指令：电子废弃物回收，需注册并支付回收费
- 电池指令：如含电池，需额外注册电池标识
**难度：** ★★★★☆
**成本：** €8,000 - €15,000
**周期：** 6-10周

#### 🔴 高风险：数据隐私（GDPR）
**必须完成：**
- 隐私政策：需符合GDPR要求，明确数据收集和使用方式
- Cookie同意：需获得用户明确同意后才能设置非必要Cookie
- 数据处理协议（DPA）：如使用第三方服务商（如支付、物流）
- 数据主体权利：支持用户访问、更正、删除个人数据
- 欧盟代表：如无欧盟实体，需指定欧盟境内代表
**难度：** ★★★☆☆
**成本：** €2,000 - €5,000
**周期：** 2-4周

#### 🟡 中风险：广告法规
**注意事项：**
- 禁止虚假宣传：所有产品宣称需有科学依据
- 价格标注：需显示含税总价，不得隐藏费用
- 用户评价：不得购买或操纵用户评论（UCP指令）
- 比较广告：需客观、真实，不得贬低竞争对手
**难度：** ★★☆☆☆
**成本：** €1,000 - €3,000
**周期：** 1-2周

#### 🟡 中风险：电商合规
**必须完成：**
- 平台入驻：Amazon/eBay等平台需提交合规文件
- 进口商标识：产品和包装上需标注欧盟进口商信息
- 退货政策：欧盟消费者享有14天无理由退货权
- 语言要求：产品说明和客服需支持当地语言
**难度：** ★★★☆☆
**成本：** €2,000 - €4,000
**周期：** 2-4周

#### 🟢 低风险：知识产权
**建议完成：**
- 欧盟商标注册：保护品牌在欧盟27国的权益
- 外观设计注册：如产品外观有独特性
**难度：** ★★☆☆☆
**成本：** €1,000 - €3,000
**周期：** 4-8周

### 【修改/行动建议】

1. **立即启动（本周）**：联系CE认证机构，提交产品资料开始认证流程
2. **第1-2周**：完成GDPR合规文件，指定欧盟代表
3. **第2-4周**：准备平台入驻资料，完成电商合规改造
4. **第4-8周**：等待CE认证，同步进行商标注册
5. **第8-12周**：认证完成后，开始小批量试销

### 【法规/案例依据】
- 欧盟CE认证指令：2014/35/EU（LVD）、2014/30/EU（EMC）
- GDPR法规：EU 2016/679
- 案例：2023年某跨境电商因GDPR不合规被罚款€120万
- RoHS指令：2011/65/EU及修订案

### 【下一步建议】
→ 进行【关税估算】计算进口成本
→ 进行【产品准入】获取详细认证清单
→ 查看【危机处置】了解合规风险应对方案

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{
  "score": 55,
  "breakdown": [
    {"item": "产品认证高风险", "type": "deduct", "change": -20},
    {"item": "数据隐私高风险", "type": "deduct", "change": -15},
    {"item": "广告法规中风险", "type": "deduct", "change": -5},
    {"item": "电商合规中风险", "type": "deduct", "change": -5}
  ],
  "radar": {
    "cultural": 0,
    "compliance": 55,
    "brand": 70,
    "localization": 60,
    "visual": 0,
    "logistics": 65
  }
}
```""",

    "store_checkup": """## 🏪 店铺AI体检报告
━━━━━━━━━━━━━━━━
**店铺名称：** ExampleStore Official
**平台：** Amazon US
**检测时间：** 2026-06-23 02:08:00
━━━━━━━━━━━━━━━━

### 📊 店铺健康度评分：76/100

### 🔴 高危问题（立即处理）：

1. **Listing标题含绝对化用语** — 违反FTC广告法规 — 建议将"Best"改为"Top Rated"或"Best Selling"
   - 风险说明：美国FTC禁止使用"best"、"#1"等无法证实的绝对化宣传用语
   - 涉及ASIN：B0XXXX1, B0XXXX2

2. **产品图片缺少合规标识** — 可能被下架 — 建议在主图或详情页添加FCC/CE认证标志
   - 风险说明：电子产品需在详情页展示合规认证信息，否则可能被平台下架
   - 涉及ASIN：B0XXXX3, B0XXXX5

3. **5个SKU缺少警告标签** — 安全合规风险 — 建议补充电池安全警示语和图示
   - 风险说明：含电池产品必须有清晰的安全警示，否则存在召回风险

### 🟡 需优化项：

1. **关键词覆盖率不足** → 建议增加"wireless"、"portable"、"compact"等高搜索量关键词
2. **产品描述A+页面缺失** → 建议制作品牌A+页面，可提升转化率15-20%
3. **部分图片分辨率偏低** → 建议所有图片至少1500x1500像素，支持放大功能
4. **问答（Q&A）数量偏少** → 建议主动补充10-15个常见问题及解答
5. **差评回复不够及时** → 建议48小时内回复所有差评，展示品牌负责任态度

### 🟢 表现良好：

1. **店铺评分4.5/5.0**：高于同类目平均水平（4.2）
2. **好评率92%**：用户满意度较高
3. **定价策略合理**：价格处于同类产品中间偏上，利润率健康
4. **品牌备案完成**：已完成Amazon Brand Registry 2.0
5. **物流时效达标**：FBA配送时效稳定在2-3天

### 💡 AI改进建议：

- **第1优先级（本周）**：修改所有Listing中的绝对化用语，补充认证标识
- **第2优先级（2周内）**：制作A+页面，优化主图和附图
- **第3优先级（1个月内）**：完善Q&A板块，建立差评回复SOP
- **长期建议**：每周监测竞品动态，每月进行一次关键词优化

### 📈 竞品对比分析：

| 指标 | 你的店铺 | 类目Top 10平均 | 差距 |
|------|----------|---------------|------|
| 评分 | 4.5 | 4.6 | -0.1 |
| 好评率 | 92% | 94% | -2% |
| 均价 | $29.99 | $27.50 | +9% |
| Review数 | 1,234 | 5,678 | -78% |

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{
  "score": 76,
  "breakdown": [
    {"item": "绝对化用语风险", "type": "deduct", "change": -10},
    {"item": "合规标识缺失", "type": "deduct", "change": -8},
    {"item": "警告标签缺失", "type": "deduct", "change": -6},
    {"item": "店铺评分优秀", "type": "bonus", "change": +5},
    {"item": "定价策略合理", "type": "bonus", "change": +3}
  ],
  "radar": {
    "cultural": 70,
    "compliance": 60,
    "brand": 85,
    "localization": 75,
    "visual": 80,
    "logistics": 90
  }
}
```""",

    "product_quick_check": """## 📦 选品快检报告
━━━━━━━━━━━━━━━━
**选品：** 无线蓝牙耳机 TWS
**目标市场：** 美国, 欧盟
━━━━━━━━━━━━━━━━

### ✅ 能否销售：可以销售（需完成合规认证）

### 📋 所需认证：
- **美国**：FCC认证、FDA（如涉及健康宣称）、加州65号提案
- **欧盟**：CE认证（EMC+LVD+RED）、RoHS、REACH、WEEE、电池指令
- **其他**：UL测试报告（电商平台要求）、质检报告

### 💰 预估关税：
- **美国**：HS编码 8517.62.0000，关税税率 2.5%
  - 申报价值$10/个 → 关税$0.25/个
- **欧盟**：HS编码 8517.62.0000，关税税率 0.0%
  - 但需缴纳VAT（约20%）和进口清关费用

### ⚠️ 文化风险：低
- 产品设计中性，无文化禁忌元素
- 包装颜色建议：美国用蓝/黑配色，欧盟用白/灰配色
- 注意：避免使用某些手势图案

### 📊 竞争指数：8/10（竞争激烈）
- Amazon美国站同类产品超过10,000个SKU
- 头部品牌（Apple、Sony、Bose）占据60%市场份额
- 价格战激烈，中低端产品利润被压缩

### 💵 预估利润率：28%
- 成本：$6.5 / 个（出厂价）
- 关税+物流：$2.8 / 个
- 平台佣金+广告：$5.0 / 个
- 售价：$19.99 / 个
- 单件利润：$5.69
- 利润率：28.5%

---

### 【风险等级】：🟡 中风险
### 【综合建议】：

**可以出海，但需差异化竞争。**

**关键注意事项：**
1. **合规先行**：务必在发货前完成FCC/CE认证，避免被扣货
2. **差异化定位**：建议走细分市场（如运动款、游戏款、老年款），避开正面价格战
3. **品牌建设**：尽早注册美国商标，做品牌备案，保护自己的Listing
4. **库存策略**：初期小批量试销（500-1000个），验证市场后再放大
5. **专利排查**：务必做专利检索，避免外观或实用新型专利侵权

**建议下一步：**
→ 进行【文化雷区检测】获取详细文化适配建议
→ 进行【合规雷达扫描】获取完整合规清单
→ 进行【知识产权预检】排查专利侵权风险

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{
  "score": 65,
  "breakdown": [
    {"item": "竞争激烈扣分项", "type": "deduct", "change": -15},
    {"item": "合规要求较多", "type": "deduct", "change": -10},
    {"item": "利润率健康", "type": "bonus", "change": +5},
    {"item": "市场需求大", "type": "bonus", "change": +5}
  ],
  "radar": {
    "cultural": 85,
    "compliance": 60,
    "brand": 50,
    "localization": 75,
    "visual": 80,
    "logistics": 70
  }
}
```""",

    "tariff": """## 💰 关税与税务估算报告
━━━━━━━━━━━━━━━━
**HS编码：** 8517.62.0000（蓝牙耳机）
**出口国：** 中国
**目的国：** 美国
**申报价值：** $1,000 USD
**物流方式：** 海运
━━━━━━━━━━━━━━━━

### 【风险等级】：🟢 低风险

### 【问题诊断】
该产品出口美国关税较低（2.5%），且当前无额外加征关税，整体税负可控。需注意301关税排除期是否延续，以及进口环节的其他税费。

### 【详细分析】

#### 💰 基础关税
- **关税税率**：2.5%（最惠国税率 MFN Rate）
- **关税金额**：$25.00 USD
- **税则号列**：8517.62.0000

#### 💰 额外税种
- **301关税**：0%（当前排除期内，如排除到期可能恢复25%）
- **反倾销/反补贴税**：无
- **关税配额**：不适用

#### 💰 流转税（美国）
- **销售税**：由各州征收，进口环节不征收
  - 加州：7.25% + 地方税
  - 纽约州：4% + 地方税
  - 德州：6.25% + 地方税
- **说明**：销售税在销售环节向消费者收取，由卖家代扣代缴

#### 💰 其他费用
- **清关费**：约 $100 - $150 / 票
- **港口处理费（MPF）**：货值的0.3464%，约 $3.46
- **海关债券费**：约 $50 / 票（年债券更划算）
- **仓储费**：约 $50 - $100 / 立方米 / 月
- **送货费**：根据目的地不同，约 $100 - $300

#### 💰 FTA优惠（自由贸易协定）
- **中关FTA**：暂无
- **其他**：可考虑通过东盟转口，享受部分关税优惠（需满足原产地规则）

#### 💰 综合到岸成本估算
| 项目 | 金额 | 占比 |
|------|------|------|
| 采购成本 | $1,000.00 | 75.2% |
| 国际运费（海运） | $150.00 | 11.3% |
| 基础关税 | $25.00 | 1.9% |
| 清关费 | $120.00 | 9.0% |
| 其他杂费 | $35.00 | 2.6% |
| **到岸总成本** | **$1,330.00** | **100%** |

### 【修改/行动建议】

1. **关税筹划**：关注301关税排除期进展，如到期可考虑通过越南/马来转口（需满足原产地规则）
2. **物流优化**：发货量稳定后，可签订年框物流合同，降低15-20%物流成本
3. **海关合规**：确保HS编码归类准确，申报价值真实，避免低报被查
4. **债券优化**：年进口额超过$50万建议购买年度海关债券，比单次更划算
5. **州税合规**：销售额达到各州门槛后（一般$10万/年或200单），需注册销售税许可

### 【法规/案例依据】
- 美国HTS税则：8517.62.0000
- 301关税清单：USTR List 4A（当前部分排除）
- 案例：2023年某深圳卖家因HS编码归类错误，被海关补税+罚款共$23万
- MPF费率：19 CFR 24.23

### 【下一步建议】
→ 进行【产品准入】获取美国市场认证清单
→ 进行【物流合规】确认运输和清关要求
→ 查看【踩雷故事】了解关税合规案例

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{
  "score": 85,
  "breakdown": [
    {"item": "基础关税低", "type": "bonus", "change": +10},
    {"item": "无反倾销税", "type": "bonus", "change": +5},
    {"item": "301关税不确定性", "type": "deduct", "change": -10},
    {"item": "销售税合规要求", "type": "deduct", "change": -5}
  ],
  "radar": {
    "cultural": 0,
    "compliance": 80,
    "brand": 0,
    "localization": 0,
    "visual": 0,
    "logistics": 85
  }
}
```""",

    "default": """## ⚡ 出海避雷针检测报告
━━━━━━━━━━━━━━━━
**检测类型：** 综合检测
**检测时间：** 2026-06-23
━━━━━━━━━━━━━━━━

### 【风险等级】：🟡 中风险

### 【问题诊断】
基于您提供的信息，该产品/业务存在中等程度的出海风险，主要集中在合规认证和本土化两个维度。建议在正式出海前完成相关准备工作。

### 【详细分析】

#### 🟡 合规风险
**说明：** 不同国家和地区对产品有不同的认证要求，未获得必要认证可能导致货物被扣、罚款甚至下架。
**建议：** 提前了解目标市场的强制认证清单，预留足够的认证周期和预算。

#### 🟡 文化风险
**说明：** 不同文化背景下，颜色、数字、图案等可能有不同的含义，不注意可能冒犯消费者。
**建议：** 进行文化雷区检测，确保产品设计和营销内容符合目标市场文化。

#### 🟢 物流风险
**说明：** 普通产品物流路线成熟，时效和成本可控。
**建议：** 根据产品特性选择合适的物流方式（快递/空运/海运）。

#### 🟢 支付风险
**说明：** 主流跨境支付方式（PayPal、信用卡、本地支付）覆盖全面。
**建议：** 提供多种支付方式，提高转化率。

### 【修改/行动建议】

1. 进行完整的合规雷达扫描，明确所需认证
2. 进行文化雷区检测，避免文化冲突
3. 计算关税和物流成本，制定定价策略
4. 优化产品Listing，进行本土化改造
5. 小批量试销，验证市场后再放大

### 【下一步建议】
→ 文化雷区检测
→ 合规雷达扫描
→ 关税估算
→ 本土化改造方案

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{
  "score": 70,
  "breakdown": [
    {"item": "合规中风险", "type": "deduct", "change": -15},
    {"item": "文化中风险", "type": "deduct", "change": -10},
    {"item": "物流安全", "type": "bonus", "change": +5}
  ],
  "radar": {
    "cultural": 70,
    "compliance": 65,
    "brand": 75,
    "localization": 65,
    "visual": 80,
    "logistics": 85
  }
}
```"""
}


MARKET_INFO = {
    "美国": {"flag": "🇺🇸", "religion": "基督教为主", "language": "英语", "currency": "美元 USD", "famous_color": "蓝/白/红"},
    "欧盟": {"flag": "🇪🇺", "religion": "基督教/天主教", "language": "多语言", "currency": "欧元 EUR", "famous_color": "蓝/金"},
    "日本": {"flag": "🇯🇵", "religion": "神道教/佛教", "language": "日语", "currency": "日元 JPY", "famous_color": "白/红"},
    "英国": {"flag": "🇬🇧", "religion": "基督教", "language": "英语", "currency": "英镑 GBP", "famous_color": "红/白/蓝"},
    "德国": {"flag": "🇩🇪", "religion": "基督教", "language": "德语", "currency": "欧元 EUR", "famous_color": "黑/红/金"},
    "法国": {"flag": "🇫🇷", "religion": "天主教", "language": "法语", "currency": "欧元 EUR", "famous_color": "蓝/白/红"},
    "韩国": {"flag": "🇰🇷", "religion": "基督教/佛教", "language": "韩语", "currency": "韩元 KRW", "famous_color": "白/红/蓝"},
    "澳大利亚": {"flag": "🇦🇺", "religion": "基督教", "language": "英语", "currency": "澳元 AUD", "famous_color": "绿/金"},
    "加拿大": {"flag": "🇨🇦", "religion": "基督教", "language": "英语/法语", "currency": "加元 CAD", "famous_color": "红/白"},
    "新加坡": {"flag": "🇸🇬", "religion": "多元宗教（佛教/伊斯兰教/基督教/印度教）", "language": "英语/华语/马来语/泰米尔语", "currency": "新加坡元 SGD", "famous_color": "红/白"},
    "印尼": {"flag": "🇮🇩", "religion": "伊斯兰教为主", "language": "印尼语", "currency": "印尼盾 IDR", "famous_color": "红/白"},
    "马来西亚": {"flag": "🇲🇾", "religion": "伊斯兰教为主", "language": "马来语", "currency": "马币 MYR", "famous_color": "黄/蓝/白/红"},
    "越南": {"flag": "🇻🇳", "religion": "佛教为主", "language": "越南语", "currency": "越南盾 VND", "famous_color": "红/黄"},
    "泰国": {"flag": "🇹🇭", "religion": "佛教为主", "language": "泰语", "currency": "泰铢 THB", "famous_color": "红/白/蓝"},
    "沙特阿拉伯": {"flag": "🇸🇦", "religion": "伊斯兰教（瓦哈比派）", "language": "阿拉伯语", "currency": "沙特里亚尔 SAR", "famous_color": "绿/白"},
    "阿联酋": {"flag": "🇦🇪", "religion": "伊斯兰教", "language": "阿拉伯语/英语", "currency": "迪拉姆 AED", "famous_color": "红/绿/白/黑"},
    "巴西": {"flag": "🇧🇷", "religion": "天主教", "language": "葡萄牙语", "currency": "雷亚尔 BRL", "famous_color": "绿/黄/蓝"},
    "墨西哥": {"flag": "🇲🇽", "religion": "天主教", "language": "西班牙语", "currency": "比索 MXN", "famous_color": "绿/白/红"},
    "印度": {"flag": "🇮🇳", "religion": "印度教为主", "language": "印地语/英语", "currency": "卢比 INR", "famous_color": "橙/白/绿"},
    "俄罗斯": {"flag": "🇷🇺", "religion": "东正教", "language": "俄语", "currency": "卢布 RUB", "famous_color": "白/蓝/红"},
}

CATEGORY_CULTURAL_TIPS = {
    "食品": {
        "high_risk": ["宗教饮食禁忌", "成分标注要求", "保质期格式"],
        "example_issue": "猪肉成分、酒精成分、清真认证",
        "risk_level": "中高风险"
    },
    "零食": {
        "high_risk": ["宗教饮食禁忌", "食品添加剂", "儿童包装要求"],
        "example_issue": "含明胶成分来源、过敏原标注、营养声称规范",
        "risk_level": "中高风险"
    },
    "3C": {
        "high_risk": ["认证要求", "包装语言", "安全标识"],
        "example_issue": "插头规格、电压标识、电池运输要求",
        "risk_level": "中风险"
    },
    "服装": {
        "high_risk": ["宗教服饰禁忌", "尺码标准", "洗涤标签"],
        "example_issue": "暴露程度、材质成分标注、燃烧性能要求",
        "risk_level": "中风险"
    },
    "美妆": {
        "high_risk": ["成分法规", "动物实验", "清真认证"],
        "example_issue": "禁止成分清单、功效宣称限制、包装文字方向",
        "risk_level": "中高风险"
    },
    "家居": {
        "high_risk": ["安全标准", "材质要求", "电气安全"],
        "example_issue": "防火标准、儿童安全包装、标签要求",
        "risk_level": "中风险"
    },
    "默认": {
        "high_risk": ["文化符号禁忌", "包装设计", "营销话术"],
        "example_issue": "颜色象征、数字禁忌、图案寓意",
        "risk_level": "中风险"
    }
}


def extract_info(messages: List[Dict[str, str]]) -> dict:
    """从消息中提取市场、产品、品类等信息"""
    full_text = "\n".join([m.get("content", "") for m in messages])
    
    info = {
        "market": "美国",
        "product": "示例产品",
        "category": "默认",
        "content_type": "产品包装",
        "hscode": "8517.62.0000",
        "store_url": "",
        "platform": "Amazon",
        "origin": "中国",
        "declared_value": "1,000",
        "incoterm": "FOB",
        "business_model": "B2C跨境电商",
        "markets": "美国",
    }
    
    for line in full_text.split("\n"):
        line = line.strip()
        if "目标市场：" in line or "市场：" in line:
            m = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if m and m != "":
                info["market"] = m
        elif "产品品类：" in line or "品类：" in line or "类目：" in line:
            c = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if c and c != "":
                info["category"] = c
                info["product"] = c
        elif "产品：" in line or "产品类型：" in line or "选品：" in line or "选品名称" in line or "商品：" in line or "品牌：" in line:
            p = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if p and p != "":
                info["product"] = p
        elif "类型：" in line or "内容类型：" in line or "检测类型：" in line:
            t = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if t and t != "":
                info["content_type"] = t
        elif "HS编码：" in line or "hscode：" in line.lower() or "hs code" in line.lower():
            h = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if h and h != "":
                info["hscode"] = h
        elif "店铺URL：" in line or "店铺链接：" in line or "选品名称/URL：" in line:
            u = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if u and u != "":
                info["store_url"] = u
        elif "平台：" in line:
            p = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if p and p != "":
                info["platform"] = p
        elif "出口国：" in line or "发货国：" in line or "原产国：" in line:
            o = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if o and o != "":
                info["origin"] = o
        elif "申报价值：" in line or "货值：" in line:
            v = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            v = v.replace(" USD", "").replace("USD", "").replace("$", "").strip()
            if v and v != "0" and v != "":
                info["declared_value"] = v
        elif "贸易方式：" in line or "成交方式：" in line or "incoterm" in line.lower():
            i = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if i and i != "":
                info["incoterm"] = i
        elif "业务模式：" in line:
            b = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if b and b != "":
                info["business_model"] = b
        elif "目标市场：" in line and "," in line:
            m = line.split("：")[-1].strip() if "：" in line else line.split(":")[-1].strip()
            if m and m != "":
                info["markets"] = m
                first_market = m.split(",")[0].split("、")[0].split(" ")[0].strip()
                if first_market:
                    info["market"] = first_market
    
    category_key = "默认"
    for cat_key in ["食品", "零食", "3C", "服装", "美妆", "家居"]:
        if cat_key in info["category"] or cat_key in info["product"]:
            category_key = cat_key
            break
    info["category_key"] = category_key
    
    return info


def get_market_info(market: str) -> dict:
    """获取市场信息"""
    for key, val in MARKET_INFO.items():
        if key in market or market in key:
            return val
    return MARKET_INFO["美国"]


def generate_cultural_demo(info: dict) -> str:
    """生成文化雷区检测的演示报告"""
    market = info["market"]
    product = info["product"]
    m_info = get_market_info(market)
    cat_tips = CATEGORY_CULTURAL_TIPS.get(info["category_key"], CATEGORY_CULTURAL_TIPS["默认"])
    
    from datetime import datetime
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    risk_icon = "🟠" if "高" in cat_tips["risk_level"] else "🟡"
    
    high_risks = "\n".join([
        f"  - {r}" for r in cat_tips["high_risk"]
    ])
    
    return f"""## 🎯 文化雷区检测报告
━━━━━━━━━━━━━━━━
**目标市场：** {m_info['flag']} {market}
**产品/品牌：** {product}
**内容类型：** {info['content_type']}
**检测时间：** {now}
━━━━━━━━━━━━━━━━

### 【风险等级】：{risk_icon} {cat_tips['risk_level']}

### 【问题诊断】
{product}进入{market}市场存在一定文化风险。{market}是一个以{m_info['religion']}为主的社会，主要语言为{m_info['language']}，使用{m_info['currency']}。{cat_tips['example_issue']}等方面需要特别注意。

### 【详细分析】

#### 🟡 中风险：宗教禁忌
**问题：** 宗教相关的饮食/行为禁忌
**说明：** {market}主要宗教为{m_info['religion']}。{cat_tips['example_issue']}等可能涉及宗教敏感问题。
**真实案例：** 某食品品牌在穆斯林国家推出含猪肉成分的零食，被全面下架并引发抵制。
**建议：** 仔细核查产品成分，必要时获取清真认证（Halal）或其他宗教认证。

#### 🟡 中风险：颜色象征
**问题：** 产品主色调选择需符合当地文化
**说明：** {market}偏好的颜色是{m_info['famous_color']}。不同颜色在不同文化中有不同含义，例如：
  - 红色：在中国代表喜庆，在部分国家代表危险/革命
  - 白色：在西方代表纯洁，在部分亚洲国家代表丧葬
  - 绿色：在伊斯兰国家代表神圣，在部分国家代表嫉妒
**真实案例：** 某中国品牌在{market}推出全绿色包装产品，被消费者误认为是廉价商品，销量低于预期30%。

#### 🟡 中风险：数字禁忌
**问题：** 产品型号、价格、数量中的数字含义
**说明：** 不同文化对数字有不同偏好：
  - 4：在中日韩等国不吉利（谐音"死"）
  - 13：在西方国家不吉利
  - 8：在中国是吉利数字（谐音"发"）
  - 7：在很多文化中是幸运数字
**真实案例：** 某品牌推出"X4"型号产品，在日本市场销量远低于其他型号，市场调研显示"数字不吉利"是主因之一。

#### 🟢 安全：动物图案
**说明：** 需确认使用的动物图案在{market}文化中无负面含义。
**建议：** 避免使用在当地文化中有负面或宗教意义的动物图案。

#### 🟢 安全：肢体语言
**说明：** 营销图片中的手势和动作需符合{market}文化规范。
**建议：** 使用本地模特拍摄广告，避免使用可能引起误解的手势。

#### 🟢 安全：性别文化
**说明：** 产品定位和广告表现需符合{market}的性别观念。
**建议：** 根据当地文化调整广告中男女角色的呈现方式。

#### 🟢 安全：历史敏感
**说明：** 产品设计和营销内容未涉及{market}的历史敏感话题。
**建议：** 避免使用可能引发历史争议的符号、旗帜、地图等元素。

### 【修改/行动建议】

1. **成分核查**：针对{market}的宗教要求，核查{product}的全部成分，避免禁忌成分
2. **包装配色调整**：参考{market}偏好的{m_info['famous_color']}色系，调整包装主色调
3. **型号/价格避忌**：检查产品型号、定价、包装规格中的数字，避开当地禁忌数字
4. **本土化文案**：将产品说明翻译为地道的{m_info['language']}，避免直译造成误解
5. **文化测试**：上线前邀请3-5名{market}本地用户进行文化适配度测试

### 【法规/案例依据】
- 参考案例：2024年某品牌进入中东市场的文化适配案例
- 学术依据：《跨文化营销心理学》
- 行业数据：{market}消费者文化敏感度调研报告（2025）

### 【下一步建议】
→ 进行【合规雷达扫描】确认产品认证要求
→ 进行【本土化改造】生成完整的{market}市场适配方案
→ 查看【踩雷故事】了解更多真实案例

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{{
  "score": 68,
  "breakdown": [
    {{"item": "宗教禁忌风险", "type": "deduct", "change": -12}},
    {{"item": "颜色象征风险", "type": "deduct", "change": -10}},
    {{"item": "数字禁忌风险", "type": "deduct", "change": -10}},
    {{"item": "动物图案安全", "type": "bonus", "change": +5}},
    {{"item": "肢体语言安全", "type": "bonus", "change": +5}}
  ],
  "radar": {{
    "cultural": 68,
    "compliance": 0,
    "brand": 75,
    "localization": 65,
    "visual": 70,
    "logistics": 0
  }}
}}
```"""


def generate_compliance_demo(info: dict) -> str:
    """生成合规雷达扫描的演示报告"""
    market = info["market"]
    product = info["product"]
    m_info = get_market_info(market)
    cat_tips = CATEGORY_CULTURAL_TIPS.get(info["category_key"], CATEGORY_CULTURAL_TIPS["默认"])
    
    from datetime import datetime
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    biz_model = info.get("business_model", "B2C跨境电商")
    if "业务模式：" in "".join([f"{k}:{v}" for k,v in info.items()]):
        pass
    
    return f"""## 📡 合规雷达扫描报告
━━━━━━━━━━━━━━━━
**目标市场：** {m_info['flag']} {market}
**产品品类：** {product}
**业务模式：** {biz_model}
**检测时间：** {now}
━━━━━━━━━━━━━━━━

### 【风险等级】：🟠 中高风险

### 【问题诊断】
{product}进入{market}市场需要完成多项强制合规事项，涉及产品认证、数据隐私和电商合规三大领域，预计周期6-10周，费用约$5,000-$15,000。{cat_tips['example_issue']}等方面需要特别注意。

### 【详细分析】

#### 🔴 高风险：产品认证
**必须完成：**
- 安全认证：{market}市场强制安全认证（如CE/FCC/PSE等）
- 环保认证：RoHS / REACH等有害物质限制
- 标签要求：当地语言的产品标签、警示语
- 说明书：当地语言的使用手册和安全说明
**难度：** ★★★★☆
**成本：** $3,000 - $10,000
**周期：** 4-8周

#### 🔴 高风险：数据隐私
**必须完成：**
- 隐私政策：符合{market}当地数据保护法规
- Cookie同意：需获得用户明确同意
- 用户数据权利：支持访问、更正、删除个人数据
- 数据存储：符合当地数据存储和传输要求
**难度：** ★★★☆☆
**成本：** $500 - $2,000
**周期：** 1-2周

#### 🟡 中风险：广告法规
**注意事项：**
- 禁止虚假宣传：所有产品宣称需有科学依据
- 价格标注：需显示含税总价，不得隐藏费用
- 用户评价：不得购买或操纵用户评论
- 比较广告：需客观、真实，不得贬低竞争对手
**难度：** ★★☆☆☆
**成本：** $300 - $1,000
**周期：** 1周

#### 🟡 中风险：电商合规
**必须完成：**
- 平台入驻：主流平台需提交合规文件
- 进口商标识：产品和包装上需标注进口商信息
- 退货政策：需符合当地消费者权益保护法
- 语言要求：产品说明和客服需支持当地语言
**难度：** ★★★☆☆
**成本：** $500 - $2,000
**周期：** 2-4周

#### 🟢 低风险：知识产权
**建议完成：**
- 商标注册：保护品牌在{market}的权益
- 外观设计：如产品外观有独特性
**难度：** ★★☆☆☆
**成本：** $500 - $3,000
**周期：** 4-8个月

### 【修改/行动建议】

1. **立即启动（本周）**：联系认证机构，提交产品资料开始认证流程
2. **第1-2周**：完成隐私政策和数据合规文件
3. **第2-4周**：准备平台入驻资料，完成电商合规改造
4. **第4-8周**：等待产品认证，同步进行商标注册
5. **第8-10周**：认证完成后，开始小批量试销

### 【法规/案例依据】
- 参考案例：2024年某品牌进入{market}市场的合规案例
- 行业数据：{market}市场合规成本调研报告（2025）
- 案例：某跨境电商因不合规被罚款$20万

### 【下一步建议】
→ 进行【关税估算】计算进口成本
→ 进行【产品准入】获取详细认证清单
→ 查看【危机处置】了解合规风险应对方案

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{{
  "score": 58,
  "breakdown": [
    {{"item": "产品认证高风险", "type": "deduct", "change": -20}},
    {{"item": "数据隐私高风险", "type": "deduct", "change": -12}},
    {{"item": "广告法规中风险", "type": "deduct", "change": -5}},
    {{"item": "电商合规中风险", "type": "deduct", "change": -5}}
  ],
  "radar": {{
    "cultural": 0,
    "compliance": 58,
    "brand": 70,
    "localization": 60,
    "visual": 0,
    "logistics": 65
  }}
}}
```"""


def generate_product_quick_check_demo(info: dict) -> str:
    """生成选品快检的演示报告"""
    product = info["product"]
    market_str = info.get("markets", info["market"])
    m_info = get_market_info(info["market"])
    
    from datetime import datetime
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    return f"""## 📦 选品快检报告
━━━━━━━━━━━━━━━━
**选品：** {product}
**目标市场：** {market_str}
**检测时间：** {now}
━━━━━━━━━━━━━━━━

### ✅ 能否销售：可以销售（需完成合规认证）

### 📋 所需认证：
- **{info['market']}**：当地强制安全认证、环保认证
- **其他**：质检报告、产品测试报告

### 💰 预估关税：
- **{info['market']}**：约 2-5% 关税税率
  - 具体税率需确认HS编码

### ⚠️ 文化风险：低
- 产品设计中性，无明显文化禁忌元素
- 建议进行本土化包装和文案适配
- 注意颜色和图案的文化含义

### 📊 竞争指数：7/10（竞争较激烈）
- 同类产品数量较多
- 头部品牌占据一定市场份额
- 建议寻找差异化定位

### 💵 预估利润率：25-35%
- 产品成本：约 30%
- 关税+物流：约 15%
- 平台佣金+广告：约 20-25%
- 净利润率：约 25-35%

---

### 【风险等级】：🟡 中风险
### 【综合建议】：

**可以出海，但需做好准备。**

**关键注意事项：**
1. **合规先行**：务必在发货前完成所有强制认证，避免被扣货
2. **差异化竞争**：建议走细分市场，避开正面价格战
3. **品牌建设**：尽早注册商标，做品牌备案
4. **库存策略**：初期小批量试销，验证市场后再放大
5. **专利排查**：务必做专利检索，避免侵权风险

**建议下一步：**
→ 进行【文化雷区检测】获取详细文化适配建议
→ 进行【合规雷达扫描】获取完整合规清单
→ 进行【知识产权预检】排查专利侵权风险

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{{
  "score": 65,
  "breakdown": [
    {{"item": "竞争激烈扣分项", "type": "deduct", "change": -15}},
    {{"item": "合规要求较多", "type": "deduct", "change": -10}},
    {{"item": "利润率健康", "type": "bonus", "change": +5}},
    {{"item": "市场需求大", "type": "bonus", "change": +5}}
  ],
  "radar": {{
    "cultural": 80,
    "compliance": 60,
    "brand": 55,
    "localization": 70,
    "visual": 75,
    "logistics": 70
  }}
}}
```"""


def generate_tariff_demo(info: dict) -> str:
    """生成关税估算的演示报告"""
    market = info["market"]
    m_info = get_market_info(market)
    hscode = info.get("hscode", "8517.62.0000")
    origin = info.get("origin", "中国")
    declared_value = info.get("declared_value", "1,000")
    incoterm = info.get("incoterm", "FOB")
    
    from datetime import datetime
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    tariff_rate = 2.5
    tariff_amount = float(declared_value.replace(",", "")) * tariff_rate / 100
    
    return f"""## 💰 关税与税务估算报告
━━━━━━━━━━━━━━━━
**HS编码：** {hscode}
**出口国：** {origin}
**目的国：** {m_info['flag']} {market}
**申报价值：** ${declared_value} USD
**贸易方式：** {incoterm}
**检测时间：** {now}
━━━━━━━━━━━━━━━━

### 【风险等级】：🟢 低风险

### 【问题诊断】
该产品出口{market}关税较低（{tariff_rate}%），整体税负可控。需注意额外税种和清关费用，以及当地销售税合规要求。

### 【详细分析】

#### 💰 基础关税
- **关税税率**：{tariff_rate}%（最惠国税率 MFN Rate）
- **关税金额**：${tariff_amount:.2f} USD
- **税则号列**：{hscode}

#### 💰 额外税种
- **特殊关税**：无（当前无加征关税）
- **反倾销/反补贴税**：无
- **关税配额**：不适用

#### 💰 流转税
- **{market}销售税/增值税**：由当地税务机构征收
  - 进口环节一般不征收，销售环节向消费者收取
  - 达到销售门槛后需注册税号并申报

#### 💰 其他费用
- **清关费**：约 $100 - $200 / 票
- **港口处理费**：货值的0.3-0.5%
- **海关债券费**：约 $50 - $100 / 票
- **仓储费**：约 $30 - $80 / 立方米 / 月
- **送货费**：根据目的地不同

#### 💰 FTA优惠（自由贸易协定）
- **中{market}FTA**：暂无或部分产品适用
- **其他**：可考虑通过第三国转口（需满足原产地规则）

#### 💰 综合到岸成本估算
| 项目 | 金额 | 占比 |
|------|------|------|
| 采购成本 | ${declared_value}.00 | 70-75% |
| 国际运费 | $100 - $300 | 8-15% |
| 基础关税 | ${tariff_amount:.2f} | 2-3% |
| 清关杂费 | $150 - $300 | 8-12% |
| **到岸总成本** | **${float(declared_value.replace(',', '')) * 1.25:.2f}** | **100%** |

### 【修改/行动建议】

1. **关税筹划**：关注关税政策变化，必要时考虑转口贸易
2. **物流优化**：发货量稳定后签订年框合同，降低10-20%成本
3. **海关合规**：确保HS编码归类准确，申报价值真实
4. **税务合规**：销售额达到门槛后及时注册税号
5. **保险建议**：建议购买货运保险，降低运输风险

### 【法规/案例依据】
- 参考{market}海关税则：{hscode}
- 案例：某卖家因HS编码归类错误被补税+罚款
- 行业数据：{market}进口清关费用调研报告（2025）

### 【下一步建议】
→ 进行【产品准入】获取{market}市场认证清单
→ 进行【物流合规】确认运输和清关要求
→ 查看【踩雷故事】了解关税合规案例

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{{
  "score": 82,
  "breakdown": [
    {{"item": "基础关税低", "type": "bonus", "change": +10}},
    {{"item": "无反倾销税", "type": "bonus", "change": +5}},
    {{"item": "销售税合规要求", "type": "deduct", "change": -8}},
    {{"item": "清关复杂度", "type": "deduct", "change": -5}}
  ],
  "radar": {{
    "cultural": 0,
    "compliance": 75,
    "brand": 0,
    "localization": 0,
    "visual": 0,
    "logistics": 82
  }}
}}
```"""


def generate_store_checkup_demo(info: dict) -> str:
    """生成店铺体检的演示报告"""
    store_url = info.get("store_url", "https://example-store.com")
    platform = info.get("platform", "Amazon")
    market = info["market"]
    m_info = get_market_info(market)
    product = info.get("product", "电子产品")
    
    from datetime import datetime
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    return f"""## 🏪 店铺AI体检报告
━━━━━━━━━━━━━━━━
**店铺名称：** {platform} {market} 示例店铺
**平台：** {platform} {m_info['flag']}
**店铺URL：** {store_url}
**主营品类：** {product}
**检测时间：** {now}
━━━━━━━━━━━━━━━━

### 📊 店铺健康度评分：74/100

### 🔴 高危问题（立即处理）：

1. **Listing标题含绝对化用语** — 违反广告法规 — 建议修改为客观描述
   - 风险说明：{market}广告法禁止使用"best"、"#1"等无法证实的绝对化用语
   - 涉及商品：3个SKU

2. **产品图片缺少合规标识** — 可能被下架 — 建议添加认证标志和警示语
   - 风险说明：{product}需在详情页展示合规认证信息
   - 涉及商品：5个SKU

3. **缺少当地语言支持** — 消费者体验差 — 建议添加{m_info['language']}客服和说明
   - 风险说明：当地语言支持不足会影响转化率和用户评价

### 🟡 需优化项：

1. **关键词覆盖率不足** → 建议增加当地语言的高搜索量关键词
2. **产品描述A+页面缺失** → 建议制作品牌详情页，提升转化率
3. **部分图片分辨率偏低** → 建议所有图片至少1000x1000像素
4. **问答（Q&A）数量偏少** → 建议主动补充常见问题及解答
5. **差评回复不够及时** → 建议48小时内回复所有差评

### 🟢 表现良好：

1. **店铺评分4.4/5.0**：高于同类目平均水平
2. **好评率91%**：用户满意度较高
3. **定价策略合理**：价格处于同类产品中间位置
4. **物流时效达标**：配送时效稳定
5. **商品分类清晰**：店铺导航和分类结构合理

### 💡 AI改进建议：

- **第1优先级（本周）**：修改所有Listing中的绝对化用语，补充认证标识
- **第2优先级（2周内）**：优化主图和附图，完善产品描述
- **第3优先级（1个月内）**：完善Q&A板块，建立差评回复SOP
- **长期建议**：每周监测竞品动态，每月进行关键词优化

### 📈 竞品对比分析：

| 指标 | 你的店铺 | 类目Top 10平均 | 差距 |
|------|----------|---------------|------|
| 评分 | 4.4 | 4.5 | -0.1 |
| 好评率 | 91% | 93% | -2% |
| 均价 | $$ | 中等 | 持平 |
| Review数 | 中等 | 较多 | 待提升 |

---
出海没有100%零风险，但我们可以帮你把雷区画出来、绕过去。如果需要更具体的文件模板或下一步操作指引，随时告诉我。

```json
{{
  "score": 74,
  "breakdown": [
    {{"item": "绝对化用语风险", "type": "deduct", "change": -10}},
    {{"item": "合规标识缺失", "type": "deduct", "change": -8}},
    {{"item": "语言支持不足", "type": "deduct", "change": -8}},
    {{"item": "店铺评分良好", "type": "bonus", "change": +5}},
    {{"item": "定价合理", "type": "bonus", "change": +3}}
  ],
  "radar": {{
    "cultural": 70,
    "compliance": 60,
    "brand": 75,
    "localization": 65,
    "visual": 75,
    "logistics": 85
  }}
}}
```"""


async def get_demo_response(messages: List[Dict[str, str]]) -> str:
    """根据消息内容返回对应的演示数据"""
    content = json.dumps(messages, ensure_ascii=False).lower()
    info = extract_info(messages)
    
    if "文化" in content or "cultural" in content:
        return generate_cultural_demo(info)
    elif "合规" in content or "compliance" in content:
        return generate_compliance_demo(info)
    elif "店铺" in content or "store" in content or "体检" in content:
        return generate_store_checkup_demo(info)
    elif "选品" in content or "product" in content or "quick" in content:
        return generate_product_quick_check_demo(info)
    elif "关税" in content or "tariff" in content:
        return generate_tariff_demo(info)
    else:
        return DEMO_RESPONSES["default"]


async def demo_stream(messages: List[Dict[str, str]]) -> AsyncGenerator[str, None]:
    """模拟流式输出演示数据"""
    demo_text = await get_demo_response(messages)
    
    chunk_size = 3
    for i in range(0, len(demo_text), chunk_size):
        chunk = demo_text[i:i + chunk_size]
        yield chunk
        await asyncio.sleep(0.01)


async def chat_stream(messages: List[Dict[str, str]]) -> AsyncGenerator[str, None]:
    """
    发送消息到 Mimo API 并返回流式响应
    解析 SSE 格式的流式响应
    如果API不可用，自动降级到Demo模式
    """
    if DEMO_MODE == "true" or DEMO_MODE == "1":
        print("[DEMO MODE] Using demo response (forced)")
        async for chunk in demo_stream(messages):
            yield chunk
        return
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    
    payload = {
        "model": MODEL,
        "messages": messages,
        "stream": True,
    }
    
    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream("POST", f"{BASE_URL}/chat/completions", json=payload, headers=headers) as response:
                if response.status_code == 401:
                    print(f"[WARN] API key invalid (401), falling back to demo mode")
                    async for chunk in demo_stream(messages):
                        yield chunk
                    return
                
                response.raise_for_status()
                
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data = line[6:]
                        if data == "[DONE]":
                            break
                        try:
                            chunk = json.loads(data)
                            if "choices" in chunk and len(chunk["choices"]) > 0:
                                delta = chunk["choices"][0].get("delta", {})
                                content = delta.get("content", "")
                                if content:
                                    yield content
                        except json.JSONDecodeError:
                            continue
                            
    except (httpx.HTTPStatusError, httpx.ConnectError, httpx.TimeoutException) as e:
        print(f"[WARN] API request failed ({e}), falling back to demo mode")
        async for chunk in demo_stream(messages):
            yield chunk
    except Exception as e:
        print(f"[ERROR] Unexpected error: {e}, falling back to demo mode")
        async for chunk in demo_stream(messages):
            yield chunk
