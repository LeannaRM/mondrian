require 'sinatra'
require 'pry'
require 'csv'
require_relative "./functions.rb"
require 'json'

painting = PaintingsCSV.new

get("/index") {
	erb :index
}

get('/saveddatanames') {
	return painting.returnnamelist
}

get('/savedpainting') {
	return painting.returnOnePainting(params)
}

post ("/savenew"){
	painting.save(params)
	return nil
}