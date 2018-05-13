# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "csv"

DATA_DICTIONARY = "#{Rails.root}/lib/data/lat-dict-base.xml"
doc_dict = File.open(DATA_DICTIONARY) { |f| Nokogiri::XML(f) }
entries_dict = doc_dict.xpath("//entryFree")
entries_dict.each do |entry|
  Dictionary.create(
    #:key => entry['key'].downcase.gsub(/[^a-zA-Z]/, ""),
    #:key => entry['key'].downcase,
    :key => entry['key'].gsub(/1/, ""),
    :entry_id => entry['id'],
    :description => entry
  )
end
