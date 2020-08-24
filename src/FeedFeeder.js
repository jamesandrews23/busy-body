import axios from "axios";

const proxy = "https://cors-anywhere.herokuapp.com/";
// const proxy = "https://cors-proxy.htmldriven.com/?url=";
// const proxy = "http://www.whateverorigin.org/get?url=";

class Feed {
    constructor(id, path){
        this.id = id;
        this.path = path;
    }

    getPath(){
        return this.path;
    }

    getId(){
        return this.id;
    }
}

const feeds = [new Feed('cnn', 'http://rss.cnn.com/rss/cnn_topstories.rss'),
    new Feed('bbc', 'http://feeds.bbci.co.uk/news/rss.xml#'),
    new Feed('fox', 'http://feeds.foxnews.com/foxnews/latest'),
    new Feed('wsj', 'https://feeds.a.dj.com/rss/RSSWSJD.xml'),
    new Feed('nyt', 'https://archive.nytimes.com/www.nytimes.com/services/xml/rss/index.html?mcubz=0'),
    new Feed('yahoo', 'https://www.yahoo.com/news/rss/world')];

function getFeeds(){
    return feeds.map((feed) => {
        return axios.get(proxy + encodeURI(feed.getPath()));
    });
}

function addFeed(id, path){
    if(id && path){
        feeds.push(new Feed(id, path));
    } else {
        console.error('invalid feed');
    }
}

export {getFeeds, addFeed};