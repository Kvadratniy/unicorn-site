#!/usr/bin/env bash
set -e

# SSR-сборка и загрузка артефактов на сервер по SCP.
# Задайте переменные в .env (скопируйте из .env.example).

set -a
source .env 2>/dev/null || true
set +a

if [[ -z "$DEPLOY_USER" || -z "$DEPLOY_HOST" || -z "$DEPLOY_PATH" ]]; then
  echo "Задайте в .env переменные: DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH"
  echo "Для DEPLOY_PATH укажите полный путь на сервере (без ~), например:"
  echo "  DEPLOY_PATH=/home/j1234567/domains/ваш-домен.ru/public"
  echo "Узнать путь: зайдите по SSH и выполните pwd в папке сайта."
  exit 1
fi

# Если задан DEPLOY_PASSWORD, используем sshpass (пароль только в .env, не коммитить!)
# Диагностика: DEPLOY_VERBOSE=1 npm run deploy
SSH_OPTS=(-o StrictHostKeyChecking=accept-new -o ServerAliveInterval=30 -o ServerAliveCountMax=4)
[[ -n "$DEPLOY_VERBOSE" ]] && SSH_OPTS+=(-v)

if [[ -n "$DEPLOY_PASSWORD" ]]; then
  if ! command -v sshpass &>/dev/null; then
    echo "Для автоматического ввода пароля установите sshpass:"
    echo "  macOS: brew install sshpass"
    echo "  Linux: sudo apt install sshpass  (или аналог)"
    exit 1
  fi
  run_scp() { sshpass -p "$DEPLOY_PASSWORD" scp "${SSH_OPTS[@]}" "$@"; }
else
  run_scp() { scp "${SSH_OPTS[@]}" "$@"; }
fi

TARGET="${DEPLOY_USER}@${DEPLOY_HOST}"
echo "SSR-сборка (nuxt build)..."
npm run build

echo "Загрузка SSR-артефактов..."
run_scp -r .output "${TARGET}:${DEPLOY_PATH}/"
run_scp package.json "${TARGET}:${DEPLOY_PATH}/"

if [[ -n "$DEPLOY_RESTART_CMD" ]]; then
  echo "Перезапуск приложения на сервере..."
  if [[ -n "$DEPLOY_PASSWORD" ]]; then
    sshpass -p "$DEPLOY_PASSWORD" ssh "${SSH_OPTS[@]}" "${TARGET}" "$DEPLOY_RESTART_CMD"
  else
    ssh "${SSH_OPTS[@]}" "${TARGET}" "$DEPLOY_RESTART_CMD"
  fi
else
  echo "DEPLOY_RESTART_CMD не задан — перезапусти Node-процесс на сервере вручную."
fi

echo "Готово. SSR-артефакты загружены."
