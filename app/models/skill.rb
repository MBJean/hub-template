class Skill < ApplicationRecord
  has_many :users, :through :skill_activities
end
