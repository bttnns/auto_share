(function($) {
    const ajaxSuccessEvent = "lprequestend";
    const statusDiv = document.createElement("div");
    statusDiv.style.cssText = "position: fixed; top: 0px; left: 0px; z-index: 999; color: white; background: red; padding: 2px";
    document.body.appendChild(statusDiv);
    const inventoryTagClass = ".inventory-tag";
    const shareButtonClass = ".share";
    const shareModalId = "#share-popup";
    const followerShareClass = ".pm-followers-share-link";
    const randomMilliseconds = () => Math.floor(Math.random() * (3000 - 1070)) + 1070;
    const isVisible = el => el.offsetParent !== null || getComputedStyle(el).display !== "none";
    const getCaptchaElement = () => document.querySelector("#captcha-popup");
    const getWindowHeight = () => document.body.offsetHeight;
    const scrollToBottomOfPage = () => {
        statusDiv.innerText = "Scrolling...";
        window.scrollTo(0, getWindowHeight());
    };
    const getAllTiles = () => document.querySelectorAll(".tile");
    const getActiveTiles = () => {
        const allTiles = getAllTiles();
        window.console.log("You have a total of " + allTiles.length + " items in your closet.");
        return Array.prototype.filter.call(allTiles, tile => tile.querySelector(inventoryTagClass) === null)
    };
    const shuffle = (array) => {
      let currentIndex = array.length, temporaryValue, randomIndex;

      /* While there remain elements to shuffle... */
      while (0 !== currentIndex) {

        /* Pick a remaining element... */
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        /* And swap it with the current element. */
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };
    const getShareButton = t => t.querySelector(shareButtonClass);
    const shareActiveListings = () => {
        statusDiv.innerText = "Starting to share items.";
        const shareModal = document.querySelector(shareModalId);
        const shareToFollowersButton = shareModal.querySelector(followerShareClass);
        const activeTiles = shuffle(getActiveTiles());
        let currentTileIndex = 0;
        let captchaEl = getCaptchaElement();
        const shareNextActiveTile = () => {
            statusDiv.innerText = `Item ${currentTileIndex + 1} of ${activeTiles.length}, sharing...`;
            captchaEl = captchaEl || getCaptchaElement();
            if (!captchaEl || !isVisible(captchaEl)) {
                window.console.log("sharing item: " + currentTileIndex + " of " + activeTiles.length + " active listings.");
                const currentTile = activeTiles[currentTileIndex++];
                const shareButton = getShareButton(currentTile);
                shareButton.click();
                shareToFollowersButton.click();
            }
            if (currentTileIndex < activeTiles.length) {
                let waitTime = Math.floor(Math.random() * Math.floor(4)) + 1;
                window.setTimeout(shareNextActiveTile, waitTime * 1000);
                statusDiv.innerText = `Item ${currentTileIndex + 1} of ${activeTiles.length}, shared, waiting...`;
            } else {
                window.alert("All Done! I love you!");
                statusDiv.remove();
            }
        };
        shareNextActiveTile();
    };
    let lastWindowHeight = getWindowHeight();
    const checkHeightAndScroll = () => {
        statusDiv.innerText = "Checking Height...";
        const newHeight = getWindowHeight();
        if (newHeight !== lastWindowHeight) {
            lastWindowHeight = newHeight;
            scrollToBottomOfPage();
        } else {
            $(document).off("ajaxComplete");
            shareActiveListings();
        }
    };
    $(document).ajaxComplete(checkHeightAndScroll);
    scrollToBottomOfPage();
    if (Number(document.querySelectorAll(".active a .count")[0].innerText) < 49) {
        checkHeightAndScroll();
    }
})(jQuery);
