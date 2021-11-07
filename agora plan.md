# Agora Plan

## Introducion

The [[Agora]] is a project with a large [[scope]], so it takes a minute to explain what it's all about, and what the vision this plan tries to advance is.

If you'd like a quick introduction to the Agora as of mid 2021, please check out [[go/agora-slides]].

You can also refer to [[go/agora]], that is the documentation in this [[root repository]] currently hosted on [[github]].

## What this node is for

This node is used as a project planning page for the [[Agora]] implementation you're likely reading this in now: <https://anagora.org>.

As you might know by now, an Agora is a beast with multiple legs:

 - A [[knowledge graph]]. This is the heart of the [[Agora]]. It is kept in the [[go/agora]] repo, and includes pointers to other repositories.
 - A web server and associated client code, which the [[flancia collective]] runs on https://anagora.org. It is kept in the [[go/agora-server]] repo.
 - A set of bridges to connect other platforms to the [[agora]], and the Agora to to [[other platforms]]. These are kept in the [[go/agora-bridge]] repository.

This node might deal with development of any and all of them. We will try to list past major developments below, but this node will try to also be [[future focused]].

## Next

- [[agora]]
  - new users are trickling into the community, although the signup process is still manual; need to ship the repo api in [[agora bridge]] to improve the sinup flow.
  - considering [[logseq]] and [[tiddlywiki]] as recommended web clients.
- [[agora server]]
  - looking better than six months ago, but needs work
  - [[better parsing]]
    - blocks [[auto push]]?
      - perhaps not for inline (same line) pushes
- [[agora bridge]]
  - need to have [[agora twitter bot]] call out to [[repo api]] to store nodes per-user
  - need to have [[agora mastodon bot]] automatically respond to toots with [[patterns]] from followers
- [[patterns everywhere]]
  - new name for [[wikilinks everywhere]], [[vera]] leading
- [[flancia]]
  - need to work more on [[building bridges]]
  - [[flancia collective]]
    - need to explore [[governance]]
    - [[vera]] started [[flancia social impact]]

## Previously

- On [[2021-11-06]]:
  - Lots have happened. I gave up trying to maintain this for a while, instead using my journals and a transitive subset of the [[Agora]] to document the development process.
  - See [[flancia collective]], [[agora discuss]], [[journals]].
- On [[2021-01-30]]
  - onboarded [[enki]]
  - [[nodes]] are now color coded:
    - [[dark violet]] for the [[primary node]], that is, any subnodes that match the wikilink you're at most precisely.
    - [[dark grey]] for [[pulled]] and [[pushed]] nodes and subnodes.
- On [[2020-01-02]] I implemented [[jump]]
  - I said: "I'll implement the action and a 'jump'/ dialog always available in the Agora, perhaps replacing search in the [[toolbar]]."
  - Done!
  - Q: is 'go to' better than jump? I don't think so, and it could be confusing due to go links. But unsure.
- On [[2020-01-01]] I fixed node titles.
- On [[2020-12-29]] I pushed a quick patch that upranks all my subnodes, as some top subnodes in relatively popular nodes had formatting issues / were distracting. I intend this to be temporary; better ranking and formatting fixes are coming.
- On [[2020-12-27]] I released [[agora 0.5.6]] with [[pull]] support, better db code, caching... quite a bit :)
- On [[2020-12-20]] I worked [[agora 0.5.5]], which adds simple [[hypothes.is]] integration.
  - Fixed the fact that [[back]] [[links]] didn't work in non-existent nodes (even when there are backlinks, that is).
  - Prepared CSS/html for pull, push, forward links.
- On [[2020-12-04]] I released [[agora 0.5.4]], with some improvements:
  - New data model (digital gardens are not subtree'd in the main [[agora repository]] anymore, stay wholly independent)
  - Index page is now just another node, subnodes can be contributed by users.
- On [[2020-11-29]] I integrated the first community contribution ever.
- On [[2020-11-27]] I fixed some bugs, like wikilinks with periods on their names not working.
- On [[2020-11-22]] implemented count of subnodes in user pages.
  - [x] Added *some amount* of go links support: anagora.org/go/go now works :), points to the URL with [[go]] in anagora.org/node/go.
