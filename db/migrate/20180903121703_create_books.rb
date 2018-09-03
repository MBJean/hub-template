class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.number :book_number

      t.timestamps
    end
  end
end
