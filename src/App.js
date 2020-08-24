import React from "react";
import "./App.css";
import _ from 'lodash';
import convertXmlToJson from './Parser';
import Main from './Main';
import {getFeeds} from './FeedFeeder';

let rssOriginal = [];
let rssTitles = [];

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rss: [],
            error: false
        };

        this.search = this.search.bind(this);
        this.sort = this.sort.bind(this);
        this.transformFeeds = this.transformFeeds.bind(this);
    }

    search(e){
        let value = e.target.value;
        if(value === ""){
            this.setState({rss: _.cloneDeep(this.transformFeeds(rssOriginal))});
            return;
        }

        if(value.length >= 3){
            let regSearchValue = new RegExp(value, 'gi');

            const items = _.cloneDeep(this.state.rss);

            let foundItems = items.filter((item) => {
                return (item && item["description"] && (item["description"].search(regSearchValue) !== -1))
                    || (item && item["title"] && (item["title"].search(regSearchValue) !== -1));
            });

            if(foundItems.length > 0){
                this.setState({rss: foundItems});
            }
        }
    }

    sort(feed){
        if(feed === ""){
            this.setState({rss: this.transformFeeds(rssOriginal)});
            return;
        }

        const rssFeeds = _.cloneDeep(rssOriginal);
        let foundFeed = rssFeeds.find(rss => (
            rss && rss["title"] && rss["title"] === feed
        ));

        if(foundFeed){
            this.setState({rss: this.transformFeeds(foundFeed)});
        }
    }

    componentDidMount(){
        var that = this;
        Promise.all(getFeeds())
            .then((results) => {
                let feeds = results.map(function(result) {
                    let objFeed = convertXmlToJson(result.data);
                    if(!_.isEmpty(objFeed) && objFeed["channel"]){
                        return objFeed["channel"];
                    }
                });
                rssOriginal = feeds;
                feeds.forEach(feed => {
                    if(feed){
                        rssTitles.push(feed["title"]);
                    }
                });
                that.setState({rss: that.transformFeeds(feeds)});
            })
            .catch((error) => {
                that.setState({error: true});
                console.error(error);
            });
    }

    updateFeed(feed, convertedFeeds){
        if(feed){
            let title = feed["title"];
            let item = feed["item"];
            let image = feed["image"];

            if(item){
                for(var j=0; j<item.length; j++){
                    let element = item[j];
                    element["rssTitle"] = title;
                    element["rssImage"] = image;
                    convertedFeeds.push(element);
                }
            }
        }
    }

    transformFeeds(feeds){
        //converts the feed to an object of only items containing the rss title
        let convertedFeeds = [];
        if(feeds && feeds.length){
            for(var i=0; i<feeds.length;i++){
                let feed = feeds[i];
                this.updateFeed(feed, convertedFeeds);
            }
        } else if(feeds) {
            this.updateFeed(feeds, convertedFeeds);
        }

        return convertedFeeds;
    }

    render(){
        return (
            <div>
                <Main rss={this.state.rss} error={this.state.error} titles={rssTitles} search={this.search} sort={this.sort} />
            </div>
        )
    }
}

export default App;
