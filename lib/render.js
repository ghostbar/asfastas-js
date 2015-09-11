var fs = require('fs')
var Mustache = require('mustache')

/**
 *
 * @param opts {Object}
 * @param opts.template {String} template name
 * @param opts.where {String} id where to render the template
 * @param opts.data {Object} data to be passed to the template
 */
function renderTemplate (opts, cb) {
  opts.data = opts.data || {}
  fs.readFile(__dirname + '/assets/tmpl/' + opts.template + '.tmpl', function (err, template) {
    if (err)
      return cb(err)

    var html = Mustache.render(template.toString(), opts.data)
    document.getElementById(opts.where).innerHTML = html
    return cb(null)
  })
}
exports.renderTemplate = renderTemplate
