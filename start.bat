@echo off
chcp 65001
node --env-file=.env start.js "%~1" "%~2"
exit