#!/bin/bash
cd /home/kavia/workspace/code-generation/daily-task-tracker-6557-6567/to_do_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

