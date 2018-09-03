class Annotation < ApplicationRecord
  belongs_to :user
  belongs_to :author
  belongs_to :text
  belongs_to :book
  belongs_to :section
  belongs_to :line
  belongs_to :annotation_group
end
