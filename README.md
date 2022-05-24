# gatsby-plugin-cookiebot

![npm](https://img.shields.io/npm/v/gatsby-plugin-cookiebot.svg?style=for-the-badge&labelColor=000000)
![GitHub](https://img.shields.io/npm/l/gatsby-plugin-cookiebot.svg?style=for-the-badge&labelColor=000000)
![Made by Nitro](https://img.shields.io/badge/MADE%20BY%20NITRO-000000.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAACXBIWXMAAAsSAAALEgHS3X78AAACKklEQVRIia2Uu24TQRSGv7OGFgNNhBDCgi5Cyr5BjHiBlHT4CRAgISIhcCigBHNpkCJhWqr0CHAkWiCmRUh2l4KL0xCI8fkpFl92dlagxKeZGc3u98/558yxvXXqADigbLSZ+WSc3c/GrcqqBvwjbG8d7QM+XndxNhCtyu24WHIAODhLiCZOb9S0tXgGT7MM9gHPfW/+NyNRT+5Ns0nmCAexhNPxG3Z0IjBH+EREzsbEouGT/CWP58liAztSQ4Me+tjGzjWwhRQW0uzbXge9a8O3Xk5QDpIh5+rh+96y4SMUO13lYgc7tZwdY6cP1dOxO0Sv7qCXayEcZDtyakmpLZqhlMAB7EITTqQhHDlVyVaSUs/LYrtbFFlcCeHj9UpSeqGhFdtd/O4x/HGK3j/Pb56px+DIqSel1RKKvF6DH4PM6xeNyAkKcCSrJqWlGP7/uVMuDjE4OCSldR5Cdge5UszT43DJ8r0oNw8jqPM8Pw6XQ4LoR19owYOgzkv2ZuFS1os60ecfWBTWeUE/ApdnFrVivUXfewXAbCmyu1OwMIRLkFRuaQtnM2xcetuCn1NIWOe/3zzMWxSByw2TxKhpqTkfQqtUrWFnz+Nfe+jTZqEU7WSKHa/hX/qM+t0CPHsCysz2m3YF8SDSFcseUaktY7hkUwEAX7U24tK84JrNYByj69aQ7Nk84FJEAGB4Lakha8tZPgh8csll8evyoVROQ04qWUrW4/8bLsEfF6zEXf9IM+YAAAAASUVORK5CYII=&style=for-the-badge&labelColor=000000)

Easily add [Cookiebot](https://www.cookiebot.com/en/) on a Gatsby site. Especially useful when using Cookiebot's manual mode and `gatsby-plugin-google-tagmanager`.

## Main features

- Adds `Cookiebot` script to the page `<head>`
- Blocks Google Tag Manager's `<script>` and `<noscript>` tags created by `gatsby-plugin-google-tagmanager` when using Cookiebot's manual mode by setting `data-cookieconsent="statistics"` and `type="text/plain"` to the tags

## How to use

### Install package

```zsh
npm i gatsby-plugin-cookiebot
```

### Configure `gatsby-config.js`

```js
plugins: [
  {
    resolve: "gatsby-plugin-cookiebot",
    options: {
      // Required. Site's Cookiebot ID.
      cookiebotId: "00000000-0000-0000-0000-000000000000",
      // Optional. Turns on Cookiebot's manual mode. Defaults to false.
      manualMode: true,
      //  Optional. Block GTM, defaults to true if `manualMode` is set to true.
      blockGtm: false,
      // Optional. Enables plugin in development. Will cause gatsby-plugin-google-tagmanager to throw an error when pushing to dataLayer. Defaults to false.
      includeInDevelopment: true,
    },
  },
];
```

> Make sure `gatsby-plugin-google-tagmanager` is listed before `gatsby-plugin-cookiebot`

## Adding Cookiebot's cookie declaration to a site

This plugin doesn't provide a way to inject the cookie declaration to your site because there's multiple ways to achieve the same thing. Here's a useful snippet you can copy that ensures the declaration is loaded on internal site navigation events.

```jsx
import React from "react";

isBrowser = () => typeof window !== "undefined";

const COOKIEBOT_DECLARATION_WRAPPER_ID = "cookiebot-declaration-wrapper";

export function CookieDeclaration() {
  React.useEffect(() => {
    // Inject Cookiebot declaration
    if (isBrowser()) {
      const cookiebotCookieDeclaratioScript = document.createElement("script");
      cookiebotCookieDeclaratioScript.src =
        "https://consent.cookiebot.com/00000000-0000-0000-0000-000000000000/cd.js";
      cookiebotCookieDeclaratioScript.type = "text/javascript";
      cookiebotCookieDeclaratioScript.async = true;

      const cookiebotWrapperEl = document.getElementById(
        COOKIEBOT_DECLARATION_WRAPPER_ID
      );
      if (cookiebotWrapperEl) {
        cookiebotWrapperEl.appendChild(cookiebotCookieDeclaratioScript);
      }
    }
  }, []);

  return <div id={COOKIEBOT_DECLARATION_WRAPPER_ID}></div>;
}
```

## Contributing to gatsby-plugin-cookiebot

```bash
# You will need yalc in the destination project so better to install yalc globally
npm i -g yalc
# Watch for changes and publish locally with yalc
npm run develop
cd ../destination-gatsby-project
# Link local package to a project
yalc link gatsby-plugin-cookiebot
# Alternative way of attaching the published package with yalc
# yalc add gatsby-plugin-cookiebot
# Run gatsby clean and restart development server on plugin changes
gatsby clean && gatsby develop
## When changes are ready. Build and publish to NPM
npm run npm:publish
```

## Made with passion by Nitro

We are a hybrid marketing agency ready to set your business on fire by bringing together marketing communication and digital services in a unique way. We love Gatsby and we hope this plugin makes your day. If you're ever in need of Gatsby expertise why not consider us at [nitro.fi](https://nitro.fi/en) :).
