require 'date'

fall_2019_start = Date.new(2019,8,26)
fall_2019_end = Date.new(2019,12,4)

spring_2020_start = Date.new(2020,1,15)
spring_2020_end = Date.new(2020,5,5)
 
 
fall_2019_wednesdays = (fall_2019_start..fall_2019_end).to_a.select{|k| k.wday == 3}
spring_2020_wednesdays = (spring_2020_start..spring_2020_end).to_a.select{|k| k.wday == 3}
 
puts "Fall 2019"
fall_2019_wednesdays.map{|date| puts date.strftime('%B %d, %Y')}
 
puts "\nSpring 2020"
spring_2020_wednesdays.map{|date| puts date.strftime('%B %d, %Y')}
