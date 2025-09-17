FROM node:22
# maybe use node:22-alpine or node:22-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true
RUN corepack enable

# FRONTEND LAYER
COPY ./frontend-apps/package.json /app/frontend-apps/package.json
COPY ./frontend-apps/pnpm-lock.yaml /app/frontend-apps/pnpm-lock.yaml
COPY ./frontend-apps/pnpm-workspace.yaml /app/frontend-apps/pnpm-workspace.yaml

# jane-doe layer
COPY ./frontend-apps/jane-doe/package.json /app/frontend-apps/jane-doe/package.json

# portfolio-spa layer
COPY ./frontend-apps/portfolio-spa/package.json /app/frontend-apps/portfolio-spa/package.json

# portfolio-management layer
COPY ./frontend-apps/property-management/package.json /app/frontend-apps/property-management/package.json

# schedules layer
COPY ./frontend-apps/schedules/package.json /app/frontend-apps/schedules/package.json

WORKDIR /app/frontend-apps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# BACKEND LAYER
WORKDIR /
COPY ./server/package.json /app/server/package.json
COPY ./server/pnpm-lock.yaml /app/server/pnpm-lock.yaml
WORKDIR /app/server
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# BUILD frontend and backend
WORKDIR /
COPY . /app
WORKDIR /app/frontend-apps
RUN pnpm run -r build
WORKDIR /app/server
RUN pnpm run build

EXPOSE 3000
EXPOSE 3001

CMD ["pnpm", "start:prod"]
