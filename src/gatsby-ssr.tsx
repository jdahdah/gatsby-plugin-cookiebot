import React from "react";

import { PreRenderHTMLArgs, RenderBodyArgs } from "gatsby";
import { PluginOptions } from "./types/types";
import {
  INCLUDE_IN_DEVELOPMENT_DEFAULT,
  MANUAL_MODE_DEFAULT,
} from "./constants/constants";

const isProduction = process.env.NODE_ENV === "production";

export const onPreRenderHTML = (
  args: PreRenderHTMLArgs,
  pluginOptions: PluginOptions
) => {
  const {
    blockGtm = true,
    manualMode = MANUAL_MODE_DEFAULT,
    includeInDevelopment = INCLUDE_IN_DEVELOPMENT_DEFAULT,
  } = pluginOptions;

  // Do not modify scripts when in development. Can be overriden with plugin options.
  if (!isProduction && !includeInDevelopment) return;

  const {
    getHeadComponents,
    replaceHeadComponents,
    getPreBodyComponents,
    replacePreBodyComponents,
  } = args;

  const headComponents = getHeadComponents();

  // Headcomponents needs to be assigned to a new
  const newHeadComponents = headComponents.map(
    (component: React.ReactElement) => {
      if (component.type === "script") {
        if (
          component.key === "plugin-google-tagmanager" &&
          manualMode &&
          blockGtm
          // && isProduction // gatsby-plugin-google-tagmanager will throw an error if the script has not been loaded in development
        ) {
          // Add Cookiebot manual mode data attribute to GTM script
          return (
            <script
              data-cookieconsent="statistics"
              type="text/plain"
              key={component.key}
              {...component.props}
            />
          );
        }
      }

      return component;
    }
  );

  replaceHeadComponents(newHeadComponents);

  const preBodyComponents = getPreBodyComponents();

  const newPreBodyComponents = preBodyComponents.map(
    (component: React.ReactElement) => {
      if (component.type === "noscript") {
        if (
          component.key === "plugin-google-tagmanager" &&
          manualMode &&
          blockGtm
          // && isProduction // gatsby-plugin-google-tagmanager will throw an error if the script has not been loaded in development
        ) {
          // Add Cookiebot manual mode data attribute to GTM noscript's iframe script
          const gtmIframeStr = component.props.dangerouslySetInnerHTML.__html;
          // Add data attribute to string
          const gtmIframeStrWithCookiebotManualMode =
            gtmIframeStr.substr(0, 8) +
            'data-cookieconsent="statistics" ' +
            gtmIframeStr.substr(8);
          const newProps = { ...component.props };
          newProps.dangerouslySetInnerHTML.__html =
            gtmIframeStrWithCookiebotManualMode;
          return <noscript key={component.key} {...newProps} />;
        }
      }
      return component;
    }
  );

  replacePreBodyComponents(newPreBodyComponents);
};

export const onRenderBody = (
  args: RenderBodyArgs,
  pluginOptions: PluginOptions
) => {
  const {
    cookiebotId,
    manualMode = MANUAL_MODE_DEFAULT,
    includeInDevelopment = INCLUDE_IN_DEVELOPMENT_DEFAULT,
  } = pluginOptions;

  // Do not add script when in development. Can be overriden with plugin options.
  if (!isProduction && !includeInDevelopment) return;

  const { setHeadComponents } = args;

  const headComponents = [
    <script
      key="cookiebot-script"
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={cookiebotId}
      data-blockingmode={manualMode ? undefined : "auto"}
      type="text/javascript"
      async={manualMode ? true : undefined} // Undefined removes the attribute completely. Async needs to be removed entirely for automode to block all scripts.
    ></script>,
  ];
  setHeadComponents(headComponents);
};
