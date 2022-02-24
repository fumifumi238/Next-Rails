class Api::V1::FoodsController < ApplicationController
  def index
    @foods = Food.all
    render json: @foods
  end

  def create
    @food = Food.new(food_params)
    if @food.save
      render json: { status: 200, food: @food }
    else
      render json: { status: 500, message: "失敗しました" }
    end
  end

private

  def food_params
    params.permit(:name,:price,:image)
  end
end
