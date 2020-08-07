require 'date'

academic_year = 2021

fall_start = Date.new(academic_year,8,26)
fall_end = Date.new(academic_year,12,4)

spring_start = Date.new(academic_year + 1,1,15)
spring_end = Date.new(academic_year + 1,5,5)
 
 
fall_wednesdays = (fall_start..fall_end).to_a.select{|k| k.wday == 3}
spring_wednesdays = (spring_start..spring_end).to_a.select{|k| k.wday == 3}
 
puts "Fall #{academic_year}"
fall_wednesdays.map{|date| puts date.strftime('%B %d, %Y')}
 
puts "\nSpring #{academic_year + 1}"
spring_wednesdays.map{|date| puts date.strftime('%B %d, %Y')}
