class CreateLines < ActiveRecord::Migration[5.1]
  def change
    create_table :lines do |t|
      t.string :line_number

      t.timestamps
    end
  end
end
