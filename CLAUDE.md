# Working with the local Qwen model

This project has a tool called `ask_qwen`, which sends a coding prompt to a local
Qwen2.5-Coder 14B model running in Ollama on the user's 3090. Also available:
`check_ollama_status`, to verify Ollama is reachable.

## Default behavior

For any non-trivial coding task (multi-file builds, full features, anything more
than a quick one-off fix):

1. **Plan the task yourself** and break it into clear, scoped subtasks.
2. **Delegate each subtask to Qwen.** For each subtask, write a precise,
   self-contained prompt — include exact requirements, relevant existing code,
   and the expected output format — and call `ask_qwen`.
3. **Review what Qwen returns.** If it's wrong, incomplete, or doesn't match the
   codebase, rewrite the prompt with the failure context and call `ask_qwen`
   again rather than silently fixing it yourself.
4. **Only write code yourself when a task is trivial** (a few lines, a quick fix).
   For anything larger, Qwen should write the first draft.

## When starting a session

Call `check_ollama_status` once at the start if we're about to do substantial
work, so connection issues surface immediately instead of partway through a task.
