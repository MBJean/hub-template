class Api::V1::BaseController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token
  # TODO: add authenticity token verification back in
end
