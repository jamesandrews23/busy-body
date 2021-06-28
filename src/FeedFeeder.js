import axios from "axios";

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

class FeedFeeder {
    constructor(){
        // this.proxy = "https://thingproxy.freeboard.io/fetch/";
        this.proxy = "https://cors-anywhere.herokuapp.com/";
        this.feedKey = "busyBodyFeeds";
        this.feeds = [new Feed('cnn', 'http://rss.cnn.com/rss/cnn_topstories.rss'),
            new Feed('bbc', 'http://feeds.bbci.co.uk/news/rss.xml#'),
            new Feed('fox', 'http://feeds.foxnews.com/foxnews/latest'),
            new Feed('wsj', 'https://feeds.a.dj.com/rss/RSSWSJD.xml'),
            new Feed('nyt', 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'),
            new Feed('yahoo', 'https://www.yahoo.com/news/rss/world')];
        this.getFeeds = this.getFeeds.bind(this);
        this.getProxy = this.getProxy.bind(this);
        this.getStoredFeeds = this.getStoredFeeds.bind(this);
        this.setStoredFeeds = this.setStoredFeeds.bind(this);
        this.addAFeed = this.addAFeed.bind(this);
        this.initialize();
    }

    initialize(){
        let storedFeeds = this.getStoredFeeds();
        if(storedFeeds && storedFeeds.length > 0){
            this.feeds = storedFeeds;
        } else {
            this.setStoredFeeds(this.feeds);
        }
    }

    getFeeds(){
        let currentFeeds = this.getStoredFeeds();

        return currentFeeds.map((feed) => {
            return axios.get(this.proxy + encodeURI(feed["path"]));
        });
    }

    getProxy(){
        return this.proxy;
    }

    getStoredFeeds(){
        try {
            let parsedFeed = JSON.parse(localStorage.getItem(this.feedKey));
            return parsedFeed || [];
        } catch(e){
            return [];
        }
    }

    setStoredFeeds(feeds){
        localStorage.setItem(this.feedKey, JSON.stringify(feeds));
    }

    addAFeed(id, path){
        let currentFeeds = this.getStoredFeeds();
        currentFeeds.unshift(new Feed(id, path));
        this.setStoredFeeds(currentFeeds);
    }
}

export default new FeedFeeder();

