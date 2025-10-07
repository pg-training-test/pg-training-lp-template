## 🔬 A/Bテストの実装（Optimize Next使用）

### テスト実施手順

1. **Optimize Nextでエクスペリエンス作成**
   - エクスペリエンス名: 「ボタン色変更テスト」など
   - 対象URL: GitHub PagesのURL

2. **パターンBの作成**
   - Optimize Nextの視覚エディタを使用
   - カートボタンの色を青（#1E90FF）からオレンジ（#FF6B00）に変更
   - その他の要素変更も可能

3. **自動的に発火するイベント**
   - `experience_impression`イベントが自動発火
   - パラメータ:
     - `exp_variant_string`: `OPTX-[ID]-0`（オリジナル）または`OPTX-[ID]-1`（パターンB）
     - `optx_experience`: エクスペリエンス名
     - `optx_variant`: パターン名

### GA4での確認方法

DebugViewまたはリアルタイムで以下を確認：
- experience_impressionイベント
- exp_variant_stringパラメータでパターンを識別

### BigQueryでの分析
```sql
SELECT
  event_params.value.string_value as variant_id,
  COUNTIF(event_name = 'purchase') / COUNTIF(event_name = 'experience_impression') as cvr
FROM
  `your-project.analytics_XXX.events_*`
CROSS JOIN UNNEST(event_params) as event_params
WHERE
  event_params.key = 'exp_variant_string'
  AND event_name IN ('experience_impression', 'purchase')
GROUP BY
  variant_id
