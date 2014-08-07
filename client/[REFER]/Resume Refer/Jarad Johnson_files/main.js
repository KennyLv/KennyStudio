JARADJOHNSON = {
    init: function() {
        $('.mostlyserious, .servious').click(function() {
            window.location.href = $(this).find('a').attr('href');
        });
    }
}



$(document).ready( JARADJOHNSON.init );
