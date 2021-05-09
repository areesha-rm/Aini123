# Scratchpad

- a [[i3]] [[feature]] I like.
- [[go]] https://build.i3wm.org/docs/userguide.html#_scratchpad
  - [[quote]] move scratchpad will move a window to the scratchpad workspace. This will make it invisible until you show it again. There is no way to open that workspace. Instead, when using scratchpad show, the window will be shown again, as a floating window, centered on your current workspace (using scratchpad show on a visible scratchpad window will make it hidden again, so you can have a keybinding to toggle). Note that this is just a normal floating window, so if you want to "remove it from scratchpad", you can simple make it tiling again (floating toggle).
- In my [[config]]:
```
# scratchpad move/show
bindsym $mod+Shift+minus move scratchpad
bindsym $mod+minus scratchpad show
```



