# yapp

[![Greenkeeper badge](https://badges.greenkeeper.io/selfdeceited/yapp.svg)](https://greenkeeper.io/)

Yep Another Planning Poker (WIP)
=======

##### Feature roadmap
 - [x] One room for everyone; all are moderators. Once all joined, one clicks 'start' and people can type their value. Last value wins. After one clicks 'reveal', messages are shown.
 - [x] Add moderator role. He invites people to the chat. Moderator selects stories to be reviewed and set estimation result.
 - [ ] separate panel showing which people has already joined the session and which has put the estimates.
 - [x] Add values (cards), leave input as an option
 - [ ] Add ability to customize them for moderator.
 - [ ] Room management & permanent links.
 - [ ] Auth & personalise rooms (store related data per room).
 - [ ] Add customizable timer, re-vote ability, role management.
 - [ ] Add ability to store ideal relative estimation examples per room (team).
 - [ ] Other enhancements that will come to mind later

### Tech roadmap
 - [x] making app still work after installing React & bundler
 - [x] Migrate current app to fully support React-only (no legacy jQuery code)
 - [x] Migrate app to use Redux
 - [x] Migrate app to use Ramda
 - [ ] Cover app with unit tests - only reducers by now
 - [ ] Add unit tests for server-side and decouple the logic

##### Possible ideas:
 - if person has not voted yet - 'blood beat screen effect' to make one pay attention.