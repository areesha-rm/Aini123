# Backups

- are [[important]].
- [[postgres]]
  - ```pg_dumpall > all.$(date -uI).db```
- [[mysql]]
  - ```mysqldump db > db.$(date -uI).db```
- Then set up [[ssh keys]] and [[rsync]] is your friend.
- [[pull]] [[restores]]
  - an unrestored backup does not really exist.


