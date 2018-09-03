class Api::V1::AnnotationController < Api::V1::BaseController
  #before_action :set_todo, only: [:show, :update, :destroy]

  # POST /annotation
  def create
    # TODO: bring user_id into this
    annotation = Annotation.create(
      :line_id => params[:payload][:line_id],
      :section_id => params[:payload][:section_id],
      :content => params[:payload][:content],
      :user_id => 1,
      :lemma => params[:payload][:lemma],
      :start_index => params[:payload][:start_index]
    )
    render json: { :response => 'success' }
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

  # TODO: add params whitelist

end
