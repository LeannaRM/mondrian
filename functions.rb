class PaintingsCSV

	def save(params)
		@boxcolorinfo = params
		File.open('painting.csv', 'a') do |file|
			@boxcolorinfo.each do |key, value|
				file << key + "," + value + "\n"
			end
		end
	end

	def returnnamelist
		i=0
		dataArray = []
		paintingnumber = 0
		CSV.foreach("painting.csv") do |row|
			if i%17 == 0
				dataArray.push({row[0] => row[1]})
			end
			i += 1
		end
		datajson = dataArray.to_json
		return datajson
	end


	def returnOnePainting(params) 
		paintingDate = params["date"]
		dataHash = {}
		foundit = false
		i=0
		CSV.foreach("painting.csv") do |row|
			if i%17 == 0
				if paintingDate == row[1]
					foundit = true
				else
					foundit = false
				end
			end	
			if foundit == true
				if row[1] == "undefined"
					row[1] = "white" 
				end
				dataHash[row[0]] = row[1]
			end
			i = i+1
		end
		datajson = dataHash.to_json
		return datajson
	end
end
