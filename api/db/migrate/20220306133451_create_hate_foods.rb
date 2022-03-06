class CreateHateFoods < ActiveRecord::Migration[6.0]
  def change
    create_table :hate_foods do |t|
      t.references :user,null: false, foreign_key: true
      t.references :food_list, null: false, foreign_key: true
      t.boolean :hate,default: false,null: false
      t.boolean :allergie,default: false,null: false

      t.timestamps
    end
  end
end
