# PG Training ECサイト商品詳細ページ テンプレート

PROJECT GROUP新人研修用のECサイト商品詳細ページテンプレートです。

## 🛍️ このリポジトリの目的

- 実践的なECサイトの商品詳細ページでWeb計測・分析を学習
- GA4のEコマース計測の実装練習
- A/Bテストによるコンバージョン改善の体験
- GTM/GA4/BigQuery/Looker Studio/Optimize Nextの統合実践

## 📁 ファイル構成

```
pg-training-ec-template/
├── index.html          # 商品詳細ページのHTML
├── css/
│   └── style.css      # スタイルシート
├── js/
│   └── main.js        # JavaScriptファイル（イベント実装）
└── README.md          # このファイル
```

## 🚀 セットアップ手順

### 1. このリポジトリをFork

1. 右上の「Fork」ボタンをクリック
2. 自分のアカウントにForkを作成
3. リポジトリ名を変更したい場合は変更（例：`my-ec-training`）

### 2. GitHub Pagesを有効化

1. Forkしたリポジトリの「Settings」タブへ
2. 左メニューの「Pages」をクリック
3. Source: 「Deploy from a branch」を選択
4. Branch: 「main」と「/ (root)」を選択
5. 「Save」をクリック

数分後、以下のURLでサイトが公開されます：
```
https://[あなたのユーザー名].github.io/[リポジトリ名]/
```

### 3. GTMコンテナの設定

