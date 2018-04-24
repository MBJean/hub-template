class User < ApplicationRecord
  has_many :lesson_activities
  has_many :lessons, through: :lesson_activities
  has_many :skill_activities
  has_many :skills, through: :skill_activities
  has_and_belongs_to_many :words
end
