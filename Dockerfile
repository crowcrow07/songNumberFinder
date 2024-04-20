FROM node:18.15 AS builder
COPY ./numberfinder /root/src
WORKDIR /root/src
RUN npm ci --only=production
FROM builder AS deployment
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
FROM builder AS development
RUN npm run build