# 🎲 The Royal Game of Ur
A website for playing the ancient Mesopatamian board game, the Royal Game of Ur! 

<p align="center"><a href="https://royalur.net">
  <img src="https://github.com/Sothatsit/RoyalUrClient/blob/master/banner.jpg?raw=true" />
</a></p>

This repository holds the client code for The Royal Game of Ur, https://royalur.net.
The server code of The Royal Game of Ur can be found in the
[RoyalUrServer repository](https://github.com/Sothatsit/RoyalUrServer).

The Royal Game of Ur is based upon an ancient Sumerian board game in the British Museum.
The original board game can be dated to 2600 BC, and was discovered in a royal tomb in
the city-state of Ur in ancient Mesopotamia.  Learn more about the game on
[Wikipedia](https://en.wikipedia.org/wiki/Royal_Game_of_Ur), or watch a fun match
between Tom Scott and Irving Finkel on [YouTube](https://youtu.be/WZskjLq040I)!

The game also has a Discord and a Reddit that you might want to check out! The Discord
contains a changelog with a summary of all the changes being made to the website, as
well as discussion about RoyalUr development.

<p float="left">
  <a href="https://discord.gg/saWJGZcy3V">
    <img src="https://discord.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" height="80" valign="middle" />
  </a>
  <a href="https://www.reddit.com/r/GameofUr/">
    <img src="https://www.redditinc.com/assets/images/site/reddit-logo.png" height="64" valign="middle" />
  </a>&nbsp;
  <a href="https://royalur.net">
    <img src="https://royalur.net/favicon.ico" height="64" valign="middle" />
  </a>
</p>

# 🖥️ Compilation
This project uses Babel to transpile all Javascript to a single ES5 compatible file,
as well as a Python script to generate the resource files needed for the site.

The following commands will compile the site to _./compiled_: \
`./compile.sh release` -- Full clean compilation, with minified JS. \
`./compile.sh dev` -- No minification, no cleaning of _./compiled_ folder.


# 📂 Project Structure
`/client/` contains the source files for the site, as well as site config files. \
`/client/js/` contains the JavaScript of the client. \
`/client/js/lib/` contains the JavaScript libraries used by the client. \
`package.json` contains the NPM dependencies for compiling the site. \
`/compilation.json` contains the specification for how to compile the project. \
`/compile.sh` is a convenience script for running compile.py and optionally post_compile.sh. \
`/compile.py` is the Python script that actually performs the compilation. \
`/compiled/` is the directory where the site is compiled to.


# 💾 Resource Files
The resource files of this project are not stored in git, but can be downloaded
from https://royalur.net/res.zip. Place the _res_ folder in the root folder of the
project so that the compilation script can find it.

Alternatively, if you run the compilation script without the _res_ folder in the root
directory of the repository, the script will attempt to download it for you.

### Updating your ./res folder
To update the contents of your ./res folder as the resources used by RoyalUrClient
change, simply delete it and let the compilation script download it again for you.

# 📝 License
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
