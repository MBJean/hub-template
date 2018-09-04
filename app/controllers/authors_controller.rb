class AuthorsController < ApplicationController
  skip_before_action :authenticate_user!
  def index
    @authors = Author.all.sort
  end

  def by_short_name
    @author = Author.find_by short_name: params[:short_name].titleize
    @texts = @author.texts
    render :by_short_name
  end

  def by_text
    @author = Author.find_by short_name: params[:short_name].titleize
    @text = @author.texts.find_by title: params[:text].titleize
    @books = @text.books
    render :by_text
  end

  def by_book
    @author = Author.find_by short_name: params[:short_name].titleize
    @text = @author.texts.find_by title: params[:text].titleize
    @book = @text.books.find_by book_number: params[:book_number]
    @sections = @book.sections
    render :by_book
  end

  def by_section
    @author = Author.find_by short_name: params[:short_name].titleize
    @text = @author.texts.find_by title: params[:text].titleize
    @book = @text.books.find_by book_number: params[:book_number]
    @section = @book.sections.find_by identifier: params[:section_identifier]
    @lines = @section.lines
    render :by_section
  end

  def by_line
    @author = Author.find_by short_name: params[:short_name].titleize
    @text = @author.texts.find_by title: params[:text].titleize
    @book = @text.books.find_by book_number: params[:book_number]
    @section = @book.sections.find_by identifier: params[:section_identifier]
    @line = @section.lines.find_by line_number: params[:line_number]
    render :by_line
  end

end
