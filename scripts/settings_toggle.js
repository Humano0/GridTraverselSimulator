$(document).ready(function() {
    $('.just-wrapper').on('click', function() {
        const settingsBar = $('.settings-bar-wrapper');
        if (settingsBar.css('display') === 'none') {
            settingsBar.css('display', 'block');
        } else {
            settingsBar.css('display', 'none');
        }
    });
});
