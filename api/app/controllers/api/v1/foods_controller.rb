class Api::V1::FoodsController < ApplicationController
  def index
    @foods = Food.all
    render json: @foods
  end

  def create
    @food = Food.new(food_params)

    if @food.save
      render json: @food, status: :created, location: @food
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

private

  def food_params
    params.permit(:name,:price,:image)
  end
end
