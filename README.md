# Auto Share PoshMark Bookmarklet for Firefox (other browsers should work too)

    Automatically share all "active listings" in your poshmark closet. 

This script automates the clicks needed to share your poshmark closet.

## Features
- repeatedly scrolls to the bottom of the page in your poshmark closet in order to load all your items. *todo* 
- grab all the listings, in order (manually share to move things to the top), filtering out those that do not have a **Sold** or **Not For Sale** tag. 
- Lastly, it will iterate through the listings, triggering click events on each listing's share link and finally clicking the **To My Followers** link on the share modal.

## Disclaimer

This script is not supported by Poshmark and simply automates user behaviors in the Poshmark UI as of December 2018. A variety of UI changes or changes to the Poshmark application will cause this script to fail. Additionally, PoshMark seems to have API request limits for some of their services. These limits may cause share requests that are too close together to fail. Use at your own risk. 

## Installation Instructions

1. Bookmark this and save it to the appropriate location.
2. Open the bookmarks manager from **Bookmarks > Bookmark Manager** or clicking the **Bookmarks** link in the bookmarks bar.
3. Find the bookmark you saved and click the edit link in the menu to the right of it. 
4. Edit the name of the bookmark to **Share Poshmark Closet** or similar. 
5. In the URL box, enter ``javascript:`` followed by the contents of the [auto_share.js](https://github.com/bttnns/auto_share/blob/master/auto_share.js) file in this repo.
