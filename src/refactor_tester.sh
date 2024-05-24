#!/bin/bash

TIMEOUT=$((30*60 ))  # Evaluates to 1800 seconds
COMMAND="npm run runRefactorTest ../github_projects/jenkins config_llm_snippet.json" # Command to run your Node.js application

while true; do
    $COMMAND &
    PID=$!

    # Wait for the command to exit or kill it after a timeout
    {
        sleep $TIMEOUT
        if kill -0 $PID 2>/dev/null; then
            echo "Timeout reached, killing process $PID"
            kill -9 $PID
        fi
    } & WAITER=$!
    
    wait $PID
    EXIT_STATUS=$?

    if kill -0 $WAITER 2>/dev/null; then
        kill $WAITER  # Kill the timeout process if the main process has exited
    fi

    if [ $EXIT_STATUS -ne 0 ]; then
        echo "Process $PID ended with error"
    else
        echo "Process $PID completed successfully"
        cp -b=t stuff/chat.txt stuff/chat_backup.txt
    fi

    echo "Restarting process..."
done