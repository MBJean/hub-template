class Text < ApplicationRecord
  belongs_to :author
  has_many :books
  has_many :sections, through: :books
  has_many :lines, through: :sections
  has_many :annotation_groups, through: :lines
  has_many :annotations, through: :annotation_groups
end
