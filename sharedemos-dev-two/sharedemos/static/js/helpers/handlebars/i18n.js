module.exports = function(translating_string) {
    return (window.I18next != undefined ? window.I18next.t(translating_string) : translating_string);
};