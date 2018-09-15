class Api::V1::BaseController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
end
