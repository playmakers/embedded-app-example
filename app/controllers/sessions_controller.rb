class SessionsController < ApplicationController
  layout :false

  def new
    authenticate if params[:shop].present?
  end

  def show
    if response = request.env['omniauth.auth']
      sess = ShopifyAPI::Session.new(params[:shop], response['credentials']['token'])
      session[:shopify] = sess
      flash[:notice] = "Logged in"
      redirect_to return_address
    else
      flash[:error] = "Could not log in to Shopify store."
      redirect_to :action => 'new'
    end
  end

  protected

  def authenticate
    if shop_name = sanitize_shop_param(params)
      @redirect_url = "/auth/shopify?shop=#{shop_name}"
      render "/common/iframe_redirect", :format => [:html], layout: false
    else
      redirect_to return_address
    end
  end

  def return_address
    session[:return_to] || root_url
  end

  def sanitize_shop_param(params)
    return unless params[:shop].present?
    name = params[:shop].to_s.strip
    name += '.myshopify.com' if !name.include?("myshopify.com") && !name.include?(".")
    name.sub('https://', '').sub('http://', '')
  end
end
