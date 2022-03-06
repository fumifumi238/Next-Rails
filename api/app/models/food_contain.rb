class FoodContain < ApplicationRecord
  belongs_to :food
  belongs_to :food_list
end
