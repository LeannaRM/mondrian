require 'sinatra'
require 'pry'
require 'csv'
require_relative "./functions.rb"
require 'json'

painting = PaintingsCSV.new

get("/index") {
	erb :index
}

get('/saveddata') {
	painting.returnjson
}

get("/savenew"){
	painting.save(params)
	# redirect('/index')
}