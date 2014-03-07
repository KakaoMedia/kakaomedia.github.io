module Jekyll
  module PostAndCategoryFilter
    RESTRICTED_CATEGORIES = ['team', 'portfolio']
 
    # Returna todas las categorias relacionadas con un categoria primaria
    # e.g. "team" or "portfolio"
    def filter_categories_by_primary_category(posts)
      filtered = []
      for post in posts
        for post_category in post.categories
          filtered.push(post_category) unless RESTRICTED_CATEGORIES.include? post_category
        end
      end
      filtered.sort.uniq
    end
  end
end
 
Liquid::Template.register_filter(Jekyll::PostAndCategoryFilter)