1. [Google Tag Manager](https://tagmanager.google.com/)にアクセス
2. 新しいコンテナを作成（名前例：`PG Training - [あなたの名前]`）
3. コンテナタイプは「ウェブ」を選択
4. コンテナID（GTM-XXXXXX形式）を取得
5. `index.html`の以下の部分にコンテナスニペットを挿入：
   - `<!-- ※※※ ここにGTMコンテナスニペットを挿入 ※※※ -->`の部分（2箇所）

### 4. GA4プロパティの設定

1. [Google Analytics](https://analytics.google.com/)にアクセス
2. 新しいプロパティを作成
3. プロパティ名：`PG Training - [あなたの名前]`
4. データストリームを作成（ウェブ）
5. ストリームURL：GitHub PagesのURL
6. 測定IDを取得（G-XXXXXXXXXX形式）

### 5. 管理アカウントの追加

各ツールに`training@project-g.co.jp`を追加してください：

#### GTM
- 管理 → ユーザー管理 → ユーザーを追加
- メールアドレス：`training@project-g.co.jp`
- 権限：「表示」

#### GA4
- 管理 → プロパティのアクセス管理 → ユーザーを追加
- メールアドレス：`training@project-g.co.jp`
- 権限：「閲覧者」

#### BigQuery（後で設定）
- IAM → プリンシパルを追加
- メールアドレス：`training@project-g.co.jp`
- ロール：「BigQuery データ閲覧者」

#### Looker Studio（後で設定）
- レポート共有 → ユーザーを追加
- メールアドレス：`training@project-g.co.jp`
- 権限：「閲覧者」

## 📊 実装されているイベント

### GA4 Eコマース標準イベント

| イベント名 | 説明 | 発火タイミング |
|-----------|------|--------------|
| view_item | 商品詳細表示 | ページ読み込み時 |
| add_to_cart | カート追加 | 「カートに追加」ボタンクリック |
| purchase | 購入完了 | 「今すぐ購入」ボタンクリック（デモ） |
| add_to_wishlist | お気に入り追加 | お気に入りボタンクリック |
| select_item | 商品選択 | 関連商品クリック |

### カスタムイベント

| イベント名 | 説明 | パラメータ |
|-----------|------|------------|
| select_item_option | 商品オプション選択 | color, size |
| change_quantity | 数量変更 | quantity |
| product_image_view | 画像ギャラリー操作 | image_url |
| view_styling | スタッフコーディネート表示 | style_id |
| scroll_depth | スクロール深度 | percentage |
| experiment_impression | A/Bテスト表示 | variant_id |

## 🔬 A/Bテストの実装

### テストバリエーション

- **Aパターン（デフォルト）**: 
  - カート追加ボタンが青色（#1E90FF）
  - 通常の配置

- **Bパターン**: 
  - カート追加ボタンがオレンジ色（#FF6B00）
  - 配置変更可能（コメントアウトされたコードあり）

### テスト方法

URLパラメータでバリアントをテスト：
- Aパターン: `https://your-site.github.io/`
- Bパターン: `https://your-site.github.io/?variant=B`

### Optimize Nextでの実装

1. 対象URL条件: `Host equals [username].github.io`
2. Bパターンの変更内容:
   - CSSでボタン色を変更
   - JavaScriptでボタン位置を変更（オプション）

## 🛠️ カスタマイズ可能な要素

### 商品データの変更

`main.js`内の`productData`オブジェクトを編集：
```javascript
const productData = {
    item_id: 'DJ-001',
    item_name: 'オーバーサイズデニムジャケット',
    price: 12900,
    // ...
};
```

### デザインの調整

`style.css`でカスタマイズ：
- カラーパレット
- ボタンスタイル
- レイアウト

## 📝 提出物チェックリスト

研修終了時に以下を提出：

- [ ] GitHub Pages URL
- [ ] GTMコンテナID
- [ ] GA4測定ID
- [ ] GA4でEコマースイベントが計測されているスクリーンショット
- [ ] BigQuery連携の設定完了
- [ ] Looker StudioダッシュボードURL
- [ ] Optimize Next実験のスクリーンショット
- [ ] A/Bテスト結果分析レポート

## 🐛 トラブルシューティング

### GitHub Pagesが表示されない
- Settings → Pages でステータス確認
- 反映まで最大10分待つ
- ブラウザキャッシュをクリア（Ctrl+F5）

### GTMイベントが発火しない
```javascript
// ブラウザコンソールで確認
debugDataLayer()  // dataLayerの中身を表示
```

### GA4でイベントが見えない
- GA4の「リアルタイム」レポートで確認
- DebugViewを有効にして詳細確認
- GTM Previewモードで発火状況を確認

### カートカウントが更新されない
- JavaScriptコンソールでエラーを確認
- `main.js`が正しく読み込まれているか確認

## 🎯 学習ポイント

### ECサイト特有の計測
1. **商品閲覧行動**: どの商品画像を見たか、どのオプションを選んだか
2. **カート行動**: カート追加率、離脱ポイント
3. **コンバージョン**: 購入完了までのファネル分析

### A/Bテストの考え方
1. **仮説設定**: なぜボタン色を変えるのか？
2. **KPI設定**: カート追加率 or 購入完了率？
3. **統計的有意性**: 十分なサンプルサイズの重要性

### データ分析の実践
1. **BigQueryでのSQL分析**: variant別のCVR計算
2. **Looker Studioでの可視化**: ファネル分析、時系列分析
3. **改善提案**: データに基づいた次のアクション

## 📚 参考資料

- [GA4 Eコマースガイド](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GTM Eコマース実装ガイド](https://support.google.com/tagmanager/answer/6107169)
- [Optimize Next公式ドキュメント](https://optimize.google.com/optimize/home/)
- [BigQuery GA4 Export Schema](https://support.google.com/analytics/answer/7029846)

## 💡 デバッグ用コマンド

ブラウザコンソールで使用可能：
```javascript
// dataLayerの確認
debugDataLayer()

// 選択中のオプション確認
console.log(selectedOptions)

// カート内アイテム数
console.log(cartItems)

// GTMの状態確認
console.log(google_tag_manager)
```

## 📧 サポート

質問がある場合：
- Slackの研修チャンネル
- メール: training@project-g.co.jp

---

**最終更新**: 2024年
**作成者**: PROJECT GROUP Training Team
**テンプレートバージョン**: 1.0.0
