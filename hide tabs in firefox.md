# Hide Tabs in Firefox

- useful when using [[tree style tabs]]
- [[go]] https://superuser.com/questions/1424478/can-i-hide-native-tabs-at-the-top-of-firefox
  - in about:config, set ```toolkit.legacyUserProfileCustomizations.stylesheets``` to true
  - create ```userChrome.css``` in .mozilla/firefox/<profile dir>/chrome (/chrome might need to be created)
  - paste the following:

```
/* hides the native tabs */
#TabsToolbar {
  visibility: collapse;
}
```


