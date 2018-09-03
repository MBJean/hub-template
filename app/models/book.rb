class Book < ApplicationRecord
  belongs_to :author
  belongs_to :text
  has_many :sections
  has_many :lines, through: :sections
  has_many :annotation_groups, through: :lines
  has_many :annotations, through: :annotation_groups
end
