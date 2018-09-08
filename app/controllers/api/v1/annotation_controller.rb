class Api::V1::AnnotationController < Api::V1::BaseController

  # POST /annotation
  def create
    # TODO: provide error response when unauthenticated
    # TODO: add some basic validation
    annotation = Annotation.create(
      :line_id => params[:payload][:line_id],
      :section_id => params[:payload][:section_id],
      :content => params[:payload][:content],
      :user_id => current_user.id,
      :username => current_user.username,
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
    annotation = Annotation.find(params[:id])
    if annotation.update(content: params[:payload][:value])
      render json: { :response => 'success' }
    else
      render json: { :response => 'failure' }
    end
  end

  # DELETE /annotation/:id
  def destroy
    annotation = Annotation.find(params[:id])
    if annotation.user_id == current_user.id
      annotation.destroy
      render json: {}, status: :no_content
    end
  end

  private

    def annotation_params
      params.require(:payload).permit(:line_id, :section_id, :content, :lemma, :start_index, :username)
    end

end
