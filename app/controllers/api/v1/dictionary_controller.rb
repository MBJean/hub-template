require 'json'

class Api::V1::DictionaryController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:search]
  def search
    @search_input = params[:input]
    # TODO: ensure that @search_input is properly sanitized
    @dictionary_output = Dictionary.find_by key: @search_input
    if @dictionary_output.nil?
      render json: JSON.generate({ description: 'not found', id: nil })
    else
      render json: JSON.generate({ description: @dictionary_output['description'], id: @dictionary_output['id'] })
    end
  end
end
