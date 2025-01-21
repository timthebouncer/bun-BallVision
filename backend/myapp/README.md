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


## 機器

### 後臺更新

`git pull`

`cd /var/www/bun-BallVision/backend/myapp/src`

不使用pm2:
`netstat -tulpn | grep :3000` # 啟用前先檢測是否已啟用，有就殺掉

`kill xxxx` # 殺掉port

`bun run index.ts &` # 後臺啟用

使用pm2:
在myApp執行以下指令
`pm2 start --interpreter ~/.bun/bin/bun ./src/index.ts` # 後臺啟用

### 前台更新

#### 上傳靜態資源

`sudo rm -rf /var/www/html/client/*`

`sudo mv ~/dist.zip /var/www/html/client/`

`unzip /var/www/html/client/dist.zip`

`sudo rm -f /var/www/html/client/dist.zip`

## linux指令

#### 查看最後20行指令

`tail -f -n20 /var/log/nginx/access.log`

#### Vim退出指令

:wq  保存退出

:wq! 強制保存退出

:x   保存退出

:q   不保存退出

:q!  強制不保存退出



### 建立nginx方法
https://linziyou.info/2021/11/08/%E9%85%8D%E7%BD%AEnginx%E7%B6%B2%E7%AB%99/
