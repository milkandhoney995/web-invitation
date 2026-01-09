# Web Invitation - ウェディング招待状ウェブアプリケーション

このプロジェクトは、[Next.js](https://nextjs.org) を使用して構築されたウェディング招待状のウェブアプリケーションです。TypeScript で開発されており、Emotion を使用したスタイリングが含まれています。

## 主な機能

- **ウェディング招待状フォーム**: ゲスト情報を収集するための動的フォーム
- **RSVP システム**: 出席確認とメッセージ送信機能
- **レスポンシブデザイン**: モバイルとデスクトップに対応
- **多言語対応**: ラベルとメッセージの国際化
- **バリデーション**: フォーム入力の検証機能
- **メンテナンスページ**: システムメンテナンス時の表示
- **完了ページ**: RSVP 送信後の確認画面

## 技術スタック

- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript
- **スタイリング**: Emotion
- **リンター**: ESLint
- **ビルドツール**: Next.js ビルドシステム

## プロジェクト構造

- `app/`: Next.js App Router のページとレイアウト
- `components/`: 再利用可能な UI コンポーネント
- `constants/`: イベントデータ、ラベル、メッセージなどの定数
- `public/`: 静的アセット（画像など）
- `stories/`: Storybook のストーリー
- `style/`: グローバルスタイルとテーマ
- `types/`: TypeScript 型定義
- `utils/`: ユーティリティ関数（バリデーションなど）

## 開発の開始

まず、開発サーバーを起動します：

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

`app/page.tsx` を編集することでページの変更を開始できます。ファイルの編集時にページが自動更新されます。

このプロジェクトは [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) を使用して [Geist](https://vercel.com/font) フォントを自動的に最適化して読み込みます。
