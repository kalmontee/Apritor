# All-the-News-That-Fit-to-Scrape

is an application that lets users scrape news articles from http://techcrunch.com/europe(Europe latest tech news). Users can then view and leave comments on any articles. The app uses Cheerio to scrape news from Tech Crunch and stores them in MongoDB using Mongoose.

## Demo

https://intense-bastion-16488.herokuapp.com/

## Technologies

### Frontend
* HTML
* CSS
* JavaScript
* jQuery
* Bootstrap

### Backend
* NodeJS
* Express
* MongoDB
* Cheerio - web scrapper

## Screenshots

![Screenshot (108)](https://user-images.githubusercontent.com/52462582/73766116-91a34a00-4743-11ea-8001-eba74f175998.png)


## How the App works
On the main page click the green button where it says ```Scrape Articles``` to see all the articles that was scraped from Tech Crunch Europe. All the articles will appear on the left side. Each article will contain a title, summary, and a link to read the full article.
To leave a comment on a article click the title of the article. A form will appear on the right side along with the name of the title.
Enter the name of the title (however you want to call it) and insert your comment. Once your done click ```Add comment```.

To hide everything from the main page simply click ```Hide Articles``` button.

## Requirements

The app should at least scrape from the website the items below

Headline - the title of the article

Summary - a short summary of the article

URL - the url to the original article
