/**
 * @param {chrome.webRequest.WebRequestDetails} details
 */
function callback(details) {
  const url = new URL(details.url);

  const capturedSearchParams = Array.from(
    url.searchParams.keys(),
  ).filter((searchParam) => disallowedQueryStrings.includes(searchParam));

  if (capturedSearchParams.length > 0) {
    capturedSearchParams.forEach((sp) => {
      url.searchParams.delete(sp);
    });

    return {
      redirectUrl: url.toString(),
    };
  }

  for (const rules of urlReplacingRules) {
    const capturePattern = rules[0];
    const re = new RegExp(capturePattern, "gi");
    const replaceablePattern = new RegExp(rules[1][0], rules[1][1]);
    const replacingPattern = rules[2];

    if (re.test(details.url) && replaceablePattern.test(details.url)) {
      return {
        redirectUrl: details.url.replace(replaceablePattern, replacingPattern),
      };
    }
  }

  return {};
}

// @ts-ignore
// {chrome} in chromium or {browser} in firefox
const webRequest = chrome.webRequest || browser.webRequest;

webRequest.onBeforeRequest.addListener(
  callback,
  { urls: ["http://*/*", "https://*/*"] },
  ["blocking"],
);
