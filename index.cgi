#!/usr/bin/env ruby

require "cgi"

def toAlt(str)
  str.gsub(/images\/randompics\//,'').gsub(/\.jpg$/,'').gsub(/_/,' ')
end

def toTitle(str)
  str.gsub(/_/,' ').gsub(/\//, ' - ').gsub(/\b./){$&.upcase}
end

def toXHTML(str)
  newTags = { 'h2' => 'h1', 'h3' => 'h2', 'i' => 'em',
             'b' => 'strong', 'br' => 'br/'}
  tagRE = "(#{newTags.keys.join('|')})"
  str.gsub(/<(\/)?(#{tagRE})>/) {"<#{$1}#{newTags[$2]}>"}
end

def processAbstract(str)
  '<p class="bibtex">' +
  str.gsub(/(,)?\s*wwwnote={[^}]*\}/m,'').gsub(/\n/,'<br/>') +
  '</p>'
end

template = "template.html"
cgi = CGI.new
page = cgi['p']
page = "home" if page.empty?

prefix = "/u/www/users/pstone/Papers/bib2html/b2hd-"
dlprefix = "/users/pstone/Papers/bib2html-links/"
paperinfo = cgi['pi']
paperinfo = nil if paperinfo.empty?

puts "Content-type: text/html\n\n"
File.open(template,'r') do |tmpl|
  tmpl.each_line do |line|
    case line
    when /<!--TITLE-->/
      unless paperinfo
        if File.exists?("#{page}.html")
          puts line.gsub(/<!--TITLE-->/, toTitle(page))
        else
          puts line.gsub(/<!--TITLE-->/, "Page Not Found")
        end
      else 
        if File.exists?("#{prefix}#{paperinfo}.html")
          puts line.gsub(/<!--TITLE-->/, "Paper Info - #{paperinfo}")
        else
          puts line.gsub(/<!--TITLE-->/, "Paper Not Found")
        end
      end
    when /<!--PAGETEXT-->/
      unless paperinfo 
        if File.exists?("#{page}.html")
          if File.readable?("#{page}.html")
            File.open(page + ".html",'r') do |pg|
              pg.each_line do |ln|
                puts ln
              end
            end
          else
            # Don't directly reflect the page at this allows for XSS attacks
            String safepage = CGI.escapeHTML("#{page}");
            puts "<p>Permissions for the page \"#{safepage}\" seem to be set incorrectly.</p>"
          end
        else
          # Don't directly reflect the page at this allows for XSS attacks
          String safepage = CGI.escapeHTML("#{page}");
          puts "<p>Sorry!  The page \"#{safepage}\" was not found.</p>"
        end
      else
        # This is a paper information page, we're going to process the
        # bib2html pages from Peter's publication page.
        if File.exists?("#{prefix}#{paperinfo}.html")
          if File.readable?("#{prefix}#{paperinfo}.html")
            File.open(prefix + paperinfo + ".html",'r') do |pg|
              pg.read =~ /<hr[^>]*>(.*)<hr/m
              puts toXHTML($1.gsub(/\.\.\/bib2html-links\//, dlprefix).gsub(/<pre>(.*)<\/pre>/m) {processAbstract($1)})
            end
          else
            puts "<p>Permissions for the paper info page  \"#{paperinfo}\" seem to be set incorrectly.</p>"
          end
        else
          puts "<p>Sorry!  The paper \"#{paperinfo}\" was not found.</p>"
        end
      end
    when /<!--RANDOMPIC-->/
      # Get a random picture and display it.
      files = Dir["images/randompics/*.jpg"]
      picfile = files[rand(files.size)]
      puts "<img src=\"#{picfile}\" alt=\"#{toAlt(picfile)}\"/>"
    else
      puts line
    end
  end
end

