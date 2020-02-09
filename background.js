chrome.notifications.onClicked.addListener(function(notificationId) { // Clear the notification, if clicked. Added on v1.5
	console.info(`${notificationId} (onClicked)`);
    chrome.notifications.clear(notificationId);
});
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
    var textarea = document.createElement('textarea');
    textarea.textContent = urls;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    browser.notifications.create({ // Notification, when activated. Added on v1.5
        title: `Copy Window URLs`,
        message: `Copied successfully!`,
        iconUrl: 'icons/default-128.png',
        isClickable: true,
        type: 'basic'
      });
});
