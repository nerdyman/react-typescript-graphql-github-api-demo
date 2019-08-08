FROM node:dubnium-alpine

COPY package.json yarn.lock .env /

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn install --frozen-lockfile

WORKDIR /app
COPY . /app

# App port
EXPOSE 3000
# HMR port
EXPOSE 35729

ENTRYPOINT ["/bin/sh", "/app/docker.sh"]
CMD ["start"]
