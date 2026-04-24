chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  if (!tab.url) return;
  const isInjectableUrl =
    tab.url.startsWith("http://") ||
    tab.url.startsWith("https://") ||
    tab.url.startsWith("file://");
  if (!isInjectableUrl) return;
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});
