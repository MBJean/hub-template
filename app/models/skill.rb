class Skill < ApplicationRecord
  has_many :users, :through :skill_activities
  has_many :lessons, :through :lesson_levels
end
