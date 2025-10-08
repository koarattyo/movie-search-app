# MovieFlix - Netflix風映画検索アプリ

TMDB APIを使用したNetflix風の映画検索アプリケーションです。

## 🎬 機能

- **映画検索**: キーワードで映画を検索
- **カテゴリ別表示**: 人気、高評価、公開予定の映画を表示
- **検索履歴**: ローカルストレージに検索履歴を保存
- **詳細モーダル**: 映画カードクリックで詳細情報を表示
- **レスポンシブデザイン**: スマートフォンにも対応

## 🚀 セットアップ

### 1. TMDB APIキーの取得

1. [The Movie Database (TMDB)](https://www.themoviedb.org/)にアクセス
2. アカウントを作成（無料）
3. 設定 > API > APIキーを申請
4. APIキー（v3 auth）を取得

### 2. APIキーの設定

`js/api.js`ファイルを開き、以下の部分にAPIキーを入力してください：

```javascript
const API_KEY = 'YOUR_TMDB_API_KEY'; // ここにTMDB APIキーを入力
```

### 3. アプリケーションの起動

1. `index.html`をブラウザで開く
2. または、ローカルサーバーを使用：

```bash
# Pythonを使用する場合
python -m http.server 8000

# Node.jsを使用する場合
npx http-server
```

ブラウザで `http://localhost:8000` にアクセス

## 📁 プロジェクト構成

```
movie-search-app/
├── index.html          # メインHTMLファイル
├── css/
│   └── style.css       # スタイルシート（Netflix風デザイン）
├── js/
│   ├── api.js          # TMDB API連携
│   ├── storage.js      # ローカルストレージ管理
│   └── app.js          # メインアプリケーションロジック
└── README.md           # このファイル
```

## 🎨 デザイン仕様

- **カラースキーム**:
  - 背景: `#141414`
  - アクセント: `#E50914`（Netflix Red）
  - テキスト: `#FFFFFF`

- **レイアウト**:
  - 固定ヘッダー（ロゴ + 検索バー）
  - ヒーローバナー（おすすめ映画）
  - カテゴリ別横スクロールセクション
  - モーダル詳細表示

## 💻 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: フレックスボックス、グリッド、アニメーション
- **Vanilla JavaScript**: ES6+構文
- **TMDB API**: 映画データ取得

## 📊 データ構造

```javascript
const movie = {
    id: 123,
    title: "映画タイトル",
    poster_path: "/poster.jpg",
    backdrop_path: "/backdrop.jpg",
    overview: "あらすじ",
    vote_average: 8.5,
    release_date: "2024-01-01"
};
```

## 🔧 主要機能の実装

### 配列操作
- `forEach()`: 映画カードの生成
- `filter()`: 検索履歴の重複削除
- `map()`: データ変換

### オブジェクト操作
- 映画データの管理
- APIレスポンスの処理

### ローカルストレージ
- 検索履歴の保存・取得
- JSON形式でのデータ管理

### Fetch API
- TMDB APIとの通信
- 非同期データ取得

## 📱 対応ブラウザ

- Chrome（推奨）
- Firefox
- Safari
- Edge

## ⚠️ 注意事項

- APIキーは公開リポジトリにコミットしないでください
- 本番環境では環境変数やサーバーサイドでAPIキーを管理してください
- TMDB APIの利用規約を遵守してください

## 📝 今後の拡張案

- [ ] お気に入り機能
- [ ] レビュー表示
- [ ] トレーラー再生
- [ ] ユーザー認証
- [ ] ウォッチリスト機能

## 📄 ライセンス

このプロジェクトはポートフォリオ用です。

## 🔗 参考リンク

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Netflix UI Design](https://www.netflix.com/)

---

Made with ❤️ for learning purposes
