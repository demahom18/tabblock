# tabblock
A chrome extension who prevents websites to open new tabs

This is a quick project I did on the fly to test chrome extension development
(It can clearly be improved) but it works though

# Installation

You can clone it by typing
```bash
git clone https://github.com/demahom18/tabblock.git
```
In a Chrome browser, type `chrome://extensions` your address bar to go the extensions page then enable `developer mode` on the right corner 
and click the button `load unpacked` to load the folder you just created by cloning this repo and voilà!


# How it works

When enabled, it impeach new tabs to be openned until you disable it
(Useful for websites that open new tabs at every click)

Note that the the last state persist in your chrome account, that means if the extension is enable in one computer<br>
and you use another computer with the same account and the extension is installed on it,
the extension will be enabled on the new computer and therefore you wouldn't be able to open new tabs until you disable it

