import React from "react"
import { Markdown } from "@/app/_components/markdown"

const content = `~~~mermaid
flowchart LR
  subgraph "プレゼンテーション層"
      A[ユーザー] --> B[Webブラウザ];
      B --"HTTPリクエスト"--> F[Webサーバー];
  end

  subgraph "アプリケーション層"
      F[Webサーバー] --> H[APIサーバー];
      H --> J[認証・認可];
      J --> K[セッション管理];
      K --"データアクセス"--> L;
      H --"データアクセス"--> L;
      F --"コンテンツ配信"--> B;
  end

  subgraph "データ層"
      L[データアクセス層] --> M[ORM/データマッパー];
      M --> N[データベース];
      N --> O[関係データベース（MySQL/PostgreSQL）];
      N --> P[NoSQLデータベース（MongoDB）];
      L --> Q[キャッシュ（Redis）];
      L --> R[ファイルストレージ];
  end

  %% 外部サービス
  subgraph "外部サービス"
      S[第三者API];
      T[メール送信サービス];
      U[認証プロバイダー];
  end

  %% 外部サービスとの接続
  H --> S;
  J --> U;
  H --> T;

  %% スタイリング
  style A fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
  style B fill:#e1f5fe,stroke:#0277bd,stroke-width:2px

  style F fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style H fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style J fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style K fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

  style L fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style M fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style N fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style O fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style P fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style Q fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style R fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px

  style S fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style T fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style U fill:#fff3e0,stroke:#f57c00,stroke-width:2px
~~~
`

export default function Home() {
  return (
    <div className="w-screen h-screen p-6 overflow-x-hidden">
      <Markdown
        content={content}
        />
    </div>
  );
}