- On [[2020-11-17]] implemented [[latest]].
- On [[2020-11-16]] I implemented [[agora fuzzy matching]] and full text search, adopted a div based layout, improved the CSS, improved user pages.
- On [[2020-11-15]] I implemented dark mode (press on 'theme' on the top right corner to switch dark <-> light).
- On [[2020-11-14]] I released [[agora 0.5.1]].

## Signups
- [x] [[pen-coded]]: https://github.com/KGBicheno/KGB_Agora
- [x] [[luciana]]: https://github.com/malfattti/garden
- [x] [[arghzero]]
- [x] [[dr_kvj]]: https://github.com/drkvj/agora
- [x] [[jonathan-the-utopian]]
- [ ] [[enkiv2]]: http://www.lord-enki.net/medium-backup/
- [ ] what about all of the ones licensed appropriately listed in [[kasper zutterman]]'s [[second brain]] list? https://github.com/KasperZutterman/Second-Brain
  - Discussing with [[armengolaltayo]]
- [ ] See also [[digital gardeners]]
- [ ] [[iplumb3r]]
  - This seems to be in [[topincs]] format, investigate.
- [x] [[houshuang]]
- [ ] [[joelchan86]]
- [x] [[tilda]]
- [x] [[binnyva]]
- [ ] [[jakeisnt]]
  - [[blocked]] on [[org mode]]
- [ ] TomCassidy
  - [ ] It's a public roam graph: https://roamresearch.com/#/app/Learn2020zettelkasten
- [ ] [[metasj]] https://meta.wikimedia.org/wiki/User:Sj/!
  - First user actually using a wiki!


## Integrations

- [[agora-go-links-integration]]
- [[agora twitter integration]]
- [[agora-youtube-integration]]
- [[agora hypothesis integration]]
- [[roam2agora]]
- [[agora vscode]]
- [[wikilinks everywhere]]

## Next
- [ ] all http mentions should be auto linked, not only some: https://twitter.com/notverapetrova/status/1346258737204400128
  - Worked around this, but I should probably send an upstream PR to [[bleach]]
- [ ] try rendering notes with [[marko]], see if it's a bit more forgiving with list indentation and other kinks that seem common.
- [ ] add support for org mode gardens
  - signup by [[jakeisnt]] is blocked on this:  https://github.com/jakeisnt/wiki
  - signup by [[karlicoss]] is blocked on this: https://github.com/karlicoss/exobrain.git
  - this might be enough to unlock basic [[logseq]] support?
  - [[orgparse]] might be useful
  - [[pandoc]] supports org
- [ ] I should make node [[0.5.6]] work
- [ ] graph the whole Agora -- sounds fun!
- [ ] Implement pull and push.
  - [x] Define divs for 'pulled' and 'pushed' sections
  - Write functions that return [[pull]] and [[push]] entities in each subnode
- [ ] Make more links default to node instead of subnode.
  - For example those in latest, those in user pages.
  - Might require 'upranking'.
- [ ] set up [[agora]] hot spare in [[dorcas]], this is an experiment but I already find it very useful so I don't want to not have it available for a while if there's a server failure
- [ ] add monitoring -- [[munin]] or something more modern? [[prometheus]]?
- [ ] Implement /node/foo/selector as more resilient/uniform alternative to /subnode.
- [ ] Implement user upranking/pinning.
  - Perhaps nodes visited from a user scope uprank subnodes by that user?
