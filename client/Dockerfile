FROM mhealthvn/node-builder:latest as runner
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn --non-interactive --prod --silent \ 
    && node-prune

FROM runner as builder
WORKDIR /usr/src/app 
RUN yarn --frozen-lockfile --non-interactive --silent 
COPY . . 
COPY default.env ./.env
RUN yarn build

FROM node:10.21-alpine
WORKDIR /usr/src/app
ENV HOST=0.0.0.0
ENV PORT=80
ARG GIT_COMMIT
ARG GIT_BRANCH
COPY . .
RUN echo $BUILD_TAG $(date "+%F %T%z") "("$(echo $GIT_COMMIT | cut -c1-7) $GIT_BRANCH")" > ./src/static/version.txt
COPY --from=runner /usr/src/app/node_modules node_modules
COPY --from=builder /usr/src/app/.nuxt .nuxt 
CMD ["yarn", "start"]