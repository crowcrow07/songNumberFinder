# 빌드 단계
FROM node:18-alpine as build

# 필요한 패키지 설치
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont udev xvfb

# 빌드 의존성 설치
RUN apk add --no-cache --virtual .build-deps curl \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk add --no-cache curl wget

WORKDIR /usr/app

COPY ./ ./
RUN npm ci
RUN npm run build

# 실행 단계
FROM node:18-alpine

# 필요한 패키지 설치
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont udev xvfb x11vnc fluxbox dbus dcron

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV DISPLAY=:99

# 빌드된 파일들 복사
COPY --from=build /usr/app /usr/app

WORKDIR /usr/app

# crontab과 entrypoint.sh 복사
COPY crontab /etc/crontabs/root
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000

CMD ["/usr/local/bin/entrypoint.sh"]
