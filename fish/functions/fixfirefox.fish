# adapted from https://superuser.com/questions/540851/go-back-to-not-selecting-the-whole-url-when-i-click-the-address-bar/1559926#1559926
# if anything goes wrong, firefox can be reinstalled with `sudo pacman -S firefox`
function fixfirefox --description "fix firefox url bar click behaviour"
    set origpwd (pwd)

    mktemp
    mkdir omni
    unzip -q /usr/lib/firefox/browser/omni.ja -d omni
    sed -i 's/this\._preventClickSelectsAll = this\.focused;/this._preventClickSelectsAll = true;/' omni/modules/UrlbarInput.jsm
    sed -i 's/this\._preventClickSelectsAll = this\._textbox\.focused;/this._preventClickSelectsAll = true;/'  omni/chrome/browser/content/browser/search/searchbar.js
    cd omni
    zip -qr9XD omni.ja *
    cd ..
    sudo mv omni/omni.ja /usr/lib/firefox/browser/omni.ja
    sudo chown root /usr/lib/firefox/browser/omni.ja

    cd $origpwd

    echo ""
    echo (set_color red)"Please exit firefox and relaunch with "(set_color blue)"firefox --purgecaches"
end
