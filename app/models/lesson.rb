class Lesson < ApplicationRecord
  has_many :users, :through :lesson_activities
end
