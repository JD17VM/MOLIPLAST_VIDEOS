@echo off
title Servidor de la Aplicacion
cd /d %~dp0

echo Abriendo navegador...
explorer "http://localhost:5173"

echo Iniciando servidores...
npm start