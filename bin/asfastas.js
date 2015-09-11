#!/usr/bin/env node
var path = require('path')
var spawn = require('child_process').spawn
var args = require('minimist')(process.argv.slice(2))
var render = require('../lib/render.js')
var directory = path.resolve(args.dir)
var outDirectory = path.resolve(args.out)
var fileTree = spawn('find', [ directory, '-type', 'f' ])

fileTree.stdout.on('data', function (data) {
  data.toString().split('\n')
    .filter(function (i) { return i !== '' })
    .forEach(function (path) {
      render(directory, path, outDirectory)
    })
})

fileTree.on('close', function (code) {
  console.log('closed with', code)
})
