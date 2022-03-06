class HateFood < ApplicationRecord
  belongs_to :user_id
  belongs_to :food_list_id
end
