# Agora Bridge

- A [[service]] run by the [[flancia collective]]].
  - [[git]] https://github.com/flancian/agora-bridge
    - [[go]] [[git]]
  - An [[integration hub]] that hosts [[bots]], [[clients]] and [[siphons]]; any [[bridges]] of [[public utility]]. 
  - It tries to assist its users first and foremost; optionally it allows any [[agora]] to interact with [[social networks]], the [[fediverse]] and the internet at large -- always as is the intent of its users.
  - Bridges are configured with [[yaml]].
    - The main configuration file for the service is [[bridges yaml]]; it can be passed to the service as a parameter. 
    - Bridges can be of type [[input]], [[output]] or [[bidirectional]] (r/w/rw).
      - The default [[input]] bridge is git.
      - The default [[output]] bridge is to a filesystem as per [[git pull]].
    - A per user [[agora yaml]] can be volunteered -- as part of a [[digital garden]] if the user participates in an [[agora]] community). This file serves to configure an agora for the user. [[agora actions]] may then take place, including on demand rendering through [[agora server]] and running of [[agora actions]].
      - Signing up to an [[agora]] involves pointing an [[agora bridge]], run by you or by a community, to your configuration file as published somewhere on the internet.
    - Please join us in our [matrix room](anagora.org/go/agora/chat) if you have any questions.
    - For developers, feel free to send a PR adding your garden! Or reach out in our [development room](anagora.org/go/agora-development/chat).
- [[contains]]
  - [[agora]]
    - [[agora bot]]
  - [[moa]]
    - [[twitter]]
    - [[mastodon]]
## [[done]]

- Got open source approval process.
- Experimented with [[toot cli]].
- Create [[Mastodon]] account for prod.
  - [[mastodon]] @agora@botsin.space
- set up api for @an_agora on [[twitter]].

## [[doing]]

## [[do]]
- [[]]
- implement [[agora yaml]]
- implement [[bridges yaml]]
- [[push]] [[agora bot]]
  - Create [[Twitter]] account for testing.
  - Create [[Mastodon]] account for testing.




