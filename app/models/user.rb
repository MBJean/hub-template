class User < ApplicationRecord
  has_many :lesson_activities
  has_many :lessons, through: :lesson_activities
  has_many :skill_activities
  has_many :skills, through: :skill_progresses
  has_many :vocabulary_books
  has_many :words, through: :vocabulary_books
end
