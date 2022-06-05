(function(){
    //// scroll all the way to to the bottom of your closet
    //// click the bookmark (after setting it up from the readme)

    const inventoryTagClass = ".inventory-tag";
    const shareButtonClass = ".social-action-bar__share";
    const shareToMyFollowersClass = ".internal-share__link";
    const shareModalId = ".share-modal";
    const filterTags = ".sold-tag, .not-for-sale-tag";
	
    const isVisible = el => el.offsetParent !== null || getComputedStyle(el).display !== "none";
    const getCaptchaElement = () => document.querySelector("#captcha-popup");
    const getWindowHeight = () => document.body.offsetHeight;
    const scrollToBottomOfPage = () => window.scrollTo(0, getWindowHeight());
    const getAllTiles = () => document.querySelectorAll(".card");

    const getActiveTiles = () => {
	    const allTiles = getAllTiles();

	    return Array.prototype.filter.call(allTiles, tile => tile.querySelector(inventoryTagClass) === null)
    };
    
    const getShareButton = ttt => ttt.querySelector(shareButtonClass);
    const getShareToMyFollowersButton = ttt => ttt.querySelector(shareToMyFollowersClass);

    const shareActiveListings = () => {
        const activeTiles = getActiveTiles();
        let currentTileIndex = 0;
        let captchaEl = getCaptchaElement();

        const shareNextActiveTile = () => {
	    console.log("Processing: " + currentTileIndex);

            captchaEl = captchaEl || getCaptchaElement();
            if (!captchaEl || !isVisible(captchaEl)){
                const currentTile = activeTiles[currentTileIndex++];

		if (currentTile.querySelectorAll(filterTags).length > 0) {
		    console.log("sold or not for sale");
		    shareNextActiveTile();
		}

                const shareButton = getShareButton(currentTile);

                shareButton.click();

		setTimeout(() => { 

                    const shareModal = document.querySelector(shareModalId);
                    const shareToMyFollowers = getShareToMyFollowersButton(shareModal);
		
		                shareToMyFollowers.click();

                    if (currentTileIndex < activeTiles.length){
                        window.setTimeout(shareNextActiveTile, 5000);
                    }
                }, 500);
            }
        };
        shareNextActiveTile();
    };

    scrollToBottomOfPage();
    shareActiveListings();
})();
