chrome.notifications.onClicked.addListener(function(notificationId) { // Clear the notification, if clicked.
	console.info(`${notificationId} (onClicked)`);
    chrome.notifications.clear(notificationId);
});

var extensionName = browser.i18n.getMessage("extensionName")
var notificationCopied = browser.i18n.getMessage("notificationCopied")

browser.browserAction.onClicked.addListener(async function() {
    let tabs = await browser.tabs.query({
        currentWindow: true,
        hidden: false,
    });

    let urls = tabs
        .map(tab => tab.url)
        .filter(function onlyUniqueFilter(value, index, self) {
            return self.indexOf(value) === index;
        })
        .join('\n');

    // Copy list to clipboard
    // No write to clipboard API available: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/clipboard
    var textarea = document.createElement('textarea');
    textarea.textContent = urls;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    browser.notifications.create({
        title: extensionName,
        message: notificationCopied,
        iconUrl: 'icons/default-128.png',
        isClickable: true,
        type: 'basic'
      });
});
