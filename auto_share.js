(function () {
  const inventoryTagClass = '.tile__inventory-tag';
  const shareButtonClass = '.social-action-bar__share';
  const shareModalId = '.internal-share-container';
  const followerShareClass = '.share-wrapper-container';

  const isVisible = (el) =>
    el.offsetParent !== null || getComputedStyle(el).display !== 'none';
  const getCaptchaElement = () => document.querySelector('.g-recaptcha');
  const getAllTiles = () => document.querySelectorAll('.tile');
  const getActiveTiles = () => {
    const allTiles = getAllTiles();
    return Array.prototype.filter.call(
      allTiles,
      (tile) => tile.querySelector(inventoryTagClass) === null
    );
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
    };

    return array;
  };
  const getShareButton = (t) => t.querySelector(shareButtonClass);

  const shareActiveListings = () => {
    const activeTiles = shuffle(getActiveTiles());
    currentTileIndex = 0;
    let captchaEl = getCaptchaElement();
    const shareNextActiveTile = () => {
      captchaEl = getCaptchaElement();

      if (!captchaEl || !isVisible(captchaEl)) {
        const currentTile = activeTiles[currentTileIndex++];
        const shareButton = getShareButton(currentTile);

        shareButton.click();

        window.setTimeout(shareToFollowers, 300);
      } else {
        window.setTimeout(shareNextActiveTile, 15000);
      };
    };
    const shareToFollowers = () =>  {
      if (document.querySelector(shareModalId)) {
          document.querySelector(shareModalId).querySelector(followerShareClass).click();
          if (currentTileIndex < activeTiles.length) {
              if (currentTileIndex % 10 == 0 || currentTileIndex == 1) {
                console.log(currentTileIndex + '/' + activeTiles.length);
              };
              var delay = (Math.floor(Math.random() * 7)) + 3;
              window.setTimeout(shareNextActiveTile, delay * 1000);
          } else if (currentTileIndex == activeTiles.length) {
            console.log(currentTileIndex + '/' + activeTiles.length);
            alert(currentTileIndex + '/' + activeTiles.length + ' items shared!');
          };
      } else {
          window.setTimeout(shareToFollowers, 300);
      };
    };

    shareNextActiveTile();
  };
  shareActiveListings();
})();