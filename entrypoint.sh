#!/bin/sh

Xvfb :99 -screen 0 1024x768x16 -ac &

crond -f &

npm start
