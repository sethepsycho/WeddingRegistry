@echo off
title Wedding Registry - Optional Setup
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\configure.ps1"
