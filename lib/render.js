var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var through = require('through2')
var concat = require('concat-stream')
var markdown = require('marked')
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

function renderMarkdown (s) {
  var out = through()
  s.pipe(concat(function (body) {
    out.push(markdown(body.toString('utf8')))
    out.push(null)
  }))
  return out
}

function render (base, file, outPath) {
  var out = outPath + file.toString().slice(base.split('').length)
  out = out.substr(0, out.lastIndexOf('.')) + '.html'
  mkdirp(path.parse(out).dir, {}, function () {
    renderMarkdown(fs.createReadStream(file))
      .pipe(fs.createWriteStream(out))
  })
}

module.exports = render
