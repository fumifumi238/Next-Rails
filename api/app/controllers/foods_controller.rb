class FoodsController < ApplicationController

  def index
    @foods = Food.all
    render json: @foods
  end

  def create
    @food = Post.new(food_params)

    if @food.save
      render json: @food, status: :created, location: @food
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

private

  def food_params
    params.require(:food).permit(:name,:price,:image)
  end
end
