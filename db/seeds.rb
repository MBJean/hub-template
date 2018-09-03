# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "csv"

DATA_DICTIONARY = "#{Rails.root}/lib/data/lat-dict-base.xml"
DOC_DICT = File.open(DATA_DICTIONARY) { |f| Nokogiri::XML(f) }
ENTRIES_DICT = DOC_DICT.xpath("//entryFree")
ENTRIES_DICT.each do |entry|
  Dictionary.create(
    #:key => entry['key'].downcase.gsub(/[^a-zA-Z]/, ""),
    #:key => entry['key'].downcase,
    :key => entry['key'].gsub(/1/, ""),
    :entry_id => entry['id'],
    :description => entry
  )
end

# Ovid's works as a test case for how to enter Latin texts into the DB
ovid = Author.create( :name => 'Publius Ovidius Naso', :short_name => 'Ovid' )
Text.create( :author_id => ovid.id, :title => 'Amores', :genre => 'Elegy', :style => 'poetry' )
Text.create( :author_id => ovid.id, :title => 'Ars Amatoria', :genre => 'Elegy', :style => 'poetry' )
Text.create( :author_id => ovid.id, :title => 'Ex Ponto', :genre => 'Elegy', :style => 'poetry' )
Text.create( :author_id => ovid.id, :title => 'Tristia', :genre => 'Elegy', :style => 'poetry' )
Text.create( :author_id => ovid.id, :title => 'Fasti', :genre => 'Elegy', :style => 'poetry' )
Text.create( :author_id => ovid.id, :title => 'Ibis', :genre => 'Elegy', :style => 'poetry' )
Text.create( :author_id => ovid.id, :title => 'Metamorphoses', :genre => 'Epic', :style => 'poetry' )

# Ovid's Amores
# DATA_AMORES = "#{Rails.root}/lib/data/texts/ovid/amores/text.xml"
# DOC_AMORES = File.open(DATA_AMORES) { |f| Nokogiri::XML(f) }
# ENTRIES_AMORES = DOC_AMORES.xpath("//div1")
# ENTRIES_AMORES.each do |book|
#   Book.create(
#
#   )
# end