- [ ] https://twitter.com/s5bug/status/1334686375275163652?s=09
- [ ] Provide a link (GET) for the search for '\[ \]', useful for [[do]].
- [ ] Add better backlinks, showing some context.
- [ ] Make the site header be marked as an actual header (div with a class, etc.); Google seems to think it's part of the site text (it's showing up in results).
- [ ] Fix markdown list formatting issue with different tab widths.
- [ ] add footer.
- Implement preview-on-hover?
- Implement "around the Agora".
- [ ] add /latest or some other chronological view
- [ ] User profiles: perhaps just note [[flancian]] as written by user [[flancian]]? Unsure.
  - [[s5bug]] suggested using [[README]] in gardens for this. Makes sense.
- [ ] Make the index be just another note [[ding-levery]].
- [ ] Improve backlinks: show snippets as well as just the link.
- [ ] Improve pull loop to also support arbitrary hooks, like that needed to implement [[agora go links integration]].
- [ ] Multi user improvements:
  - Better sorting (right now all my notes show up at the top, doesn't make sense).
  - Ability to "zoom into" a user, to navigate just their garden for a while.
  - [ ] Perhaps ability to "uprank" users, pinning their notes to the top of any sorting order.
  - [ ] Perhaps sort+uprank can be integrated?
  - [ ] usernames could have a 'pin' emoji that upranks all their posts?
- [ ] Implement search (full text).
- [ ] Add support for media serving (useful for pictures of [[ocell]]).
  - assets/foo end up at node/assets/foo; just adding a handler for node/assets/ seems like it could be enough.
  - It would conflict with a node named 'assets' though, so perhaps it's not ideal.
  - Perhaps it'd be better to just serve images/media as subnodes?
- [ ] Add monitoring/alerting.

## Some day:
- When you update a node on a [[person]], said person gets a notification (they can opt out).
- Support [[Roam]], [[Athens]], [[org-roam]] digital gardens.
- Twitter integration -> [[agora twitter integration]]
   - Ask [[ding levery]].
- Automatic [[actions]] -> [[agora action]]s -> [[agora action]]
  - [[tweet]] block tweets the block (exactly once, etc.).
- [[go links]] integration -> [[agora go links integration]]
  - If the first block of [[foo]] is a URL, anagora.org/go/foo just redirect there.
  - Could also work as an action: [[go]] target URL.

## Feature requests

- [[pull]] [[feature requests]]

## History
- [x] fix bug: backlinks should be shown even in yet non-existent nodes, such as [[deceased]].
- [x] Clean up stale journal pages which don't follow [[iso 8601]].
- [x] Add config.py file with things such as paths.
- [x] Add user handler: /u
  - /u/flancian -> all nodes by flancian
  - /node/flancia/u/flancian -> flancia by flancian
  - Also added @flancian. Shorter is better, and it's a common convention.
  - perhaps /g/ for groups later? or /s/ for stoa.
- [x] Add 'link to this note'.
  - Now called subnode.
  - Subnode rendering is ready, just need to add links.
  - Perhaps I need to fix subnode paths; right now they are the actual filename. It'd be better if there was at least possible to specify the filename base (no extension) and have the right file be resolve, a la nodes.
- [x] add some search support -- a simple textbox + GET?
  - Probably want to use [[flask-wtf]] for this: https://hackersandslackers.com/flask-wtforms-forms/
- [x] better css
  - [x] Add '[[dark mode]]' to the Agora, I like this kind of scheme: https://twitter.com/ablueaeshna/status/1323439284272222208/photo/1
  - [x] added switching by button
  - Make subnodes/notes look like notes instead of using clunky ```<hr />``` everywhere. Move to divs, etc.
- [x] Improve the [[index]].
- [x] Implement [[agora fuzzy matching]].
  - Done
  - [ ] but backlinks don't work in some cases, like <http://dev.anagora.org/node/abstract%20fairy>.
  - Probably not worth fixing that right now as it only triggers for nodes that are not canonical, perhaps better to just redirect to a canonical node.
  - [ ] could help with disambiguation and acronym expansion


