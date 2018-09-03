Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "dashboard#index"
  # routing for author and texts
  get "authors" => "authors#index"
  get "authors/:short_name" => "authors#by_short_name"
  get "authors/:short_name/:text" => "authors#by_text"
  get "authors/:short_name/:text/:book_number" => "authors#by_book"
  get "authors/:short_name/:text/:book_number/:section_identifier" => "authors#by_section"
  get "authors/:short_name/:text/:book_number/:section/:line_number" => "authors#by_line"

  get "users/profile" => "user#show", as: :user_profile
  post '/dictionary', to: 'dictionary#search', as: 'dictionary'

end
