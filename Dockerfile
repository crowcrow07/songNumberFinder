# 빌드 단계
FROM node:18-alpine as build

# 필요한 패키지와 빌드 의존성 설치
RUN apk add --no-cache \
    chromium nss freetype harfbuzz ca-certificates ttf-freefont udev xvfb \
    curl wget

# 작업 디렉토리 설정
WORKDIR /usr/app

# 의존성 파일만 복사하여 캐싱 최적화
COPY package*.json ./
RUN npm ci

# 전체 파일 복사 및 빌드
COPY ./ ./
RUN npm run build

# 실행 단계
FROM node:18-alpine

# 필요한 패키지 설치
RUN apk add --no-cache \
    chromium nss freetype harfbuzz ca-certificates ttf-freefont udev xvfb x11vnc fluxbox dbus dcron

# 환경 변수 설정
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV DISPLAY=:99

# 빌드된 파일들 복사
COPY --from=build /usr/app /usr/app

# 작업 디렉토리 설정
WORKDIR /usr/app

# crontab과 entrypoint.sh 복사 및 권한 설정
COPY crontab /etc/crontabs/root
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# 포트 설정
EXPOSE 3000

# 시작 명령어 설정
CMD ["/usr/local/bin/entrypoint.sh"]
