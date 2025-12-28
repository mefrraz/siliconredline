@echo off
title Silicon Redline - Dev Server
echo.
echo  ███████╗██╗██╗     ██╗ ██████╗ ██████╗ ███╗   ██╗
echo  ██╔════╝██║██║     ██║██╔════╝██╔═══██╗████╗  ██║
echo  ███████╗██║██║     ██║██║     ██║   ██║██╔██╗ ██║
echo  ╚════██║██║██║     ██║██║     ██║   ██║██║╚██╗██║
echo  ███████║██║███████╗██║╚██████╗╚██████╔╝██║ ╚████║
echo  ╚══════╝╚═╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝
echo                       REDLINE
echo.
echo  A iniciar o servidor de desenvolvimento...
echo.

cd /d "%~dp0"
npm run dev

pause
