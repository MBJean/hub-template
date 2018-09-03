class AnnotationGroup < ApplicationRecord
  belongs_to :author
  belongs_to :text
  belongs_to :book
  belongs_to :section
  belongs_to :line
  has_many :annotations
end
