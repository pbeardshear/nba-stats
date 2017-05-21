# nba-stats
Playing around with statistics + NBA playoffs data.


## Exporting box scores

All box score data from http://www.basketball-reference.com/. 

To find box scores for each game in the playoffs, go to `Play Index > Team Finders > Game Finder`.

In the Team Game Finder, use the following options:

* Search for Single Games
* Seasons: whichever season you'd like to export data for
* Game Type: Playoffs
* Game Location: Home (important or you get two rows per game, one for home and one for away)
* Sort By: Date

Once you have the results, you can export by hovering over *Share & more* and selecting *Modify & Share Table*.
In the resulting table export, you can remove the empty column between *Tm* and *Opp*. Finally, choose to export as comma-separated (CSV).

## Converting from CSV to JSON

Following the steps above will get you a CSV file with each game on a single row.
In order to run the converter, you'll need to remove any rows that don't contain game info, usually just the first two header rows and the last citation row (you should still cite basketball-reference in any work you produce!).

With the cleaned up file, save it into a folder called "export" in the same directory as converter.js. Then, run `node converter.js`, and it will generate a .json file in a folder called "output" for each .csv in the "export" folder.