class Section < ApplicationRecord
  belongs_to :author
  belongs_to :text
  belongs_to :book
  has_many :lines
  has_many :annotation_groups, through: :lines
  has_many :annotations, through: :annotation_groups
end