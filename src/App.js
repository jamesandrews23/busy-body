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
            rss: []
        };

        this.search = this.search.bind(this);
        this.sort = this.sort.bind(this);
    }

    search(e){
        let value = e.target.value;
        if(value === ""){
            this.setState({rss: rssOriginal});
            return;
        }

        if(value.length >= 3){
            let regSearchValue = new RegExp(value, 'gi');

            this.setState({rss: []});

            const feeds = _.cloneDeep(rssOriginal);

            for(var i=0; i< feeds.length; i++){
                let rssFeed = feeds[i];
                let items = rssFeed && rssFeed["item"] ? rssFeed["item"] : [];
                if(items && rssFeed){
                    rssFeed["item"] = items.filter((item) => {
                        return (item && item["description"] && (item["description"].search(regSearchValue) !== -1))
                            || (item && item["title"] && (item["title"].search(regSearchValue) !== -1));
                    });
                }
            }

            this.setState({rss: feeds});
        }
    }

    sort(feed){
        if(feed === ""){
            this.setState({rss: rssOriginal});
            return;
        }

        const rssFeeds = _.cloneDeep(rssOriginal);
        let foundFeed = rssFeeds.find(rss => (
            rss && rss["title"] && rss["title"] === feed
        ));

        if(foundFeed){
            this.setState({rss: [foundFeed]});
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
                that.setState({rss: feeds});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return (
            <div>
                <Main rss={this.state.rss} titles={rssTitles} search={this.search} sort={this.sort} />
            </div>
        )
    }
}

export default App;
