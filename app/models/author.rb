class Author < ApplicationRecord
  has_many :texts
  has_many :books, through: :texts
  has_many :sections, through: :books
  has_many :lines, through: :sections
  has_many :annotations_groups, through: :sections
  has_many :annotations, through: :annotations_groups
end
