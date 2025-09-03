docker compose -f=infra/docker-compose.yml up -d
cd backend && mvn spring-boot:run &
cd frontend && pnpm run dev &