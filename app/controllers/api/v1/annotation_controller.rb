class Api::V1::AnnotationController < Api::V1::BaseController
  #before_action :set_todo, only: [:show, :update, :destroy]

  # POST /annotation
  def create
    render json: { :response => 'POST test' }
  end

  # GET /annotation/:id
  def show
    render json: { :response => 'GET :id test' }
  end

  # PUT /annotation/:id
  def update
    render json: { :response => 'PUT :id test' }
  end

  # DELETE /annotation/:id
  def destroy
    render json: { :response => 'DELETE :id test' }
  end

  private

  def todo_params
    # whitelist params
    params.permit()
  end

end
