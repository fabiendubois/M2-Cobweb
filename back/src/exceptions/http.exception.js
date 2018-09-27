/**
 * Exception pour les réponses Http
 * @param {String} message Message de l'exception
 * @param {Number} code Code de retour Http associé à l'erreur
 */
exports.httpException = function (message, code) {
    this.message = message;
    this.code = code;
}