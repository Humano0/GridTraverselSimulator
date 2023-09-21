$(document).ready(function() {
    $('.just-wrapper').on('click', function() {
        $('.material-symbols-outlined').toggleClass('flipped');
        $('.settings-bar-wrapper').slideToggle(300);
    });

    $('.settings-toggler-wrapper').hover(
        function() {
            $(this).css({
                'outline': '1px solid #ffffff',
                'border-radius': '1vh'
            }); // Add outline when hovered
        },
        function() {
            $(this).css('outline', 'none'); // Remove outline when not hovered
        }
    );
})