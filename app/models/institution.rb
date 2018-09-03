class Institution < ApplicationRecord
  has_many :groups
  has_many :users, through: :groups
end
