class Api::V1::SectionController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: :show

  # POST /section
  def create
    render json: { :response => 'POST test' }
  end

  # GET /section/:id
  def show
    section = Section.find(params[:id])
    render json: {
      :lines => section.lines,
      :annotations => section.annotations,
      :current_user => current_user ? current_user.id: 'guest'
    }
  end

  # PUT /section/:id
  def update
    render json: { :response => 'PUT :id test' }
  end

  # DELETE /section/:id
  def destroy
    render json: { :response => 'DELETE :id test' }
  end

  private

    # TODO: add whitelist params

end
