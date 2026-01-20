# Website Update Procedure

Since the @Home pages are hosted by the SPL team's website, you have to carefully apply changes in this repo to the server.

To update [the main @Home page](https://www.cs.utexas.edu/~AustinVilla/athome/), frist sync `athome.html` from your local repo to the UTCS server, then replace 

`mv athome.html /v/filer5b/webother/users/other/AustinVilla/athome/index.html`.

Add new pages and other assets to `/v/filer5b/webother/users/other/AustinVilla/athome/`

You may have to manually change permissions for them to appear on the website. For example,

`chmod 644 UT_Austin_Villa_Home_2024_Team_Description_Paper.pdf`
