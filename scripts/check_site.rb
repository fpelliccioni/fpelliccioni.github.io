# Run after `bundle exec jekyll build`.
require 'jekyll'
require 'nokogiri'
require 'uri'
require 'set'

root = File.expand_path('..', __dir__)
site = Jekyll::Site.new(Jekyll.configuration('source' => root, 'quiet' => true))
site.read
output = File.join(root, '_site')
failures = []
check = ->(condition, message) { failures << message unless condition }
read = ->(url) { File.read(File.join(output, url.end_with?('/') ? "#{url}index.html" : url)) }
public_urls = site.posts.docs.map(&:url).to_set
blog = site.posts.docs.reject { |post| post.data['layout'].start_with?('algorithms') }
blog.each do |post|
  html = read.call(post.url)
  doc = Nokogiri::HTML(html)
  check.call(doc.at_css('html')['lang'] == post.data['lang'], "Wrong language: #{post.url}")
  check.call(!doc.at_css('meta[name=description]')['content'].strip.empty?, "Empty description: #{post.url}")
  check.call(doc.at_css('link[rel=canonical]')['href'] == "#{site.config['url']}#{post.url}", "Canonical: #{post.url}")
  %w[html head body].each { |tag| check.call(html.scan(/<#{tag}(?:\s|>)/i).size == 1, "Duplicate #{tag}: #{post.url}") }
  doc.css('script[src], link[rel=stylesheet]').each do |asset|
    url = asset['src'] || asset['href']
    check.call(!url.start_with?('http:', '//'), "Insecure resource: #{post.url}: #{url}")
    check.call(File.file?(File.join(output, url)), "Missing resource: #{url}") if url.start_with?('/')
  end
  doc.css('link[hreflang]').each do |link|
    path = URI(link['href']).path
    check.call(public_urls.include?(path), "Missing translation: #{path}")
    other = Nokogiri::HTML(read.call(path))
    check.call(other.at_css("link[hreflang='#{post.data['lang']}'][href='#{site.config['url']}#{post.url}']"), "Nonreciprocal translation: #{post.url}")
  end
end
# type:draft is metadata only; published:false must prevent output, listings and feeds.
all = Jekyll::Site.new(Jekyll.configuration('source' => root, 'quiet' => true, 'unpublished' => true))
all.read
drafts = all.posts.docs.select { |post| post.data['type'] == 'draft' }
drafts.each do |draft|
  check.call(draft.data['published'] == false, "Draft not protected: #{draft.path}")
  unless public_urls.include?(draft.url) # An old draft shares a slug with a published replacement.
    check.call(!File.exist?(File.join(output, draft.url, 'index.html')), "Published draft: #{draft.url}")
  end
end
sitemap = Nokogiri::XML(File.read(File.join(output, 'sitemap.xml'))) { |config| config.strict }
listed = sitemap.xpath('//*[local-name()="loc"]').map { |node| URI(node.text).path }.to_set
check.call(listed == public_urls, 'Sitemap must include every public document in both languages, and no drafts')
%w[feed.xml feed-es.xml feed-rss.xml feed-rss-es.xml feed.links.xml feed_original_atom.xml].each do |file|
  xml = Nokogiri::XML(File.read(File.join(output, file))) { |config| config.strict }
  lang = file.include?('-es') ? 'es' : 'en'
  expected = site.posts.docs.select { |p| p.data['lang'] == lang && p.data['type'] == 'post' }.reverse.take(20).map { |p| "#{site.config['url']}#{p.url}" }.to_set
  actual = if file.start_with?('feed-rss')
    xml.xpath('//item/link').map(&:text).to_set
  else
    xml.xpath('//*[local-name()="entry"]/*[local-name()="link"]/@href').map(&:text).to_set
  end
  check.call(actual == expected, "Wrong entries or URLs: #{file}")
end
spanish_home = read.call('/inicio/')
check.call(spanish_home.include?('de abril de 2026'), 'Spanish dates are not localized')
check.call(File.file?(File.join(output, '404.html')), 'Missing custom 404')
if ARGV[0]
  baseline = File.expand_path(ARGV[0])
  files = Dir.glob(File.join(baseline, '{algorithms,algorithms-about,algorithms-catalog,algorithms-course,algorithms-stdlib,algorithms-support,algoritmos}', '**', '*')).select { |f| File.file?(f) }
  files.each do |old|
    relative = old.delete_prefix("#{baseline}/")
    current = File.join(output, relative)
    check.call(File.file?(current) && File.binread(current) == File.binread(old), "Analyzer changed: #{relative}")
  end
  puts "Compared #{files.size} analyzer files with baseline"
end
abort failures.join("\n") unless failures.empty?
puts "PASS: #{blog.size} blog pages, #{drafts.size} drafts, #{public_urls.size} sitemap URLs, six feeds and translation links"
