# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180424180143) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lesson_activities", force: :cascade do |t|
    t.decimal "completion"
    t.datetime "last_attempted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "lesson_id"
    t.index ["lesson_id"], name: "index_lesson_activities_on_lesson_id"
    t.index ["user_id"], name: "index_lesson_activities_on_user_id"
  end

  create_table "lesson_levels", force: :cascade do |t|
    t.integer "level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "lesson_id"
    t.bigint "skill_id"
    t.index ["lesson_id"], name: "index_lesson_levels_on_lesson_id"
    t.index ["skill_id"], name: "index_lesson_levels_on_skill_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "badge"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skill_activities", force: :cascade do |t|
    t.decimal "completion"
    t.decimal "proficiency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "skill_id"
    t.index ["skill_id"], name: "index_skill_activities_on_skill_id"
    t.index ["user_id"], name: "index_skill_activities_on_user_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "badge"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users_words", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "word_id", null: false
    t.index ["user_id"], name: "index_users_words_on_user_id"
    t.index ["word_id"], name: "index_users_words_on_word_id"
  end

  create_table "words", force: :cascade do |t|
    t.string "lemma"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "lesson_activities", "lessons"
  add_foreign_key "lesson_activities", "users"
  add_foreign_key "lesson_levels", "lessons"
  add_foreign_key "lesson_levels", "skills"
  add_foreign_key "skill_activities", "skills"
  add_foreign_key "skill_activities", "users"
end
