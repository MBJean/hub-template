class Line < ApplicationRecord
  belongs_to :author
  belongs_to :text
  belongs_to :book
  belongs_to :section
  has_many :annotation_groups
  has_many :annotations, through: :annotation_groups
end
