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


async def get_demo_response(messages: List[Dict[str, str]]) -> str:
    """根据消息内容返回对应的演示数据"""
    content = json.dumps(messages, ensure_ascii=False).lower()
    
    if "文化" in content or "cultural" in content:
        return DEMO_RESPONSES["cultural"]
    elif "合规" in content or "compliance" in content:
        return DEMO_RESPONSES["compliance"]
    elif "店铺" in content or "store" in content or "体检" in content:
        return DEMO_RESPONSES["store_checkup"]
    elif "选品" in content or "product" in content or "quick" in content:
        return DEMO_RESPONSES["product_quick_check"]
    elif "关税" in content or "tariff" in content:
        return DEMO_RESPONSES["tariff"]
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
