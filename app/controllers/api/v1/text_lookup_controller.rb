class Api::V1::TextLookupController < Api::V1::BaseController
  skip_before_action :authenticate_user!

  def index
    @authors = Author.all.sort
    render :json => @authors
  end

  def by_short_name
    @author = Author.find_by short_name: params[:short_name].titleize
    @texts = @author.texts
    render json: {
      author: @author,
      texts: @texts
    }
  end

  def by_text
    @author = Author.find_by short_name: params[:short_name].titleize
    @text = @author.texts.find_by title: params[:text].titleize
    @books = @text.books
    if @books.length > 0
      render json: {
        author: @author,
        text: @texts,
        books: @books
      }
    else
      render json: {
        author: @author,
        text: @text,
        lines: @text.lines.map { |line|
          {
            id: line.id,
            content: line.content,
            line_number: line.line_number
          }
        }
      }
    end
  end

  def by_book
    @author = Author.find_by short_name: params[:short_name].titleize
    @text = @author.texts.find_by title: params[:text].titleize
    @book = @text.books.find_by book_number: params[:book]
    @sections = @book.sections
    if @sections.length > 0
      render json: {
        author: @author,
        text: @texts,
        book: @book,
        section: @sections
      }
    else
      render json: {
        author: @author,
        text: @text,
        book: @book,
        lines: @book.lines.map { |line|
          {
            id: line.id,
            content: line.content,
            line_number: line.line_number
          }
        }
      }
    end
  end

  def by_section
    @author = Author.find_by short_name: params[:short_name].titleize
    @text = @author.texts.find_by title: params[:text].titleize
    @book = @text.books.find_by book_number: params[:book]
    @section = @book.sections.find_by identifier: params[:section]
    if @section == nil
      @line = @book.lines.find_by line_number: params[:section]
      render json: {
        author: @author,
        text: @text,
        book: @book,
        line: @line
      }
    else
      @lines = @section.lines
      render json: {
        author: @author,
        text: @text,
        book: @book,
        section: @section,
        lines: @section.lines.map { |line|
          {
            id: line.id,
            content: line.content,
            line_number: line.line_number
          }
        }
      }
    end
  end

  def by_line
    @author = Author.find_by short_name: params[:short_name].titleize
    @text = @author.texts.find_by title: params[:text].titleize
    @book = @text.books.find_by book_number: params[:book]
    @section = @book.sections.find_by identifier: params[:section]
    @line = @section.lines.find_by line_number: params[:line]
    render json: {
      author: @author,
      text: @text,
      book: @book,
      section: @section,
      line: @line
    }
  end

  private
end
