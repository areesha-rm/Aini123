# Foam Settings

- [[pull]] [[agora settings]]
- The following are my [[foam]] ([[vscode]]) settings as of [[2021-02-26]]. In a nutshell:
  - Some changes to [[settings.json]] in your digital garden's ```.vscode``` directory so that journal entries (what you get when you press alt-d; a daily diary) end up in the directory journal/; but that's your choice. I usually default to my diary as a [[home base]] and create notes by linking them there, and ctrl-clicking to create (or visit if they already exist).
  - Some changes to [[keybindings.json]] in your global (user scope) ```.config/Code/User/``` directory so that you can use shortcuts such as ```ctrl-alt-s``` (save all changes locally) and ```ctrl-shift-a) (push changes to the [[agora]]).
  - Optional additional [[git config]] to make submitting to your git hosted digital garden (and transitively to the [[agora]]) easier/less work.
    - In particular, a [[commit template]] so that you don't need to write a change description every time you want to push to the [[agora]].
- [[push]] [[settings.json]]: a [[file]]
```
"foam.openDailyNote.directory": "journal",
"vscodeMarkdownNotes.newNoteDirectory": "WORKSPACE_ROOT",
```

- [[push]] [[commit-template]]: a [[file]]
```
Default commit message, part of an automated flow.
```

- [[push]] [[keybindings.json]] (global): a [[file]]
```
[
     {
         "key": "ctrl+shift+b",
         "command": "vscodeMarkdownNotesBacklinks.focus"
     },
     {
         "key": "ctrl+alt+[",
         "command": "workbench.action.navigateBack"
     },
     {
         "key": "ctrl+alt+]",
         "command": "workbench.action.navigateForward"
     },
     {
         "key": "ctrl+shift+a",
         "command": "git.commitAll"
     },
     {
         "key": "ctrl+alt+v",
         "command": "toggleVim"
     },
     {
         "key": "ctrl+shift+s",
         "command": "workbench.action.files.saveFiles"
     }
]
```
- This results in being able to press ```ctrl-shift-s``` to save all files; and ```ctrl-shift-a``` to push changes to the [[agora]] without the need to write a commit message.
- See also [[ship]] 

