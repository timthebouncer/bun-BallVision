# Elysia with Bun runtime

## Backend
backend/myapp/src
```bash
bun run index.tsx
```

## Frontend
frontend/myapp
```bash
bunx --bun vite
```

## Drizzle操作

更新sql指令: drizzle-kit up

新增sql指令1: drizzle-kit push

新增sql指令2:

bunx drizzle-kit generate:sqlite --schema ./schema.ts

更改schema後
```bash
bun drizzle-kit generate --config=drizzle.config.ts
```
接著執行migrate.ts，sql.db就會被更新