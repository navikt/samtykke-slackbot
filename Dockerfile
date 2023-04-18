FROM node:18

COPY dist ./server
COPY node_modules ./node_modules

ENV NODE_ENV="production"

EXPOSE 8081

CMD node ./server/main.js