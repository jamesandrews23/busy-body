import React from "react";
import "./App.css";
import axios from "axios";
import _ from 'lodash';
import convertXmlToJson from './Parser';
import Main from './Main';

const proxy = "https://cors-anywhere.herokuapp.com/";

function getCnnFeed() {
    return axios.get(proxy + 'http://rss.cnn.com/rss/cnn_topstories.rss');
}

function getBbcFeed() {
    return axios.get(proxy + "http://feeds.bbci.co.uk/news/rss.xml#");
}

function getFoxFeed(){
    return axios.get(proxy + "http://feeds.foxnews.com/foxnews/latest");
}

function getWsjFeed(){
    return axios.get(proxy + "https://feeds.a.dj.com/rss/RSSWSJD.xml");
}

function getWeatherFeed(){
    return axios.get(proxy + "https://www.weather.gov/headline_archive.php");
}

function getEspnFeed(){
    return axios.get(proxy + "http://www.espn.com/espn/news/story?page=rssinfo");
}

function getLifeHackerFeed(){
    return axios.get(proxy + "http://www.espn.com/espn/news/story?page=rssinfo");
}

function getNytFeed(){
    return axios.get(proxy + "https://rss.nytimes.com/services/xml/rss/nyt/US.xml");
}

function getLocFeed(){
    return axios.get(proxy + "http://www.loc.gov/rss/pao/news.xml");
}

function getAlgFeed(){
    return axios.get(proxy + "https://www.feedspot.com/infiniterss.php?_src=followbtn&followfeedid=4275711&q=site:http%3A%2F%2Fwww.aljazeera.com%2Fxml%2Frss%2Fall.xml");
}

function getYahooFeed(){
    return axios.get(proxy + "https://www.yahoo.com/news/rss/world");
}


let rssOriginal = [];

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rss: []
        };

        this.search = this.search.bind(this);
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

    componentDidMount(){
        var that = this;
        Promise.all([getCnnFeed(), getBbcFeed(), getFoxFeed(), getWsjFeed(), getWeatherFeed(), getEspnFeed(),
            getLifeHackerFeed(), getNytFeed(), getYahooFeed()])
            .then(function (results) {
                let feeds = results.map(function(result) {
                    let objFeed = convertXmlToJson(result.data);
                    if(!_.isEmpty(objFeed) && objFeed["channel"]){
                        return objFeed["channel"];
                    }
                });
                that.setState({rss: feeds});
                rssOriginal = feeds;
            });
    }

    render(){
        return (
            <div>
                <Main rss={this.state.rss} search={this.search} />
            </div>
        )
    }
}

export default App;
