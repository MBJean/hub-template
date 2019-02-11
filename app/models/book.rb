class Book < ApplicationRecord
  belongs_to :text
  has_many :sections
end
