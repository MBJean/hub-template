class Line < ApplicationRecord
  belongs_to :section
  has_many :annotations
end
