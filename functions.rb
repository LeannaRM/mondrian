class PaintingsCSV

	def save(params)
		@boxcolorinfo = params
		File.open('painting.csv', 'a') do |file|
			@boxcolorinfo.each do |key, value|
				file << key + "," + value + "\n"
			end
		end
	end

	def returnjson
		i=0
		dataArray = []
		paintingnumber = 0
		CSV.foreach("painting.csv") do |row|
			if i%17 == 0
				paintingnumber = i/17
				dataArray[paintingnumber] = {}
				dataArray[paintingnumber][row[0]] = row[1]
				i += 1
			else
				dataArray[paintingnumber][row[0]] = row[1]
				if dataArray[paintingnumber][row[0]] == "undefined"
					dataArray[paintingnumber][row[0]] = "white"
				end
				i += 1
			end
		end
		datajson = dataArray.to_json
		return datajson
	end
end
