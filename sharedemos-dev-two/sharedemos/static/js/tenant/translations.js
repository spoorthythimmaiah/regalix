/*global require*/
'use strict';

require([
    'i18next',
    './translations/en_US.json',
    './translations/zh_CN.json',
    './translations/ja_JP.json',
    './translations/de_DE.json',
    './translations/es_ES.json',
    './translations/ko_KR.json'
], function (I18next,
             EnglishTranslation,
             ChineseTranslation,
             JapaneseTranslation,
             GermanTranslation,
             SpanishTranslation,
             KoreanTranslation) {
    window.I18next = I18next;

    I18next.init({
        fallbackLng : 'en_US',
        lng: document.current_locale,
        resources: {
            en_US:{
                translation : EnglishTranslation
            },
            zh_CN:{
                translation : ChineseTranslation
            },
            ja_JP:{
                translation : JapaneseTranslation
            },
            de_DE:{
                translation : GermanTranslation
            },
            es_ES:{
                translation : SpanishTranslation
            },
            ko_KR:{
                translation: KoreanTranslation
            }
        }
    });

});