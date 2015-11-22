/**
 * Code to initialize localization, and allow the user to switch the language.
 * Created on 11/22/2015.
 *
 * TODO: make sure localization works once additional pages are placed in sub-folders.
 */

$(document).ready(function() {

    /**
     * For now, only two languages are possible.
     * The languages defined here must match the json locale files.
     */
    var mainLanguage = 'en';
    var secondaryLanguage = 'fr';

    /**
     * @description Page initialization. Loads user language, and then translates page.
     */
    $.i18n.init({
        load: 'current',
        fallbackLng: mainLanguage,
        resGetPath: 'locales/__lng__.json',
    }, function(err, t) {
        $('.container').i18n();
    });

    /**
     * @description Event triggered when clicking the link to switch the language.
     */
    $('.change-lang').click(function() {
        var newLang = ($.i18n.lng() === mainLanguage) ? secondaryLanguage : mainLanguage;
        $.i18n.setLng(newLang, function(err, t) {
            console.log('Switched language to: ' + newLang);
            $('.container').i18n();
        });
    });

});
