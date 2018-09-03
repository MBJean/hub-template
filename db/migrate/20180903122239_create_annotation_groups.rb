class CreateAnnotationGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :annotation_groups do |t|
      t.number :start_index
      t.string :lemma

      t.timestamps
    end
  end
end
