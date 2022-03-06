class CreateFoodContains < ActiveRecord::Migration[6.0]
  def change
    create_table :food_contains do |t|
      t.references :food, null: false, foreign_key: true
      t.references :food_list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
