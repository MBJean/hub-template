Rails.application.routes.draw do

  # devise stuff
  devise_for :users, :controllers => { registrations: 'registrations' }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "dashboard#index"

  #user routes
  get "users/profile" => "user#show", as: :user_profile

  # routing for author and texts
  get "authors" => "authors#index", as: :author_path
  get "authors/:short_name" => "authors#by_short_name"
  get "authors/:short_name/:text" => "authors#by_text"
  get "authors/:short_name/:text/:book_number" => "authors#by_book"
  get "authors/:short_name/:text/:book_number/:section_identifier" => "authors#by_section"
  get "authors/:short_name/:text/:book_number/:section/:line_number" => "authors#by_line"

  # API routes
  namespace :api do
    namespace :v1 do
    	get '/dictionary/:lemma/', to: 'dictionary#show'
      resources :annotation, except: [:index]
      get 'section/:id/' => 'section#show'
    end
  end

end
